import { Prisma } from "@prisma/client";
import { user as include } from "../prisma/include";
import { Socket } from "socket.io";
import { SignupForm } from "../types/shared/user/signup";
import { LoginForm } from "../types/shared/user/login";
import { Address } from "./Address";
export type UserPrisma = Prisma.UserGetPayload<{
    include: typeof include;
}>;
export declare class User {
    id: number;
    email: string;
    password: string;
    name: string;
    cpf: string;
    birth: string;
    phone: string;
    pronoun: string;
    admin: boolean;
    image: string | null;
    google_id: string | null;
    google_token: string | null;
    address?: Address;
    constructor(id: number);
    init(): Promise<void>;
    static update(data: Partial<UserPrisma> & {
        id: number;
    }, socket: Socket): Promise<void>;
    static signup(socket: Socket, data: SignupForm): Promise<void>;
    static list(socket: Socket): Promise<void>;
    static login(socket: Socket, data: LoginForm): Promise<void>;
    static delete(socket: Socket, id: number): Promise<void>;
    load(data: UserPrisma): void;
    update(data: Partial<UserPrisma>, socket?: Socket): Promise<void>;
}
