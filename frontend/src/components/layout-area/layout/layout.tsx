import { Footer } from "../footer/footer";
import { Header } from "../header/header";
import { Routing } from "../routing/routing";
import "./layout.css";

export function Layout() {
    return (
        <div className="layout">
            <Header />
            <main>
                <Routing />
            </main>
            <Footer />
        </div>
    );
}
