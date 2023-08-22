import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./config/envConfig";

let server:Server;

const closeServer = () => {
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    } else {
        process.exit(0);
    }
};

async function mongoConnect() {
    try {
        await mongoose.connect(config.database_url as string);
        console.log('🐳 Database connection established');
        
        server = app.listen(config.port, () => {
            console.log(`😎 Application listening on port: ${config.port}`);
        });
    } catch (error) {
        console.log(`😭 Failed to listen on port ${config.port}`, error);
    };

    process.on('UnhandledRejection', async function(error) {
        console.log(`Unhandled rejection ${error}`);
        closeServer();
    })
};

mongoConnect();

process.on(`SIGTERM`, () =>{
    console.log('SIGTERM received from server');
    closeServer();
});