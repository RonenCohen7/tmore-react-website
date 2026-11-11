export class ContentModel {
    public id: number = 0;
    public type: string = "";
    public slug: string = "";
    public title: string = "";
    public excerpt: string = "";
    public paragraphs: string[] = [];
    public date: string | null = null;
    public imageUrl: string | null = null;
}
