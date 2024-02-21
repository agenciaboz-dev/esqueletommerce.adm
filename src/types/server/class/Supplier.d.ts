import { Prisma } from "@prisma/client";
import { supplier as include } from "../prisma/include";
import { Contact } from "./Contact";
import { SupplierForm } from "../types/shared/SupplierForm";
import { Socket } from "socket.io";
export type SupplierPrisma = Prisma.SupplierGetPayload<{
    include: typeof include;
}>;
export declare class Supplier {
    id: number;
    name: string;
    cnpj: string;
    code: string;
    contact_id: number;
    contact: Contact;
    constructor(id: number);
    init(): Promise<void>;
    static list(socket: Socket): Promise<void>;
    static new(data: SupplierForm, user_id: number, socket: Socket): Promise<void>;
    static update(socket: Socket, data: Partial<SupplierPrisma> & {
        id: number;
    }, user_id: number): Promise<void>;
    static delete(socket: Socket, id: number, user_id: number): Promise<void>;
    load(data: SupplierPrisma): void;
    log(user_id: number, text: string): Promise<void>;
    update(data: Partial<SupplierPrisma>, socket?: Socket): Promise<void>;
}
