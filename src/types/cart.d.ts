

type ValidSizesCart = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';


export interface productCart {
    _id:string,
    images: string[],
    price: number,
    size: ValidSizesCart,
    title: string,
    quantity:number,
    inStock?:number,
}