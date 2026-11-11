import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { contentService } from "../../service/contentService";
import type { ContentModel } from "../../models/content-model";
import type { NavigationLinkModel, SiteModel } from "../../models/site-model";
import { contentPath } from "../../utils/content-path";
import { useTitle } from "../../utils/UseTitle";
import "./home.css";

export function Home() {
    useTitle("T.MORE פתרונות למידה מתקדמים");

    const [site, setSite] = useState<SiteModel | null>(null);
    const [navigation, setNavigation] = useState<NavigationLinkModel[]>([]);
    const [posts, setPosts] = useState<ContentModel[]>([]);

    useEffect(() => {
        contentService.getSite().then(setSite).catch(console.error);
        contentService.getNavigation().then(data => setNavigation(data.items)).catch(console.error);
        contentService.getByType("post").then(data => setPosts(data.slice(0, 3))).catch(console.error);
    }, []);

    const organizations = navigation.find(item => item.label === "למידה בארגונים");
    const education = navigation.find(item => item.label === "למידה בחינוך");

    return (
        <div className="home">
            <section
                className="hero"
                style={site?.heroImage ? { backgroundImage: `url(${site.heroImage})` } : undefined}
            >
                <div className="hero-overlay" />
                <div className="hero-copy">
                    <h1>{site?.heroTitle}</h1>
                    <p>{site?.heroSubtitle}</p>
                    <a className="hero-button" href="#about">פרטים נוספים</a>
                </div>
            </section>

            <section className="intro" id="about">
                <p className="eyebrow">{site?.introTitle}</p>
                <h2>{site?.introHeading}</h2>
                <p>{site?.introText}</p>
                <Link className="solid-button" to="/about">קראו עוד</Link>
            </section>

            {!!site?.clients.length && (
                <section className="clients">
                    {site.clients.map(client => (
                        <img key={client.src} src={client.src} alt={client.alt} />
                    ))}
                </section>
            )}

            <section className="domains">
                <h2>תחומי התמחות</h2>
                <p>{site?.domainsText}</p>
                <div className="domain-grid">
                    <article className="domain-card education">
                        <h3>למידה בחינוך</h3>
                        {education?.children?.map(link => (
                            <Link key={link.path} to={link.path || "/"}>{link.label}</Link>
                        ))}
                    </article>
                    <article className="domain-card organizations">
                        <h3>למידה בארגונים</h3>
                        {organizations?.children?.map(link => (
                            <Link key={link.path} to={link.path || "/"}>{link.label}</Link>
                        ))}
                    </article>
                </div>
            </section>

            <section className="reasons">
                <h2>מדוע בוחרים בנו?</h2>
                <div className="reason-grid">
                    {site?.reasons.map(reason => (
                        <article key={reason.title}>
                            <h3>{reason.title}</h3>
                            <p>{reason.text}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="articles">
                <div className="section-head">
                    <h2>חשוב לדעת</h2>
                    <Link to="/knowledge">לכל המאמרים</Link>
                </div>
                <div className="article-grid">
                    {posts.map(post => (
                        <Link className="article-card" key={post.id} to={contentPath(post.type, post.slug)}>
                            {post.imageUrl && <img src={post.imageUrl} alt="" />}
                            <h3>{post.title}</h3>
                            <p>{post.excerpt}</p>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
