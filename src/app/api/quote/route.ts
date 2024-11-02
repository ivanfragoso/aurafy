import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const res = await axios.get("https://api.forismatic.com/api/1.0/?method=getQuote", {
            params: {
                format: "json",
                lang: "en"
            }
        })

        let quote = res.data

        console.log(quote)

        if (typeof quote === 'string') {
            quote = quote.replace(/\\'/g, "'")
            quote = JSON.parse(quote)
        }

        return NextResponse.json(quote)

    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: 'An error occurred' })
    }
}
