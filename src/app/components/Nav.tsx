'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getCurrentWeather, Response } from '@/utils/getCurrentWeather';

export default function Nav() {
  const [weatherData, setWeatherData] = useState<Response | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await getCurrentWeather();
        setWeatherData(res);
      } catch (err) {
        console.error('날씨 정보를 불러오는데 실패했습니다:', err);
      }
    };

    fetchWeather();
  }, []);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    weekday: 'short',
  };
  const today = new Date().toLocaleDateString('ko-KR', options);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#ffffff] flex justify-between items-center px-4 border-b border-b-[#e5e7eb]">
      <div className="relative w-32 h-10">
        <Image src="/images/logo/jmt_logo.png" alt="LogoImage" fill priority className="object-contain" />
      </div>

      <div className="flex items-center space-x-2 text-sm">
        <span className="text-black font-bold text-center ml-4">{today}</span>
        {weatherData && (
          <div className="flex items-center space-x-2 text-sm text-black">
            <Image
              src={`https:${weatherData.current.condition.icon}`}
              alt={weatherData.current.condition.text}
              width={24}
              height={24}
            />
            <span>{weatherData.current.temp_c}°C</span>
          </div>
        )}
      </div>
    </div>
  );
}
