"use client";
import React from "react";
import NewProductsCard from "./new-products-card";
import { useProduct } from "@/service/hooks/useProduct";

const NewProducts = () => {
  const { products, isProductsLoading } = useProduct();

  return (
    <div className=" h-fit sm:flex sm:justify-center sm:flex-col py-8 sm:py-12 2xl:py-16 bg-white w-full mx-auto overflow-hidden ">
      <div className="flex justify-center flex-col items-center rounded-b-md w-full gap-8 sm:gap-12 2xl:gap-16 bg-white ">
        <h1 className="text-2xl sm:text-3xl font-light uppercase text-gray-700 md:text-4xl">
          New Arrival
        </h1>
        <div className="flex w-full items-center  justify-center ">
          <NewProductsCard
            newProducts={products?.slice(0, 8)}
            isProductsLoading={isProductsLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default NewProducts;
