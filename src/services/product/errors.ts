export class DuplicateProductException extends Error {
    name = "DuplicateProductException";
    status = 400;
}

export class ProductNotFoundException extends Error {
    name = "ProductNotFoundException";
    status = 404;
}
