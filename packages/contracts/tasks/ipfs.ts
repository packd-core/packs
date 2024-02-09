import dotenv from "dotenv";
import FormData from "form-data";
import { task, types } from "hardhat/config";
import fs from "fs";
import https from "https";
import path from "path";

dotenv.config();

interface IpfsResult {
  Name: string;
  Hash: string;
  Size: string;
}

task("uploadCollection", "Uploads a file to IPFS")
  .addParam("collectionid", "The ID of the collection", undefined, types.int)
  .setAction(async (taskArgs) => {
    const { INFURA_API_KEY, INFURA_API_SECRET } = process.env;
    if (!INFURA_API_KEY || !INFURA_API_SECRET) {
      throw new Error("INFURA_API_KEY or INFURA_API_SECRET not set");
    }

    if (taskArgs.collectionid === undefined) {
      throw new Error("collectionid not set");
    }

    const uploadFile = async (file: string): Promise<IpfsResult> => {
      const data = fs.createReadStream(file);
      const form = new FormData();
      form.append("file", data);
      const options = {
        hostname: "ipfs.infura.io",
        port: 5001,
        path: "/api/v0/add",
        method: "POST",
        headers: form.getHeaders(),
        auth: `${INFURA_API_KEY}:${INFURA_API_SECRET}`,
      };

      return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
          let result = "";
          res.on("data", (d) => {
            result += d;
          });
          res.on("end", () => {
            resolve(JSON.parse(result));
          });
        });

        req.on("error", (error) => {
          reject(error);
        });

        form.pipe(req);
        req.on("end", () => req.end());
      });
    };

    const collectionPath = path.join(
      __dirname,
      "..",
      "data",
      `collection_${taskArgs.collectionid}`
    );

    const imagePath = path.join(collectionPath, "image.png");
    const metadataPath = path.join(collectionPath, "metadata.json");

    const imageResult = await uploadFile(imagePath);
    console.log(`Image uploaded. Hash: ${imageResult.Hash}`);

    const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
    metadata.image = `ipfs://${imageResult.Hash}`;

    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

    const metadataResult = await uploadFile(metadataPath);
    console.log(`Metadata uploaded. Hash: ${metadataResult.Hash}`);

    const output = {
      imageHash: `ipfs://${imageResult.Hash}`,
      metadataHash: `ipfs://${metadataResult.Hash}`,
    };

    fs.writeFileSync(
      path.join(collectionPath, "output.json"),
      JSON.stringify(output, null, 2)
    );
  });
