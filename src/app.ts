import cors from "cors";
import express, { Application, Request, Response } from "express";
import httpStatus from "http-status";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//main route for the application
app.get('/api/c1', async (req:Request, res:Response) => {
    res.send('Welcome to Cow hut, connected the server throw_ api ')
});


//routes
app.use('/api/c1', appRouter);

// middleware
app.use(errorHandling);


//if not found Routes
app.use((req:Request, res:Response) => {
    res.status(httpStatus.NOT_FOUND).json({ 
        success: false,
        message: `$(req.originalUrl).notFound`,
        errorMessage: [
            {
            path:req.originalUrl,
            message: `$(req.originalUrl).notFound`,
            }
        ]
    });
});

export default app;