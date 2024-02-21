import { Prisma } from "@prisma/client";
import { LogInit } from "../types/LogInit";
export type LogPrisma = Prisma.LogGetPayload<{}>;
export declare class Log {
    id: number;
    text: string;
    timestamp: string;
    constructor(data: LogInit);
    load(data: LogPrisma): void;
    save(text: string): Promise<void>;
}
