export interface AutenticaUsuarioDTO {
    email: string | null;
    password: string;
    phone: string | null;
}
export interface ResponseUsuarioAutenticado {
    accessToken: string;
    message: string;
}
