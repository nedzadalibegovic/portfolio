const fetch = require('node-fetch');
const mongoose = require('mongoose');
const B2 = require('./b2_operations');
const Image = require('./api/models/image');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const getImages = async () => {
    const token = await B2.authorize_account();
    const files = await B2.list_file_names(token);
    const regex = /portfolio\/\d+\.webp/;
    const images = [];

    for (file of files.files) {
        if (regex.test(file.fileName)) {
            images.push({
                _id: file.contentSha1,
                url: `https://cdn.nedzad.dev/${file.fileName}`,
            });
        }
    }

    return images;
};

const checkLinks = async () => {
    const docs = await Image.find();
    const dead = [];

    for (doc of docs) {
        const response = await fetch(doc.url, { method: 'HEAD' });

        if (response.status === 404) {
            dead.push(doc._id);
        }
    }

    const { deletedCount } = await Image.deleteMany({ _id: { $in: dead } });
    return `${docs.length - deletedCount}/${docs.length}`;
};

const main = async () => {
    process.stdout.write('Connecting to database... ');
    await mongoose.connect(process.env.MONGO);
    process.stdout.write('OK\n');

    process.stdout.write('Fetching images from bucket... ');
    const images = await getImages();
    process.stdout.write(images.length + '\n');

    process.stdout.write('Adding new images to db... ');
    let counter = 0;
    for (image of images) {
        // skip if image with same hash found
        if (await Image.findById(image._id)) continue;

        await Image.create(image);
        counter++;
    }
    process.stdout.write(`${counter}/${images.length}\n`);

    process.stdout.write('Checking if all image URLs are alive... ');
    process.stdout.write((await checkLinks()) + '\n');

    await mongoose.disconnect();
};

main();
