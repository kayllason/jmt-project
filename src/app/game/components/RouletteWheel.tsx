'use client';
import { useState } from 'react';
import { RouletteResultModal } from './RouletteResultModal';
import { FoodData } from '@/app/components/Card';

interface RouletteWheelProps {
  spinDuration?: number;
  size?: 'sm' | 'md' | 'lg';
}

const RouletteWheel: React.FC<RouletteWheelProps> = ({ spinDuration = 2000, size = 'lg' }) => {
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [result, setResult] = useState<FoodData | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const sizeClasses = {
    sm: 'w-48 h-48',
    md: 'w-64 h-64',
    lg: 'w-96 h-96',
  };

  const spinWheel = async (): Promise<void> => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult(undefined);

    const spinDegrees = 1080 + Math.random() * 720;
    setRotation(prev => prev + spinDegrees);

    try {
      const apiResult = await fetchRandomResult();
      setTimeout(() => {
        setResult(apiResult);
        setIsModalOpen(true);
      }, spinDuration);
    } catch (error) {
      console.error('Spin failed:', error);
    } finally {
      setIsSpinning(false);
    }
  };

  const fetchRandomResult = async (): Promise<FoodData | undefined> => {
    try {
      const response = await fetch('/data/foodList.json');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.data.length);
      return data.data[randomIndex];
    } catch (error) {
      console.error('Error fetching data:', error);
      return undefined;
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Pointer */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 translate-y-1 w-0 h-0 border-x-8 border-x-transparent border-t-[16px] border-t-red-700 z-10"
          role="presentation"
        />
        {/* Wheel */}
        <div
          className="relative w-full h-full rounded-full overflow-hidden border-4 border-gray-800 bg-white"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? `transform ${spinDuration}ms cubic-bezier(0.3, 0.7, 0.4, 1)` : 'none',
          }}
          role="img"
          aria-label="Decorative roulette wheel"
          aria-hidden={isSpinning}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-2xl font-bold text-gray-500">오늘의 메뉴는...</div>
          </div>
        </div>
      </div>
      <button
        onClick={spinWheel}
        disabled={isSpinning}
        className="px-6 py-2 bg-[#FF4D4D] text-white rounded-lg disabled:bg-[#FDB87D] hover:bg-red-700 transition-colors"
        aria-busy={isSpinning}
      >
        {isSpinning ? '돌리는 중...' : '랜덤 돌리기'}
      </button>
      {isModalOpen && result && <RouletteResultModal result={result} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default RouletteWheel;
