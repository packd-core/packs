import {type NextRequest} from 'next/server'
import {fetchFullPackDetail} from "@/src/lib/fetchFullPackDetail";

// @ts-ignore
BigInt.prototype.toJSON = function () {
    return this.toString();
};

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams

    const key = searchParams.get('key')
    if (!key) {
        return Response.json({error: "key is required"} as any, {status: 400});
    }
    const res = await fetchFullPackDetail({key});
    if (res) {
        return Response.json(res, {status: 200});
    } else {
        return Response.json({error: 'Request has failed'} as any, {status: 500});
    }
}
