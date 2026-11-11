import { Link } from "react-router-dom";
import { useTitle } from "../../utils/UseTitle";
import "./page404.css";

export function Page404() {
    useTitle("העמוד לא נמצא | T.MORE");

    return (
        <section className="page404">
            <h1>העמוד לא נמצא</h1>
            <p>הקישור לא מוביל לעמוד באתר.</p>
            <Link to="/">חזרה לעמוד הבית</Link>
        </section>
    );
}
