'use client'
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
    setCheckedItems(checked ? categoryData.map((category) => category.categoryId) : []);
  };

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setCheckedItems((prev) => [...prev, value]);
    } else {
      setCheckedItems((prev) => prev.filter((item) => item !== value));
    }
  };

  useEffect(() => {
    fetch(`/data/category.json`)
      .then((res) => res.json())
      .then((data) => {
        setCategoryData(data.data);
      });
  }, []);

  useEffect(() => {
    setIsAllChecked(checkedItems.length === categoryData.length);
  }, [checkedItems, categoryData]);

  return (
    <>
      <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:text-white">
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
          <div className="flex items-center ps-3">
            <input
              id="all-checkbox"
              type="checkbox"
              checked={isAllChecked}
              onChange={handleAllCheck}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label htmlFor="all-checkbox" className="w-full py-3 ms-2 text-sm font-medium text-gray-900">
              전체
            </label>
          </div>
        </li>
        {categoryData.map((category) => (
          <li key={category.id} className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
            <div className="flex items-center ps-3">
              <input
                id={`category${category.id}`}
                type="checkbox"
                value={category.categoryId}
                checked={checkedItems.includes(category.categoryId)}
                onChange={handleCheck}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label htmlFor={`category${category.id}`} className="w-full py-3 ms-2 text-sm font-medium text-gray-900">
                {category.name}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}