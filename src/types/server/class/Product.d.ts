export declare class Product {
    id: number
    active: boolean
    sku: string
    name: string
    description: string
    technical: string
    brand: string
    stock: number
    price: number
    profit: number
    cost: number
    rating: number
    ratings: number
    sold: number
    categories: Category[]
    supplier_id: number
    supplier: Supplier
    dimensions_id: number
    dimensions: Dimensions
    gallery: Image[]
    variations: VariationPrisma[]
    constructor(id: number)
    init(): Promise<void>
    static list(socket: Socket): Promise<void>
    load(data: UserPrisma): void
}
