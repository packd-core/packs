import type { NextApiRequest, NextApiResponse } from "next";
import { PackMain__factory } from "@/app/abi/types/factories/contracts/PackMain__factory";
import { z } from "zod";
import { PackMain } from "@/app/abi/types/contracts/PackMain";
import { JsonRpcProvider, JsonRpcSigner, Wallet } from "ethers";

export type ResponseData =
  | {
      error:
        | "INVALID_BODY_PARAMETERS"
        | "GAS_ESTIMATATION_FAILED"
        | "REFUND_VALUE_TOO_LOW"
        | "UNABLE_TO_BROADCAST_TX";
      details?: object;
    }
  | {
      hash: string;
      chainId: string;
      message: string;
    };

const RelayerRequestSchema = z.object({
  mainContractAddress: z.string(),
  chainId: z.number(),

  //ClaimDataStruct
  args: z.object({
    tokenId: z.string(),
    sigOwner: z.string(),
    claimer: z.string(),
    sigClaimer: z.string(),
    refundValue: z.string(),
    maxRefundValue: z.string(),
    moduleData: z.string().array(),
  }),
});

export type RelayerRequest = z.infer<typeof RelayerRequestSchema>;

const getRelayerAccount = (): string => {
  const pk = process.env.RELAYER_SIGNER_PRIVATE_KEY;
  if (!pk) {
    throw new Error("RELAYER_SIGNER_PRIVATE_KEY env variable is not set");
  }
  return pk;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    res.status(400).send({ error: "404 not found" } as any);
    return;
  }

  const parsedBody = RelayerRequestSchema.safeParse(JSON.parse(req.body));
  if (!parsedBody.success) {
    res
      .status(400)
      .send({ error: "INVALID_BODY_PARAMETERS", details: parsedBody.error });
    return;
  }

  const tx = parsedBody.data;

  const { account, signer } = getSigner(tx.chainId);
  const packMain = PackMain__factory.connect(account, signer).attach(
    tx.mainContractAddress
  ) as PackMain; // NOt sure why is this changing the type

  console.log("****************  Relay request *****************");
  console.log(tx);

  const feeData = await signer.provider?.getFeeData();
  console.log("Fee data", feeData);
  let gasEstimate: bigint;
  let gasCostEstimate: bigint;
  try {
    gasEstimate = await packMain.open.estimateGas({
      ...tx.args,
    });
  } catch (e: any) {
    console.log("Gas estimation failed", e);
    return res
      .status(400)
      .send({ error: "GAS_ESTIMATATION_FAILED", details: e });
  }

  console.log("Estimates", {
    gasCostEstimate: gasEstimate,
    maxRefundValue: tx.args.maxRefundValue,
    refundValue: tx.args.refundValue,
  });

  //TODO gasEstimate should be multiplied by gasPrice I think
  if (gasEstimate > BigInt(tx.args.refundValue)) {
    return res.status(400).send({
      error: `REFUND_VALUE_TOO_LOW`,
      details: { gasEstimate, refundValue: tx.args.refundValue },
    });
  }

  try {
    const openReceipt = await packMain.open(
      {
        ...tx.args,
      },
      {
        gasLimit: gasEstimate,
      }
    );

    console.log("hash", openReceipt.hash);

    return res.status(200).send({
      hash: openReceipt.hash,
      chainId: openReceipt.chainId.toString(),
      message: "Transaction sent",
    });
  } catch (error: any) {
    console.log(error);
    return res
      .status(500)
      .send({ error: "UNABLE_TO_BROADCAST_TX", details: error });
  }
}

function getSigner(chainId: number) {


  const pk = getRelayerAccount();
  const provider = new JsonRpcProvider(getRpcUrl({chainId}));
  const signer = new Wallet(pk, provider);
  //const signer = new JsonRpcSigner(provider, account);
  return { account: signer.address, signer };
}

export function getRpcUrl({chainId}:{chainId: number}) {
  switch (chainId) {
    case 1337:
    case 31337:
      return "http://localhost:8545";
    case 1442:
      return "https://rpc.public.zkevm-test.net";
    case 5001:
      return "https://rpc.testnet.mantle.xyz";
    case 534351:
      return "https://sepolia-rpc.scroll.io";
    case 84531:
      return "https://goerli.base.org";
    case 8453:
      return "https://mainnet.base.org";
    default:
      throw new Error(`Unsupported chainId: ${chainId}`);
  }
}
