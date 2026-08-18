import "dotenv/config";
import { OAuth2Client } from "google-auth-library";

const googleClientId =
    process.env.OAUTH_GOOGLE_CLIENT_ID;

if (!googleClientId) {
    throw new Error(
        "OAUTH_GOOGLE_CLIENT_ID is not set in the environment"
    );
}

export const googleClient =
    new OAuth2Client(googleClientId);

export const GOOGLE_CLIENT_ID =
    googleClientId;