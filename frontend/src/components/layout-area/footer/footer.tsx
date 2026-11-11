import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { LeadForm } from "../../forms-area/lead-form/lead-form";
import { contentService } from "../../service/contentService";
import type { NavigationLinkModel, SiteModel } from "../../models/site-model";
import "./footer.css";

export function Footer() {
    const [site, setSite] = useState<SiteModel | null>(null);
    const [columns, setColumns] = useState<NavigationLinkModel[]>([]);

    useEffect(() => {
        contentService.getSite().then(setSite).catch(console.error);
        contentService.getNavigation()
            .then(data => setColumns(data.items.filter(item => item.children)))
            .catch(console.error);
    }, []);

    return (
        <footer className="site-footer">
            <section className="footer-lead">
                <h2>השאירו פרטים ונחזור אליכם</h2>
                <LeadForm page="footer" showRole />
            </section>

            <section className="footer-grid">
                <div>
                    {site?.logo && <img className="footer-logo" src={site.logo} alt="T.MORE" />}
                    <p>{site?.address}</p>
                    <p><a href={`mailto:${site?.email}`}>{site?.email}</a></p>
                    <p><a href={site?.phoneHref}>{site?.phone}</a></p>
                    <div className="footer-social">
                        <a href={site?.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
                        <a href={site?.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
                        <a href={site?.whatsappHref} target="_blank" rel="noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
                    </div>
                </div>

                {columns.map(column => (
                    <div key={column.label}>
                        <h3>{column.label}</h3>
                        {column.children?.map(link => (
                            <Link key={link.path} to={link.path || "/"}>{link.label}</Link>
                        ))}
                    </div>
                ))}
            </section>

            <section className="footer-bottom">
                <span>© כל הזכויות שמורות ל-T.MORE</span>
                <Link to="/pages/privacy-policy">תקנון ומדיניות פרטיות</Link>
            </section>
        </footer>
    );
}
