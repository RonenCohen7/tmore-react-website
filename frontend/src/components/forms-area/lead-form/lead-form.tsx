import { useState } from "react";
import type { FormEvent } from "react";
import { leadService } from "../../service/leadService";
import { notificationService } from "../../service/notificationService";
import "./lead-form.css";

type LeadFormProps = {
    page: string;
    showRole?: boolean;
    showMessage?: boolean;
    submitLabel?: string;
};

const emptyLead = {
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    message: "",
    page: ""
};

export function LeadForm({ page, showRole = false, showMessage = false, submitLabel = "שליחה" }: LeadFormProps) {
    const [lead, setLead] = useState({ ...emptyLead, page });
    const [sending, setSending] = useState(false);

    function update(field: keyof typeof emptyLead, value: string): void {
        setLead(current => ({ ...current, [field]: value }));
    }

    async function onSubmit(event: FormEvent): Promise<void> {
        event.preventDefault();
        setSending(true);
        try {
            await leadService.addLead({ ...lead, page });
            notificationService.success("הפרטים נשלחו. נחזור אליכם.");
            setLead({ ...emptyLead, page });
        } catch {
            notificationService.error("לא הצלחנו לשלוח את הטופס.");
        } finally {
            setSending(false);
        }
    }

    return (
        <form className="lead-form" onSubmit={onSubmit}>
            <input value={lead.name} onChange={event => update("name", event.target.value)} placeholder="שם" required />
            <input value={lead.email} onChange={event => update("email", event.target.value)} placeholder="אימייל" type="email" />
            <input value={lead.phone} onChange={event => update("phone", event.target.value)} placeholder="טלפון" />
            <input value={lead.company} onChange={event => update("company", event.target.value)} placeholder="חברה" />
            {showRole && <input value={lead.role} onChange={event => update("role", event.target.value)} placeholder="תפקיד בחברה" />}
            {showMessage && <textarea value={lead.message} onChange={event => update("message", event.target.value)} placeholder="הודעה" rows={4} />}
            <button type="submit" disabled={sending}>{sending ? "שולח..." : submitLabel}</button>
        </form>
    );
}
