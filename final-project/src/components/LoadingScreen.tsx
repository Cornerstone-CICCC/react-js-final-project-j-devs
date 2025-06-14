import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [text, setText] = useState("");
  const fullText = "Ready...";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 900);
      }
    }, 90);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-black text-gray-100 flex flex-col items-center justify-center">
      <div className="mb-4 text-4xl font-mono font-bold">
        {text}
        <span className="animate-blink ml-1">|</span>
      </div>

      <div className="w-[200px] h-[2px] bg-gray-800 rounded relative  mt-2">
        <div className="absolute top-[-1.25rem] left-0 animate-loading-bar">
          <img src="brand.png" alt="cloud" className="h-[3rem] w-[3rem]" />
        </div>
      </div>
    </div>
  );
};
