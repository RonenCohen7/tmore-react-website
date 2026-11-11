import fs from "fs";
import { LeadModel } from "../models/lead-model";
import { ValidationError } from "../models/client-errors";
import { appConfig } from "../utils/app-config";

class LeadService {
    public async addLead(lead: LeadModel): Promise<LeadModel> {
        lead.name = this.clean(lead.name);
        lead.email = this.clean(lead.email);
        lead.phone = this.clean(lead.phone);
        lead.company = this.clean(lead.company);
        lead.role = this.clean(lead.role);
        lead.message = this.clean(lead.message);
        lead.page = this.clean(lead.page);

        if (!lead.name) {
            throw new ValidationError("חסר שם");
        }

        if (!lead.email && !lead.phone) {
            throw new ValidationError("חסר אימייל או טלפון");
        }

        if (lead.email && !lead.email.includes("@")) {
            throw new ValidationError("אימייל לא תקין");
        }

        lead.createdAt = new Date().toISOString();

        const leads = this.readLeads();
        leads.push(lead);
        fs.writeFileSync(appConfig.leadsFile, JSON.stringify(leads, null, 2), "utf-8");

        return lead;
    }

    private readLeads(): LeadModel[] {
        if (!fs.existsSync(appConfig.leadsFile)) {
            return [];
        }

        const raw = fs.readFileSync(appConfig.leadsFile, "utf-8");
        return JSON.parse(raw) as LeadModel[];
    }

    private clean(value: string | undefined): string {
        return String(value || "")
            .replace(/[<>]/g, "")
            .replace(/\s+/g, " ")
            .trim();
    }
}

export const leadService = new LeadService();
