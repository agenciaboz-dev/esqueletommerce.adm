import { Prisma } from "@prisma/client";
import { variation as include, option as option_include } from "../prisma/include";
import { Dimensions } from "./Dimensions";
import { Image } from "./Image";
export type VariationPrisma = Prisma.VariationGetPayload<{
    include: typeof include;
}>;
export type VariationOptionPrisma = Prisma.OptionGetPayload<{
    include: typeof option_include;
}>;
export declare class VariationOption {
    id: number;
    name: string;
    sku: string | null;
    price: number | null;
    promotion: number | null;
    stock: number | null;
    dimensions_id: number | null;
    dimensions: Dimensions | null;
    gallery: Image[];
    constructor(data: VariationOptionPrisma);
}
export declare class Variation {
    id: number;
    type: string;
    options: VariationOption[];
    constructor(data: VariationPrisma);
}
