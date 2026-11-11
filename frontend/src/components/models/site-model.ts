export type ClientLogoModel = {
    src: string;
    alt: string;
};

export type ReasonModel = {
    title: string;
    text: string;
};

export type SiteModel = {
    name: string;
    tagline: string;
    heroTitle: string;
    heroSubtitle: string;
    heroImage: string | null;
    logo: string | null;
    phone: string;
    phoneHref: string;
    fax: string;
    email: string;
    whatsapp: string;
    whatsappHref: string;
    address: string;
    facebook: string;
    linkedin: string;
    introTitle: string;
    introHeading: string;
    introText: string;
    domainsText: string;
    clients: ClientLogoModel[];
    reasons: ReasonModel[];
};

export type NavigationLinkModel = {
    label: string;
    path?: string;
    children?: NavigationLinkModel[];
};

export type NavigationModel = {
    items: NavigationLinkModel[];
};
