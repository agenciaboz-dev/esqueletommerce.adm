import { Prisma } from "@prisma/client";
import { category as include } from "../prisma/include";
import { Socket } from "socket.io";
import { CategoryForm } from "../types/shared/category/update";
export type CategoryPrisma = Prisma.CategoryGetPayload<{
    include: typeof include;
}>;
export declare class Category {
    id: number;
    name: string;
    image: string | null;
    constructor(data: CategoryPrisma);
    static list(socket: Socket): Promise<void>;
    static new(socket: Socket, data: CategoryForm): Promise<void>;
    static update(socket: Socket, data: Partial<CategoryPrisma> & {
        id: number;
        user_id: number;
    }): Promise<void>;
    static delete(socket: Socket, id: number, user_id: number): Promise<void>;
    load(data: CategoryPrisma): void;
    update(data: Partial<CategoryPrisma>, socket?: Socket): Promise<void>;
    log(user_id: number, text: string): Promise<void>;
}
