export class DuplicateUserException extends Error {
    name = "DuplicateUserException";
    status = 400;
}

export class TokenGenerationException extends Error {
    status = 500;
    name = "TokenGenerationException";
}

export class InvalidCredentialException extends Error {
    name = "InvalidCredentialException";
    status = 400;
}
