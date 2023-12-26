import type { NextApiRequest, NextApiResponse } from "next";
import { PackMain__factory } from "@/app/abi/types/factories/contracts/PackMain__factory";
import { z } from "zod";
import { PackMain } from "@/app/abi/types/contracts/PackMain";
import { JsonRpcProvider, JsonRpcSigner, Wallet } from "ethers";
import { NftData } from "@/src/hooks/useNftData";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NftData>
) {
  console.log("api/nftData.ts");
  if (req.method !== "GET") {
    res.status(400).send({ error: "404 not found" } as any);
    return;
  }
  const url = req.query["url"];
  if (!url) {
    res.status(400).send({ error: "url is required" } as any);
    return;
  }

  const data = await fetch(url as string).then((response) => {
    console.log(response.json());
    return response.json();
  });
  return res.status(200).send(data);
}
