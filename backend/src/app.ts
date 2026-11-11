import cors from "cors";
import express from "express";
import helmet from "helmet";
import { contentController } from "./controllers/content-controller";
import { leadController } from "./controllers/lead-controller";
import { errorMiddleware } from "./middleware/errors-middleware";
import { appConfig } from "./utils/app-config";

class App {
    public start(): void {
        try {
            const app = express();

            app.set("trust proxy", 1);

            app.use(helmet({
                crossOriginResourcePolicy: { policy: "cross-origin" }
            }));

            app.use("/api/media", express.static(appConfig.mediaDir));

            const allowedOrigins = new Set([
                appConfig.frontendUrl,
                "http://localhost:5173",
                "http://127.0.0.1:5173"
            ]);

            app.use(cors({
                origin: (origin, callback) => {
                    if (!origin || allowedOrigins.has(origin)) {
                        callback(null, true);
                        return;
                    }
                    callback(new Error("Not allowed by CORS"));
                },
                credentials: true
            }));

            app.use(express.json());
            app.use(contentController.router);
            app.use(leadController.router);

            app.use(errorMiddleware.routeNotFound);
            app.use(errorMiddleware.catchAll);

            app.listen(appConfig.port, () => {
                console.log(`Backend server started on port ${appConfig.port}`);
            });
        } catch (err: any) {
            console.log(err);
        }
    }
}

const app = new App();
app.start();
