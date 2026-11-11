export class ClientLogoModel {
    public src: string = "";
    public alt: string = "";
}

export class ReasonModel {
    public title: string = "";
    public text: string = "";
}

export class SiteModel {
    public name: string = "";
    public tagline: string = "";
    public heroTitle: string = "";
    public heroSubtitle: string = "";
    public heroImage: string | null = null;
    public logo: string | null = null;
    public phone: string = "";
    public phoneHref: string = "";
    public fax: string = "";
    public email: string = "";
    public whatsapp: string = "";
    public whatsappHref: string = "";
    public address: string = "";
    public facebook: string = "";
    public linkedin: string = "";
    public introTitle: string = "";
    public introHeading: string = "";
    public introText: string = "";
    public domainsText: string = "";
    public clients: ClientLogoModel[] = [];
    public reasons: ReasonModel[] = [];
}

export class NavigationLinkModel {
    public label: string = "";
    public path?: string;
    public children?: NavigationLinkModel[];
}

export class NavigationModel {
    public items: NavigationLinkModel[] = [];
}
