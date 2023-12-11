import axiosInstance from '@/utils/api';
import { getCart } from '../utils/getCart';
import { useAuth } from './useAuth';
import { useEffect, useState } from 'react';

interface Product {
  id: string;
  product_description: string;
  product_image: string;
  product_name: string;
  product_price: string;
}

interface CartData {
  cartProducts: Product[];
}



export const useCart = () => {
  const { user } = useAuth();
  const [userCart, setUserCart] = useState<CartData>({ cartProducts: [] });
 

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (user) {
          const response = await getCart(user);
          setUserCart(response);
        } else {
          console.log('user not found')
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, [user]);

  const addToCart = async (productId: any) => {
    try {
      const userId = user?.id;
      const payload = {
        userId: userId,
        productId: productId,
      };

      const response = await axiosInstance.post('/api/cart/add', payload);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const removeFromCart = async (productId: any) => {
  
    try {
      const userId = user?.id;
      const payload = {
        data: {
          userId: userId,
          productId: productId,
        }
      };
      
      const response = await axiosInstance.delete('/api/cart/delete', payload);      
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    addToCart,
    userCart,
    removeFromCart,
  };
};