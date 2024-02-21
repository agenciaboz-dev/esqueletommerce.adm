import { Prisma } from "@prisma/client";
import { LogInit } from "../types/LogInit";
import { Socket } from "socket.io";
export type LogPrisma = Prisma.LogGetPayload<{}>;
export declare class Log {
    id: number;
    text: string;
    timestamp: string;
    constructor(data: LogInit);
    static list(socket: Socket): Promise<void>;
    load(data: LogPrisma): void;
    save(text: string): Promise<void>;
}
