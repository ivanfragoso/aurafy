import { getMostVibrantColor, mixColors } from '@/lib/imageUtils';
import axios from 'axios';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        const accessToken = token!.accessToken;
        const type = req.nextUrl.searchParams.get('type');

        const res = await axios.get(`https://api.spotify.com/v1/me/top/${type}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const items = res.data.items;
        const colors = [];

        for (const item of items) {
            const imageUrl = (type == 'artists') ? item.images[0].url : item.album.images[0].url;
            const dominantColor = await getMostVibrantColor(imageUrl);

            colors.push(dominantColor)
        }

        const mixedColors = mixColors(colors)

        return NextResponse.json({'aura': mixedColors})
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: 'An error occurred' });
    }
}