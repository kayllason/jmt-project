'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Category from './Category';
import Card from './Card';

interface Food {
  id: number;
  name: string;
  imageURL: string;
  categoryId: string;
  category: string;
}

export default function List() {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [foodData, setFoodData] = useState<Food[]>([]);
  const [filteredFoodData, setFilteredFoodData] = useState<Food[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/data/list.json`);
      const result = await response.json();
      setFoodData(result.data);
    } catch (error) {
      console.error('데이터 불러오기 도중 오류가 발생하였습니다.', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterFoodData = (checkedItems: string[]) => {
    if (checkedItems.length > 0) {
      return foodData.filter(item => checkedItems.includes(item.categoryId));
    }
    return foodData;
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = filterFoodData(checkedItems);
    setFilteredFoodData(filtered);
  }, [checkedItems, foodData]);

  return (
    <>
      <div className="flex px-20">
        <div className="w-1/4 sticky top-20 self-start mt-20">
          <Category checkedItems={checkedItems} setCheckedItems={setCheckedItems} />
        </div>

        <div className="w-3/4 flex flex-wrap justify-start gap-8 ml-5 mt-5">
          {filteredFoodData.map((food: Food) => (
            <Card key={`food${food.id}`} foodData={food} />
          ))}
        </div>
      </div>

      <button
        className="fixed bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-8 px-16 text-4xl bg-[#FF4D4D] hover:bg-red-700 transition-colors text-white rounded-full"
        onClick={fetchData}
      >
        <Link href="/game">랜덤 룰렛돌리기!</Link>
      </button>
    </>
  );
}
