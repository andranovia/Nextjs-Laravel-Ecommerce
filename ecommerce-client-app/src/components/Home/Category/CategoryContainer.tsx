import React from 'react';
import CategoryCard from './CategoryCard';
import PromoCategory from '../promoCategory/PromoCategory';

export default function CategoryCarouselContainer() {
  const categories = [
    {
      id: 'all',
      image: 'https://img.icons8.com/ios-filled/50/192655/show-all-views.png',
      title: 'See all',
      description: 'All the things',
    },
    {
      id: 'cloths',
      image: 'https://img.icons8.com/ios/50/192655/clothes.png',
      title: 'Cloth',
      description: 'Get your cloth',
    },
    {
      id: 'trousers',
      image:
        'https://img.icons8.com/external-bartama-outline-64-bartama-graphic/64/192655/external-clothes-clothes-accessories-outline-bartama-outline-64-bartama-graphic-2.png',
      title: 'Trouser',
      description: 'Get your trouser',
    },
    {
      id: 'shoes',
      image: 'https://img.icons8.com/ios/50/192655/sneakers.png',
      title: 'Shoes',
      description: 'Get your shoes',
    },
  ];
  return (
    <div className="w-full h-fit sm:flex sm:justify-center sm:flex-col  bg-white rounded-md sm:max-w-screen-xl p-6  mx-auto -mt-4 sm:-mt-10 mb-8  overflow-hidden ">
      <div className="flex justify-center items-center ">
        <PromoCategory />
      </div>
      <div className="flex  justify-center relative sm:top-4">
        <CategoryCard categories={categories} />
      </div>
    </div>
  );
}
