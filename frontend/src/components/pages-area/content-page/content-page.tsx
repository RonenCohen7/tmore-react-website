import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { contentService } from "../../service/contentService";
import type { ContentModel } from "../../models/content-model";
import { useTitle } from "../../utils/UseTitle";
import { LeadForm } from "../../forms-area/lead-form/lead-form";
import "./content-page.css";

type ContentPageProps = {
    type: string;
    slug?: string;
};

export function ContentPage({ type, slug }: ContentPageProps) {
    const params = useParams();
    const actualSlug = slug || params.slug || "";
    const [item, setItem] = useState<ContentModel | null>(null);
    const [missing, setMissing] = useState(false);

    useTitle(item ? `${item.title} | T.MORE` : "T.MORE");

    useEffect(() => {
        setMissing(false);
        contentService.getOne(type, actualSlug)
            .then(setItem)
            .catch(() => setMissing(true));
    }, [type, actualSlug]);

    if (missing) {
        return <section className="content-page"><h1>העמוד לא נמצא</h1></section>;
    }

    if (!item) {
        return <section className="content-page"><p>טוען...</p></section>;
    }

    return (
        <article className="content-page">
            <header className="page-hero">
                <h1>{item.title}</h1>
            </header>
            {item.imageUrl && <img className="page-image" src={item.imageUrl} alt="" />}
            <div className="page-body">
                {item.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            </div>
            {type === "job" && (
                <section className="page-form">
                    <h2>השאירו פרטים</h2>
                    <LeadForm page={item.title} showMessage />
                </section>
            )}
        </article>
    );
}
