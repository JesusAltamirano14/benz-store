export interface SeedProduct {
    description: string,
    images: string[],
    inStock: number,
    price: number,
    sizes: ValidSizes[],
    slug: string,
    tags: string[],
    title: string,
    type: ValidTypes,
    gender: ValidGenders,
}

export interface SeedProductDataBase extends SeedProduct{
    _id:string
}

export type ValidGenders = 'men'|'women'|'kid'|'unisex';
export type ValidFilters = ValidGenders | 'all';
export type ValidSizes = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
export type ValidTypes = 'shirts'|'pants'|'hoodies'|'hats';

export interface SeedData {
    products: SeedProduct[],
}

