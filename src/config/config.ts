import { configDotenv } from "dotenv";
import path from "path";

configDotenv.config({path: path.join(process.cwd(), '.env')});

export default {
    env: process.env.NODE_ENV,
    port: process.env.PORT, // default port for production
    database_url: process.env.DATABASE_URL
};