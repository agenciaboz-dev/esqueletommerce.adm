import { Prisma } from "@prisma/client";
export type ImagePrisma = Prisma.ImageGetPayload<{}>;
export declare class Image {
    id: number;
    url: string;
    product_id: number | null;
    option_id: number | null;
    constructor(data: ImagePrisma);
}
