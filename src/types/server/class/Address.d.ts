import { Prisma } from "@prisma/client";
export type AddressPrisma = Prisma.AddressGetPayload<{}>;
export declare class Address {
    id: number;
    cep: string;
    street: string;
    number: string;
    district: string;
    uf: string;
    city: string;
    user_id: number;
    constructor(data: AddressPrisma);
    init(data: AddressPrisma): void;
}
