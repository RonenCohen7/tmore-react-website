export type ContentModel = {
    id: number;
    type: string;
    slug: string;
    title: string;
    excerpt: string;
    paragraphs: string[];
    date: string | null;
    imageUrl: string | null;
};
