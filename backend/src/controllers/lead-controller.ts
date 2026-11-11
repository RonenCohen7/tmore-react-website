import express, { NextFunction, Request, Response } from "express";
import { LeadModel } from "../models/lead-model";
import { leadService } from "../services/lead-service";
import { StatusCode } from "../models/enum";

class LeadController {
    public readonly router = express.Router();

    public constructor() {
        this.router.post("/api/leads", this.addLead);
    }

    private async addLead(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const lead = request.body as LeadModel;
            const saved = await leadService.addLead(lead);
            response.status(StatusCode.Created).json(saved);
        } catch (err: any) {
            next(err);
        }
    }
}

export const leadController = new LeadController();
