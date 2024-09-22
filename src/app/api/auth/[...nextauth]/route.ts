import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const handler = NextAuth({
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID as string,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile }) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (account) {
                token.accessToken = account.access_token;
                token.id = profile.id;
            }

            return token;
        },
        async session({ session, token }) {
            session.user.accessToken = token.accessToken;
            session.user.id = token.id;
            
            return session;
        }
    },
    pages: {
        signIn: "/login",
    }
});

export { handler as GET, handler as POST };