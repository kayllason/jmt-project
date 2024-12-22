import Image from 'next/image';
import { FoodData } from '@/app/components/Card';

interface ModalProps {
  result: FoodData;
  onClose: () => void;
}

export const RouletteResultModal: React.FC<ModalProps> = ({ result, onClose }) => {
  const { name, imageURL } = result;

  if (typeof window !== 'undefined') {
    document.body.style.overflow = 'hidden';
  }

  const handleClose = () => {
    document.body.style.overflow = '';
    onClose();
  };

  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  const handleRedirect = () => {
    const searchUrl = `https://map.naver.com/p/search/${name}맛집`;
    const newWindow = window.open(searchUrl, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleBackgroundClick}
    >
      <div className="flex flex-col items-center justify-between w-96 min-w-80 h-4/5 min-h-[620px] h-m bg-white rounded-2xl shadow-lg p-10 text-center">
        <h2 className="text-2xl font-bold m-3">오늘의 메뉴</h2>
        <div className="flex flex-col items-center justify-center">
          <p className="text-lg m-2">{name}</p>
          <div className="w-72 h-72 m-2 bg-gray-300 rounded-lg overflow-hidden relative">
            <Image
              src={imageURL}
              alt="FoodImage"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={true}
              fill
              className="object-cover"
            />
          </div>
          <button
            onClick={handleRedirect}
            className="px-9 py-4 m-3 bg-[#FF4D4D] text-white rounded-lg hover:bg-red-700"
          >
            내 주변 {name} 맛집 바로가기
          </button>
        </div>
        <button
          onClick={handleClose}
          className="px-4 py-2 m-2 bg-white text-[#FF4D4D] text-sm border border-[#FF4D4D] rounded-lg hover:bg-[#FF4D4D] hover:text-white  transition-colors"
        >
          닫기
        </button>
      </div>
    </div>
  );
};
