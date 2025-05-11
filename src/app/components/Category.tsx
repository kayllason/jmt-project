'use client';
import React, { useState, useEffect } from 'react';

interface CategoryData {
  id: number;
  categoryId: string;
  name: string;
}

interface CategoryProps {
  checkedItems: string[];
  setCheckedItems: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function Category({ checkedItems, setCheckedItems }: CategoryProps) {
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);

  const handleAllCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsAllChecked(checked);
    setCheckedItems(checked ? categoryData.map(category => category.categoryId) : []);
  };

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setCheckedItems(prev => [...prev, value]);
    } else {
      setCheckedItems(prev => prev.filter(item => item !== value));
    }
  };

  useEffect(() => {
    fetch(`/data/category.json`)
      .then(res => res.json())
      .then(data => {
        setCategoryData(data.data);
      });
  }, []);

  useEffect(() => {
    setIsAllChecked(checkedItems.length === categoryData.length);
  }, [checkedItems, categoryData]);

  return (
    <>
      <ul className="items-center w-full text-sm font-medium text-gray-900 bg-[#ffffff] rounded-lg dark:text-white">
        {categoryData.length > 0 && (
          <li className="w-full sm:border-b-0 sm:border-r min-w-[140px]">
            <div className="flex items-center ps-3">
              <input
                id="all-checkbox"
                type="checkbox"
                checked={isAllChecked}
                onChange={handleAllCheck}
                className="w-6 h-6 border-1 border-gray-100 rounded accent-red-500"
              />
              <label htmlFor="all-checkbox" className="w-full py-3 ms-2 text-sm text-center font-medium text-gray-900">
                전체
              </label>
            </div>
          </li>
        )}

        {categoryData.map(category => (
          <li key={category.id} className="w-full sm:border-b-0 sm:border-r min-w-[140px]">
            <div className="flex items-center ps-3">
              <input
                id={`category${category.id}`}
                type="checkbox"
                value={category.categoryId}
                checked={checkedItems.includes(category.categoryId)}
                onChange={handleCheck}
                className="w-6 h-6 border-1 border-gray-100 rounded accent-red-500"
              />
              <label
                htmlFor={`category${category.id}`}
                className="w-full py-3 ms-2 text-sm  text-center font-medium text-gray-900"
              >
                {category.name}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
