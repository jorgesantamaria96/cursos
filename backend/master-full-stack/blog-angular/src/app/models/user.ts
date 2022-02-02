export class User {
    id: number = 1;
    sub: number = 1;
    name: string = "";
    surname: string = "";
    role: string = "ROLE_USER";
    email: string = "";
    password: string = "";
    description: string = "";
    image: string = "";
    getToken: boolean = false;
    
    constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
}