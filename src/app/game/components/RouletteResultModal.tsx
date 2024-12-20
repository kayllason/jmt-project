interface ModalProps {
  result: string;
  onClose: () => void;
}

export const RouletteResultModal: React.FC<ModalProps> = ({ result, onClose }) => {
  if (typeof window !== 'undefined') {
    document.body.style.overflow = 'hidden';
  }

  const handleClose = () => {
    document.body.style.overflow = '';
    onClose();
  };

  const handleRedirect = () => {
    const searchUrl = `https://map.naver.com/p/search/${result}맛집`;
    window.open(searchUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col items-center justify-between w-96 min-w-80 h-5/6 bg-white rounded-2xl shadow-lg p-10 text-center">
        <h2 className="text-2xl font-bold m-4">오늘의 메뉴</h2>
        <div className="flex flex-col items-center justify-center">
          <p className="text-lg m-2">{result}</p>
          <div className="w-72 h-72 m-2 bg-gray-300 rounded-lg" />
          <button
            onClick={handleRedirect}
            className="px-9 py-4 m-4 bg-[#FF4D4D] text-white rounded-lg hover:bg-red-700"
          >
            내 주변 {result} 맛집 바로가기
          </button>
        </div>
        <button
          onClick={handleClose}
          className="px-4 py-2 m-2 bg-white text-[#FDB87D] text-sm border border-[#FDB87D] rounded-lg hover:bg-[#FDB87D] hover:text-white transition-colors"
        >
          닫기
        </button>
      </div>
    </div>
  );
};
