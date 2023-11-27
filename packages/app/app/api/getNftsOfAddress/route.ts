import Moralis from "moralis";
import { type NextRequest } from 'next/server'

if (!Moralis.Core.isStarted) {

    await Moralis.start({
        apiKey: process.env.MORALIS_API_KEY ?? '',
    });
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams

    const address = searchParams.get('address')
    if (!address) {
        return Response.json({error: "address is required"} as any, { status: 400 });
    }
    const chain = searchParams.get('chain')
    if (!chain) {
        return Response.json({error: "chain is required"} as any, { status: 400 });

    }
    try {
        const response = await Moralis.EvmApi.nft.getWalletNFTs({
            "chain": Number(chain),
            "format": "decimal",
            "limit": 50,
            "excludeSpam": true,
            "mediaItems": true,
            "address": address as string,
            "normalizeMetadata": true,
        });
        return Response.json(response.raw.result);

    } catch (e) {
        console.log(e)
        return Response.json({error: 'Moralis request has failed'} as any, { status: 500 });
    }

}
