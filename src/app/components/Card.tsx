'use client';
import React from 'react';
import Image from 'next/image';

interface FoodData {
  id: number;
  name: string;
  imageURL: string;
  categoryId: string;
  category: string;
}

interface CardProps {
  foodData: FoodData;
}

export default function Card({ foodData }: CardProps) {
  return (
    <div className="relative w-80 h-80 border-4 border-[#FF8364] rounded-full overflow-hidden group">
      <Image
        src={foodData.imageURL ? foodData.imageURL : '/images/pizza.jpg'}
        alt="FoodImage"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={true}
        fill
        className="object-cover transition-transform transform group-hover:scale-110"
      />
      <div className="absolute bottom-0 bg-[#FF8364] font-bold bg-opacity-80 text-white text-center w-full py-1">
        {foodData.name}
      </div>
    </div>
  );
}
