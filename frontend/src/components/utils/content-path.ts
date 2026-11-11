export function contentPath(type: string, slug: string): string {
    if (type === "page" && slug === "home") return "/";
    if (type === "page" && slug === "אודות-2") return "/about";
    if (type === "page" && slug === "our-team") return "/team";
    if (type === "page" && slug === "contact") return "/contact";
    if (type === "page" && slug === "career") return "/career";
    if (type === "page" && slug === "מרכז-ידע") return "/knowledge";
    if (type === "page" && slug === "הפתרונות-שלנו") return "/workshops";

    const folders: Record<string, string> = {
        post: "knowledge",
        service: "services",
        workshop: "workshops",
        course: "courses",
        product: "products",
        pdf: "projects",
        job: "jobs",
        page: "pages"
    };

    return `/${folders[type] ?? "pages"}/${slug}`;
}
