import fs from "fs";
import path from "path";
import { ContentModel } from "../models/content-model";
import { ContentNotFoundError } from "../models/client-errors";
import { NavigationModel, SiteModel } from "../models/site-model";
import { appConfig } from "../utils/app-config";

class ContentService {
    private content: ContentModel[] | null = null;

    public getSite(): SiteModel {
        return this.readJson<SiteModel>("site.json");
    }

    public getNavigation(): NavigationModel {
        return this.readJson<NavigationModel>("navigation.json");
    }

    public getByType(type: string): ContentModel[] {
        return this.load()
            .filter(item => item.type === type)
            .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    }

    public getOne(type: string, slug: string): ContentModel {
        const normalized = this.normalizeSlug(slug);
        const item = this.load().find(entry => entry.type === type && entry.slug === normalized);

        if (!item) {
            throw new ContentNotFoundError(type, normalized);
        }

        return item;
    }

    private load(): ContentModel[] {
        if (!this.content) {
            this.content = this.readJson<ContentModel[]>("content.json");
        }
        return this.content;
    }

    private readJson<T>(fileName: string): T {
        const filePath = path.join(appConfig.dataDir, fileName);
        const raw = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(raw) as T;
    }

    private normalizeSlug(slug: string): string {
        try {
            return decodeURIComponent(slug);
        } catch {
            return slug;
        }
    }
}

export const contentService = new ContentService();
