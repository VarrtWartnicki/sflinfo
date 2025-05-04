import { NextResponse } from 'next/server';
import {NFTPriceService} from "@/services/nft-price.service";

export async function GET(request: Request) {
    try {
        const authHeader = request.headers.get('authorization');
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const nftPriceService = new NFTPriceService();
        await nftPriceService.processNFTData();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Cron job error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

}
