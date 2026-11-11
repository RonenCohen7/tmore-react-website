import { StatusCode } from "./enum";

abstract class BaseClientError {
    public status: StatusCode;
    public message: string;

    public constructor(status: StatusCode, message: string) {
        this.status = status;
        this.message = message;
    }
}

export class RouteNotFoundError extends BaseClientError {
    public constructor(route: string) {
        super(StatusCode.NotFound, `Route ${route} not found.`);
    }
}

export class ResourceNotFoundError extends BaseClientError {
    public constructor(id: number) {
        super(StatusCode.NotFound, `id ${id} not found.`);
    }
}

export class ContentNotFoundError extends BaseClientError {
    public constructor(type: string, slug: string) {
        super(StatusCode.NotFound, `${type}/${slug} not found.`);
    }
}

export class ValidationError extends BaseClientError {
    public constructor(message: string) {
        super(StatusCode.BadRequest, message);
    }
}
