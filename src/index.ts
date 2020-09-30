import s3 from "aws-sdk/clients/s3";
import { MongoClient } from "mongodb";
import md5 from "crypto-js/md5";

interface Image {
  hash: string;
  url: string;
}

interface ImageCollection {
  _id: string;
  images: Image[];
  date: Date;
}

const storageClient = new s3({
  endpoint: process.env.STORAGE_ENDPOINT,
  accessKeyId: process.env.STORAGE_ID,
  secretAccessKey: process.env.STORAGE_KEY,
});

const databaseClient = new MongoClient(process.env.MONGO_URL!, {
  useUnifiedTopology: true,
});

const insertIntoDb = async (imgDocs: ImageCollection) => {
  await databaseClient.connect();

  try {
    await databaseClient
      .db(process.env.MONGO_DB)
      .collection(process.env.MONGO_COLL!)
      .insertOne(imgDocs);

    console.log("New collection added!");
  } catch (err) {
    if (err.code === 11000) {
      console.error("No new images!");
    }
  }

  await databaseClient.close();
};

const filterContents = (contents: s3.ObjectList): Image[] => {
  const keyRegexp = /portfolio\/\d+.webp/;
  const arr = contents.filter((x) => keyRegexp.test(x.Key!));

  const imgArray = arr.map(
    (x): Image => ({
      hash: x.ETag?.split('"')[1]!,
      url: process.env.CDN_URL! + x.Key,
    })
  );

  return imgArray;
};

(async () => {
  const images = await storageClient
    .listObjectsV2({
      Bucket: process.env.STORAGE_BUCKET!,
      Prefix: "portfolio/",
    })
    .promise();

  if (images.Contents) {
    const imgArray = filterContents(images.Contents);

    const imgColl: ImageCollection = {
      _id: md5(imgArray.toString()).toString(),
      images: imgArray,
      date: new Date(),
    };

    await insertIntoDb(imgColl);
  }
})();
