import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET(request: Request) {
    try {
        const authHeader = request.headers.get('authorization');
        if (authHeader === `Bearer ${process.env.CRON_SECRET}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const result = await prisma.nftPrice.create({
            data: {
                name: "Hourly NFT Update",
                price: Math.floor(Math.random() * 1000),
                date: new Date()
            }
        });

        return NextResponse.json({ success: true, data: result });
    } catch (error) {
        console.error('Cron job error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
