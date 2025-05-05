export interface AutenticateUserDTO {
    email: string | null;
    password: string;
}
export interface ResponseAutenticatedUser {
    accessToken: string;
    message: string;
}
