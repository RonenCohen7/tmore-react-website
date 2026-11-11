import dotenv from "dotenv";
import path from "path";

dotenv.config({ quiet: true });

class AppConfig {
    public readonly isDevelopment = process.env.ENVIRONMENT !== "production";
    public readonly isProduction = process.env.ENVIRONMENT === "production";
    public readonly port = Number(process.env.PORT || 4010);
    public readonly frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    public readonly dataDir = path.join(__dirname, "../../data");
    public readonly mediaDir = path.join(__dirname, "../../storage/media");
    public readonly leadsFile = path.join(__dirname, "../../storage/leads/leads.json");
}

export const appConfig = new AppConfig();
