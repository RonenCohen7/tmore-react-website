import { Route, Routes } from "react-router-dom";
import { CollectionPage } from "../../pages-area/collection-page/collection-page";
import { Contact } from "../../pages-area/contact/contact";
import { ContentPage } from "../../pages-area/content-page/content-page";
import { Home } from "../../pages-area/home/home";
import { Page404 } from "../../pages-area/page404/page404";

export function Routing() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<ContentPage type="page" slug="אודות-2" />} />
            <Route path="/team" element={<ContentPage type="page" slug="our-team" />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/career" element={<CollectionPage type="job" title="קריירה" introType="page" introSlug="career" />} />
            <Route path="/jobs/:slug" element={<ContentPage type="job" />} />
            <Route path="/knowledge" element={<CollectionPage type="post" title="מרכז ידע" introType="page" introSlug="מרכז-ידע" />} />
            <Route path="/knowledge/:slug" element={<ContentPage type="post" />} />
            <Route path="/services" element={<CollectionPage type="service" title="השירותים שלנו" />} />
            <Route path="/services/:slug" element={<ContentPage type="service" />} />
            <Route path="/workshops" element={<CollectionPage type="workshop" title="סדנאות והכשרות" introType="page" introSlug="הפתרונות-שלנו" />} />
            <Route path="/workshops/:slug" element={<ContentPage type="workshop" />} />
            <Route path="/courses" element={<CollectionPage type="course" title="קורסים ופתרונות למידה" />} />
            <Route path="/courses/:slug" element={<ContentPage type="course" />} />
            <Route path="/products" element={<CollectionPage type="product" title="התוצרים שלנו" />} />
            <Route path="/products/:slug" element={<ContentPage type="product" />} />
            <Route path="/projects" element={<CollectionPage type="pdf" title="פרויקטים" />} />
            <Route path="/projects/:slug" element={<ContentPage type="pdf" />} />
            <Route path="/pages/:slug" element={<ContentPage type="page" />} />
            <Route path="*" element={<Page404 />} />
        </Routes>
    );
}
