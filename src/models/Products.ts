export interface IProduct {
    brand: string
    description: string
    id: number
    name: string
    pictureUrl: string
    price: number
    quantityInStock: number
    type: string
}

export interface IPacketItem{
    productId: number,
    name: string,
    price: number,
    pictureUrl: string,
    brand: string,
    type: string,
    quantity: number
}