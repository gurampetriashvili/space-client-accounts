export interface Account {
    id: string,
    accountNumber: number,
    clientNumber: number,
    accountType: AccountTypes,
    currency: Currencies,
    status: 'open' | 'closed',
}

export enum AccountTypes {
    Saving = 'Saving',
    Current = 'Current',
    Keep = 'Keep',
}

export enum Currencies {
    gel = 'GEL',
    usd = 'USD',
    eur = 'EUR',
}