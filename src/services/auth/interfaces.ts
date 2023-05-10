export interface LoginOptions {
    email: string;
    password: string;
}
export interface SignupOptions extends LoginOptions {
    firstName: string;
    lastName: string;
}

export interface JwtPayload {
    id: string;
    createdAt: number;
}
