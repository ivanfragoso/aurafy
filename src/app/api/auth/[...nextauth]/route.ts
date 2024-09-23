import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import axios from "axios"

const clientId = process.env.SPOTIFY_CLIENT_ID as string
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET as string

const handler = NextAuth({
    providers: [
        SpotifyProvider({
            clientId: clientId,
            clientSecret: clientSecret,
            authorization: {
                params: {
                    scope: "user-read-email user-read-private user-top-read"
                }
            }
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (account && user) {
                return {
                    accessToken: account.access_token,
                    accessTokenExpires: account.expires_at,
                    refreshToken: account.refresh_token
                }
            }

            if (Date.now() < token.accessTokenExpires) {
                return token
            }

            return refreshAccessToken(token)
        },

        async session({ session, token }) {
            if (token) {
                session.user = token.user
                session.accessToken = token.accessToken
            }
        
            return session
        }
    },
    pages: {
        signIn: "/login",
    }
});

export { handler as GET, handler as POST };

async function refreshAccessToken(token) {
    console.log(token)
    const formData = new URLSearchParams({ grant_type: 'refresh_token', refresh_token: token.refreshToken });

    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', formData.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
            }
        });

        const refreshedTokens = response.data;
        console.log('Refreshed Tokens:', refreshedTokens);

        return {
            ...token,
            accessToken: refreshedTokens.access_token,
            accessTokenExpires: Date.now() + refreshedTokens.expires_at,
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken
        };
    } catch (error) {
        console.error('Error refreshing access token:', error.response ? error.response.data : error.message);
        return {
            ...token,
            error: 'RefreshAccessTokenError'
        };
    }
}

