export type CurrencyDetailsResponseModel = {
    id: string;
    symbol: string;
    name: string;
    image: {
        large: string;
        small: string;
        thumb: string;
    },
    total_supply: number
}