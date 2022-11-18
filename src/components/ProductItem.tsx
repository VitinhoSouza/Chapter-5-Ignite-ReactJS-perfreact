import React, {memo, useState, lazy, Suspense } from "react";
import { AddProductToWishListProps } from "./AddProductToWishList";
import lodash from "lodash";

const AddProductToWishList = lazy(()=>{
    return import("./AddProductToWishList")
        // .then(({ AddProductToWishList }) => ({ default: AddProductToWishList }))
        .then((module) => ({default: module.AddProductToWishList}))
})

interface ProductItemProps{
    product: {
        id: number;
        price: number;
        title: string;
        priceFormatted: string;
    },
    onAddToWishList: (id:number) => void;
}


export function ProductItemComponent ({product, onAddToWishList}:ProductItemProps){

    const [isAddingToWishList, setIsAddingToWishList] = useState(false);
    return (
        <div>
            {product.title} - <strong>{product.priceFormatted}</strong>
            <button onClick={()=>setIsAddingToWishList(true)}>Adicionar aos favoritos</button>

            {isAddingToWishList && (
                <Suspense fallback={<>...</>}>
                    <AddProductToWishList onAddToWishList={()=>onAddToWishList(product.id)} onRequestClose={()=>setIsAddingToWishList(false)}/>
                </Suspense>
            )}
        </div>
    )
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps)=>{
    // return Object.is(prevProps.product, nextProps.product);
    return lodash.isEqual(prevProps.product, nextProps.product);
});