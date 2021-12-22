import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { Product, Stock } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

interface AmountListType {
  
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  
  const [cart, setCart] = useState<Product[]>([])
  
  const [amountList , setAmountList] = useState<AmountListType[]>([])
  
  //(() => {
    // const storagedCart = Buscar dados do localStorage

    // if (storagedCart) {
    //   return JSON.parse(storagedCart);
    // }

    //return [];
  //});

  useEffect(()=>{ 
    console.log(cart)
    console.log(amountList)
  
  
  
  },[cart])

  const addProduct = async (productId: number) => {
    try {
      let productToBeAdd = await api.get(`/products/${productId}`).then( res => res.data )
      setCart(cart.concat(productToBeAdd))

      let productAmount =  "queijo"

      //setAmountList(amountList.concat(productAmount))

      let temp = [productId , cart.reduce((acc, produto)=>{
        if( productId === produto.id) {
          return acc + 1
      }
        return acc
      }, 1 )]

      setAmountList(amountList.concat(temp))

      
      
    } catch {
      // TODO
    }
  };

  const removeProduct = (productId: number) => {
    try {
      // TODO
    } catch {
      // TODO
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      // TODO
    } catch {
      // TODO
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
