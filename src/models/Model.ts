export interface ICartItem {
    id: number,
    name: string
    description: string
    price: number
    image: { uri: string }
    count: number
}