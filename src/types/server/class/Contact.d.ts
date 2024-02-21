import { Prisma } from "@prisma/client";
export type ContactPrisma = Prisma.ContactGetPayload<{}>;
export declare class Contact {
    id: number;
    name: string;
    supplier_id: number | null;
    email: string | null;
    phone: string | null;
    constructor(data: ContactPrisma);
    load(data: ContactPrisma): void;
}
