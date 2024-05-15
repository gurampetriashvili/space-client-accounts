export interface Client {
    id: string, 
    name: string, 
    lastName: string, 
    sex: string, 
    pin: number, 
    phone: number,
    jurAddress: Address,
    factAddress: Address,
    image: string
    
}

export interface Address {
    country: string,
    city: string,
    address: string,
}