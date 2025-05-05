'use client';
import React from 'react';
import Image from 'next/image';

export interface FoodData {
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
    <div>
      <div className="relative w-64 h-64 rounded-full overflow-hidden group ">
        <Image
          src={foodData.imageURL ? foodData.imageURL : '/images/pizza.jpg'}
          alt="FoodImage"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={true}
          fill
          className="object-cover transition-transform transform group-hover:scale-110"
        />
      </div>
      <div className="text-black font-bold text-center text-2xl px-4 py-2 rounded-md">{foodData.name}</div>
    </div>
  );
}
