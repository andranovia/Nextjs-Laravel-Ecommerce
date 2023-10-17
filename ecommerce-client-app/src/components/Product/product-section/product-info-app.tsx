import React from 'react';
import { useRouter } from 'next/router';
import NavbarComponent from '@/components/navbar-section/navbar-app';
import { MdAddShoppingCart } from 'react-icons/md';
import { BsChatLeftText } from 'react-icons/bs';
import Image from 'next/image';
import { useCart } from '@/components/context/cartContext';
import ProductInfoRating from './product-info-rating-app';
import ButtonSecondary from '@/components/button/button-secondary-app';
import ButtonPrimary from '@/components/button/button-primary-app';

interface ProductInfoProps {
  product: {
    id: string;
    product_name: string;
    product_image: string;
    product_price: number;
    product_description: string;
  };
  query?: Record<string, string>;
}
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function ProductInfoComponent({ product }: ProductInfoProps) {
  const { dispatch } = useCart();
  const router = useRouter();
  const {
    id,
    product_name,
    product_image,
    product_price,
    product_description,
  } = router.query;

  const productImageSrc =
    typeof product_image === 'string' ? product_image : '';

  const [isMobile, setIsMobile] = React.useState(false);
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  React.useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleAddToCart = () => {
    const { id, product_name, product_price, product_image } = router.query;

    const itemToAdd: Product = {
      id: id as string,
      name: product_name as string,
      image: product_image as string,
      price: parseFloat(product_price as string),
    };

    dispatch({ type: 'ADD_TO_CART', payload: itemToAdd });

    console.log(router.query);
  };

  return (
    <div className="bg-white rounded-lg mb-20 md:my-0  ">
      <NavbarComponent />
      <pre>{JSON.stringify(product, null, 2)}</pre>
      <div
        className={`flex flex-col ${
          isMobile ? 'items-center' : 'items-start'
        } md:flex-row`}
      >
        {isMobile && (
          <Image
            src={productImageSrc}
            width={220}
            height={220}
            alt=""
            className="w-[20rem] rounded mt-6"
          />
        )}
        {!isMobile && (
          <div className="w-full md:w-1/2">
            <Image
              src={productImageSrc}
              width={420}
              height={420}
              alt=""
              className="relative w-full h-[50rem] object-cover z-1  md:mb-0"
            />
          </div>
        )}
        <div
          className={`w-full p-6 top-0 left-0 ${
            isMobile
              ? 'mt-4'
              : 'md:w-1/2 md:ml-[50%] md:fixed md:my-10 md:z-2000 '
          }`}
        >
          <p className="text-2xl font-bold mt-4">{`$${product_price}`}</p>
          <h1 className="text-3xl font-semibold">{product_name}</h1>
          <p className="text-gray-600">Product ID: {id}</p>

          <div className="mt-4 w-2/3 ">
            <label className="text-sm font-semibold">Select Size:</label>
            <select className="block w-full mt-2 p-2 border rounded border-gray-300 focus:outline-none focus:border-blue-400">
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div className="mt-10">
            <h2 className="font-medium text-2xl">Product description</h2>
            <p className=" text-gray-600 text-1xl ">{product_description}</p>
          </div>
          <div className="mt-10">
            <div className="font-medium text-2xl ">
              <h2 className="text-gray-800">Give rating to {product_name}!</h2>
            </div>
            <div className="mr-28 sm:flex justify-start">
              <ProductInfoRating />
            </div>
          </div>
          {!isMobile && (
            <div className="mt-6 flex justify-start items-center bg-white p-5 font-medium ">
              <div className="flex justify-center items-center mr-5">
                <BsChatLeftText className="w-7 h-7" />
              </div>
              <ButtonSecondary onClick={handleAddToCart}>
                Add to <MdAddShoppingCart />
              </ButtonSecondary>
              <ButtonPrimary>Buy Now</ButtonPrimary>
            </div>
          )}
        </div>
        {isMobile && (
          <div
            className="mt-6 flex justify-center items-center bg-white p-5 font-medium"
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 1000,
            }}
          >
            <div className="flex justify-center items-center mr-5">
              <BsChatLeftText className="w-7 h-7" />
            </div>
            <ButtonSecondary onClick={handleAddToCart}>
              Add to <MdAddShoppingCart />
            </ButtonSecondary>
            <ButtonPrimary>Buy Now</ButtonPrimary>
          </div>
        )}
      </div>
    </div>
  );
}
