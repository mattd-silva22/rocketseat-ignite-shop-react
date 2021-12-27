
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
  
  

  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem('@RocketShoes:cart');

     if (storagedCart) {
       return JSON.parse(storagedCart);
     }

    return [];
  });
  
  const [amountList , setAmountList] = useState<AmountListType[]>([]);
  
  
  

  

  const addProduct = async (productId: number) => {
    try {
      
      const updatedCart = [...cart]

      const productExist = updatedCart.find(item => item.id === productId)

      const productStock:Stock = await api.get(`/stock/${productId}`).then( res => res.data)

      let currentAmount = productExist?.amount ? productExist.amount : 0

      if(currentAmount + 1 > productStock.amount) {
        toast.error('Quantidade solicitada fora de estoque');
        return
      }
      

      if(productExist) {
        
        productExist.amount = currentAmount + 1

        localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedCart))
        setCart(updatedCart)

      } else {
        const productToBeAdd = await api.get(`/products/${productId}`).then( res => res.data )
        const newProduct = {...productToBeAdd,amount : 1}
        updatedCart.push(newProduct)

        localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedCart))
        setCart(updatedCart)
        
      
      }
      

      

  
    } catch {
      toast.error('Erro na adição do produto');
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
