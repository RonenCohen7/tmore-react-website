import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { contentService } from "../../service/contentService";
import type { NavigationLinkModel, SiteModel } from "../../models/site-model";
import "./header.css";

export function Header() {
    const [site, setSite] = useState<SiteModel | null>(null);
    const [items, setItems] = useState<NavigationLinkModel[]>([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        contentService.getSite().then(setSite).catch(console.error);
        contentService.getNavigation().then(data => setItems(data.items)).catch(console.error);
    }, []);

    return (
        <header className="site-header">
            <div className="header-inner">
                <Link to="/" className="brand" onClick={() => setOpen(false)}>
                    {site?.logo
                        ? <img src={site.logo} alt="T.MORE" />
                        : <span>T.MORE</span>}
                </Link>

                <button
                    className="menu-toggle"
                    type="button"
                    aria-label="פתיחת תפריט"
                    aria-expanded={open}
                    onClick={() => setOpen(value => !value)}
                >
                    <span />
                    <span />
                    <span />
                </button>

                <nav className={open ? "main-nav open" : "main-nav"}>
                    {items.map(item => (
                        <div className="nav-item" key={item.label}>
                            {item.path
                                ? <NavLink to={item.path} onClick={() => setOpen(false)}>{item.label}</NavLink>
                                : <span className="nav-label">{item.label}</span>}
                            {item.children && (
                                <div className="dropdown">
                                    {item.children.map(child => (
                                        <Link key={child.path} to={child.path || "/"} onClick={() => setOpen(false)}>
                                            {child.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                <div className="header-tools">
                    <a href={site?.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
                    <a href={site?.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
                    <a href={site?.whatsappHref} target="_blank" rel="noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
                    <a className="phone-button" href={site?.phoneHref || "tel:037711388"}>
                        <FaPhoneAlt />
                        <span>{site?.phone || "03-7711388"}</span>
                    </a>
                </div>
            </div>
        </header>
    );
}
