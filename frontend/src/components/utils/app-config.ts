class AppConfig {
    private readonly rawBaseUrl = import.meta.env.VITE_API_URL || "/api";
    public readonly baseUrl = this.rawBaseUrl.endsWith("/") ? this.rawBaseUrl : `${this.rawBaseUrl}/`;
    public readonly siteUrl = `${this.baseUrl}site`;
    public readonly navigationUrl = `${this.baseUrl}navigation`;
    public readonly contentUrl = `${this.baseUrl}content`;
    public readonly leadsUrl = `${this.baseUrl}leads`;
}

export const appConfig = new AppConfig();
