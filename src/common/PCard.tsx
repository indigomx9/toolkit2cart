import React from "react";
import { Button } from "./Button";
import { useAppSelector, useAppDispatch } from "../global/Hooks";
import { IProduct } from "../types/Interfaces";
import { addToCart, removeFromCart } from "../global/CartSlice";
import { PCardContainer } from "./PCardStyles";
import { Quantity } from "./Quantity";

interface Props {
    product: IProduct
};

export const PCard = 
({product}: Props): JSX.Element => {
    const dispatch = useAppDispatch();
    const { products } = useAppSelector((state) => state.cart)
    const [quantity, setQuantity] = React.useState(0);

    React.useEffect(() => {
        const getProductQuantity = (productId: number): number => {
            const selectedProduct = products.find(
                (cartProduct) => cartProduct.id === productId);
            if (selectedProduct) {
                return selectedProduct.quantity;
            };
            return 0;
        };
        setQuantity(getProductQuantity(product.id));
    }, [product, products]);

    const handleAdd = (product: IProduct) => {
        dispatch(addToCart(product));
    };

    const handleSub = (productId: number) => {
        dispatch(removeFromCart(productId));
    };

    return (
        <PCardContainer>
            <h3>{product.title}</h3>
            <h3>Price {product.price}</h3>
            <img 
                src={product.image} 
                alt={product.title} 
                style={{height: "250px", 
                    width: "auto"}}
            />
            {quantity ? (
                <Quantity 
                    onPlusClick={() => handleAdd(product)}
                    onMinusClick={() => handleSub(product.id)}
                    quantity={quantity}
                />
            ) : (
                <Button 
                    onClick={() => handleAdd(product)}
                    title="Add to Cart"
                />
            )}
        </PCardContainer>
    );
};




