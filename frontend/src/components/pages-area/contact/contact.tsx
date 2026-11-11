import { useEffect, useState } from "react";
import { FaEnvelope, FaFax, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { LeadForm } from "../../forms-area/lead-form/lead-form";
import { contentService } from "../../service/contentService";
import type { SiteModel } from "../../models/site-model";
import { useTitle } from "../../utils/UseTitle";
import "./contact.css";

export function Contact() {
    useTitle("צור קשר | T.MORE");
    const [site, setSite] = useState<SiteModel | null>(null);

    useEffect(() => {
        contentService.getSite().then(setSite).catch(console.error);
    }, []);

    return (
        <section className="contact-page">
            <header className="page-hero">
                <h1>צור קשר</h1>
            </header>
            <div className="contact-facts">
                <article><FaEnvelope /><h2>מייל</h2><a href={`mailto:${site?.email}`}>{site?.email}</a></article>
                <article><FaMapMarkerAlt /><h2>כתובת</h2><p>{site?.address}</p></article>
                <article><FaFax /><h2>פקס</h2><p>{site?.fax}</p></article>
                <article><FaPhoneAlt /><h2>טלפון משרד</h2><a href={site?.phoneHref}>{site?.phone}</a></article>
                <article><FaWhatsapp /><h2>ווטסאפ</h2><a href={site?.whatsappHref}>{site?.whatsapp}</a></article>
            </div>
            <div className="contact-form-card">
                <h2>השאירו פרטים ונחזור אליכם</h2>
                <LeadForm page="צור קשר" showMessage />
            </div>
        </section>
    );
}
