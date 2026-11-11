import axios from "axios";
import type { ContentModel } from "../models/content-model";
import type { NavigationModel, SiteModel } from "../models/site-model";
import { appConfig } from "../utils/app-config";

class ContentService {
    public async getSite(): Promise<SiteModel> {
        const response = await axios.get<SiteModel>(appConfig.siteUrl);
        return response.data;
    }

    public async getNavigation(): Promise<NavigationModel> {
        const response = await axios.get<NavigationModel>(appConfig.navigationUrl);
        return response.data;
    }

    public async getByType(type: string): Promise<ContentModel[]> {
        const response = await axios.get<ContentModel[]>(`${appConfig.contentUrl}/${type}`);
        return response.data;
    }

    public async getOne(type: string, slug: string): Promise<ContentModel> {
        const response = await axios.get<ContentModel>(`${appConfig.contentUrl}/${type}/${encodeURIComponent(slug)}`);
        return response.data;
    }
}

export const contentService = new ContentService();
