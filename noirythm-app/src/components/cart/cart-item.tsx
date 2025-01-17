import React from "react";
import Image from "next/image";
import { useCart } from "../../service/hooks/useCart";
import ButtonPrimary from "../button/button-primary";

interface Item {
  id: string;
  product_name: string;
  product_price: string;
  product_image: string;
}

const CartItem: React.FC<{ item: Item }> = ({ item }) => {
  const { removeFromCart } = useCart(item.id);

  const maxLength = 20;

  const truncatedName =
    item && item.product_name
      ? item.product_name.length > maxLength
        ? `${item.product_name.substring(0, maxLength)}...`
        : item.product_name
      : "Loading...";

  return (
    <div className="rounded-lg flex justify-start gap-4   w-full  h-fit  items-start ">
      <div className="relative m-4 ">
        <div className="w-20 h-20">
          <Image
            src={item.product_image}
            alt=""
            width={120}
            height={120}
            className="object-cover w-full h-full rounded-md"
          />
        </div>
      </div>
      <div className="relative text-start sm:flex justify-center flex-col ">
        <div className="relative bottom-5 top-2 ">
          <h4 className="text-1xl font-semibold text-black ">
            {truncatedName}
          </h4>
          <p className="text-sm font-bold text-black">{item.product_price}</p>
        </div>

        <div className="my-4">
          <ButtonPrimary onClick={() => removeFromCart()}>
            <div className="text-sm">Remove</div>
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
