import bcrypt from 'bcrypt';

export class HashService {
    async generatePwdHash(senha: string): Promise<string> {
        const hashedPwd = await bcrypt.hash(senha, 10);

        return hashedPwd;
    }
}
