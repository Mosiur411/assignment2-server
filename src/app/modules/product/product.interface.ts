export type TProduct = {
    name: string,
    brand: string,
    price: number,
    category: "Mountain" | "Road" | "Hybrid" | "Electric",
    description: string,
    quantity: number,
    inStock: boolean,
    isDeleted?: boolean,
}
export type TProductUpdate = {
    name?: string,
    brand?: string,
    price?: number,
    category?: "Mountain" | "Road" | "Hybrid" | "Electric",
    description?: string,
    quantity?: number,
    inStock?: boolean,
}
export type TProductQuery = {
    name?: string,
    brand?: string,
    category?: "Mountain" | "Road" | "Hybrid" | "Electric",

}
