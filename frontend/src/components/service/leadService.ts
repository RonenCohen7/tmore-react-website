import axios from "axios";
import type { LeadModel } from "../models/lead-model";
import { appConfig } from "../utils/app-config";

class LeadService {
    public async addLead(lead: LeadModel): Promise<void> {
        await axios.post(appConfig.leadsUrl, lead);
    }
}

export const leadService = new LeadService();
