import express, { NextFunction, Request, Response } from "express";
import { contentService } from "../services/content-service";

class ContentController {
    public readonly router = express.Router();

    public constructor() {
        this.router.get("/api/site", this.getSite);
        this.router.get("/api/navigation", this.getNavigation);
        this.router.get("/api/content/:type/:slug", this.getOne);
        this.router.get("/api/content/:type", this.getByType);
    }

    private getSite(request: Request, response: Response, next: NextFunction): void {
        try {
            response.json(contentService.getSite());
        } catch (err: any) {
            next(err);
        }
    }

    private getNavigation(request: Request, response: Response, next: NextFunction): void {
        try {
            response.json(contentService.getNavigation());
        } catch (err: any) {
            next(err);
        }
    }

    private getByType(request: Request, response: Response, next: NextFunction): void {
        try {
            const type = String(request.params.type);
            response.json(contentService.getByType(type));
        } catch (err: any) {
            next(err);
        }
    }

    private getOne(request: Request, response: Response, next: NextFunction): void {
        try {
            const type = String(request.params.type);
            const slug = String(request.params.slug);
            response.json(contentService.getOne(type, slug));
        } catch (err: any) {
            next(err);
        }
    }
}

export const contentController = new ContentController();
