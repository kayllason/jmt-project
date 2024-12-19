"use client";
import React from "react";
import Image from "next/image";

interface CardProps {
  title: string;
}

export default function Card({ title }: CardProps) {
  return (
    <div className="relative w-80 h-80 border-2 border-gray-800 rounded-lg overflow-hidden">
      <Image
        src="/images/pizza.jpg"
        alt="Example"
        fill
      />
      <div className="absolute bottom-0 bg-black bg-opacity-50 text-white text-center w-full py-1">
        {title}
      </div>
    </div>
  );
}
