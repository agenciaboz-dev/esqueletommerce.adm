import { Prisma } from "@prisma/client";
import { category as include } from "../prisma/include";
import { Socket } from "socket.io";
export type CategoryPrisma = Prisma.CategoryGetPayload<{
    include: typeof include;
}>;
export declare class Category {
    id: number;
    name: string;
    cover: string;
    constructor(id: number);
    static list(socket: Socket): Promise<void>;
    load(data: CategoryPrisma): void;
}
