import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { contentService } from "../../service/contentService";
import type { ContentModel } from "../../models/content-model";
import { contentPath } from "../../utils/content-path";
import { useTitle } from "../../utils/UseTitle";
import "./collection-page.css";

type CollectionPageProps = {
    type: string;
    title: string;
    introType?: string;
    introSlug?: string;
};

export function CollectionPage({ type, title, introType, introSlug }: CollectionPageProps) {
    useTitle(`${title} | T.MORE`);

    const [items, setItems] = useState<ContentModel[]>([]);
    const [intro, setIntro] = useState<string[]>([]);

    useEffect(() => {
        contentService.getByType(type).then(setItems).catch(console.error);
        if (introType && introSlug) {
            contentService.getOne(introType, introSlug)
                .then(page => setIntro(page.paragraphs.slice(0, 3)))
                .catch(() => setIntro([]));
        }
    }, [type, introType, introSlug]);

    return (
        <section className="collection-page">
            <header className="page-hero">
                <h1>{title}</h1>
            </header>
            {intro.map(paragraph => <p className="collection-intro" key={paragraph}>{paragraph}</p>)}
            <div className="collection-grid">
                {items.map(item => (
                    <Link className="collection-card" key={item.id} to={contentPath(item.type, item.slug)}>
                        {item.imageUrl && <img src={item.imageUrl} alt="" />}
                        <h2>{item.title}</h2>
                        <p>{item.excerpt}</p>
                    </Link>
                ))}
            </div>
            {items.length === 0 && <p>אין פריטים להצגה כרגע.</p>}
        </section>
    );
}
