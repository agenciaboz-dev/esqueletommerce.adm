import { Prisma } from "@prisma/client";
export type DimensionsPrisma = Prisma.DimensionsGetPayload<{}>;
export declare class Dimensions {
    id: number;
    weight: number;
    height: number;
    length: number;
    width: number;
    product_id: number | null;
    option_id: number | null;
    constructor(data: DimensionsPrisma);
}
