import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Request) {
    try {
        const res = await axios.get("https://api.forismatic.com/api/1.0/?method=getQuote", {
            params: {
                format: "json",
                lang: "en"
            }
        });

        const quote = res.data

        return NextResponse.json(quote);

    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: 'An error occurred' });
    }
}
