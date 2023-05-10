export interface APIResponse {
    success: boolean;
    message: string;
    data?: {
        [key: string]: any;
    };
}
