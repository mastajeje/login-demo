export interface User {
    username: string,
    password: string,
}

export interface LoginResponse {
    token: string;
    success: boolean;
    message: string;
}