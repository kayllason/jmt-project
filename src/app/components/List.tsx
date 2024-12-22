'use client';

import { useEffect, useState } from 'react';
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
      const response = await fetch(`/data/foodList.json`);
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
    <div className="px-20">
      <Category checkedItems={checkedItems} setCheckedItems={setCheckedItems} />
      <div className="flex flex-wrap justify-start gap-4">
        {filteredFoodData.map((food: Food) => (
          <Card key={`food${food.id}`} foodData={food} />
        ))}
      </div>
    </div>
  );
}
