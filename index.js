const B2 = require('./b2_operations');
const mongoose = require('mongoose');
const Image = require('./api/models/image');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const getImages = async () => {
    const token = await B2.authorize_account();
    const files = await B2.list_file_names(token);
    const regex = /_portfolio\/\d+\.webp/;
    const images = [];

    for (file of files.files) {
        if (regex.test(file.fileName)) {
            images.push({
                _id: mongoose.Types.ObjectId(),
                url: `https://cdn.nedzad.dev/file/${token.allowed.bucketName}/${file.fileName}`
            });
        }
    }

    return images;
}

const main = async () => {
    mongoose.connect(process.env.MONGO);
    const images = await getImages();

    let counter = 0;
    for (image of images) {
        const candidate = new Image(image);

        if (await Image.findOne({ url: candidate.url })) {
            console.log(`Skipping ${candidate.url}`);
            continue;
        }

        console.log(`Adding ${candidate.url}`);
        await candidate.save();
        counter++;
    }

    console.log(`Added images: ${counter}/${images.length}`);

    mongoose.disconnect();
}

main();