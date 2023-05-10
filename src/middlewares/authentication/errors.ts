export class MissingAuthorizationHeaderException extends Error {
    name = "MissingAuthorizationHeaderException";
    status = 401;
}

export class InvalidAuthorizationHeaderException extends Error {
    name = "InvalidAuthorizationHeaderException";
    status = 401;
}

export class UnauthorizedException extends Error {
    name = "UnauthorizedException";
    status = 401;
}
