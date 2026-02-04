import React from "react";

interface Props {
  value: number;
  min?: number;
  max?: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const QuantityControl: React.FC<Props> = ({
  value,
  min = 1,
  max = 9999,
  onIncrease,
  onDecrease,
}) => {
  const disabledDec = value <= min;
  const disabledInc = value >= max;

  return (
    <div className="inline-flex items-center gap-2 border border-gray-200 rounded-lg p-1">
      <button
        type="button"
        onClick={onDecrease}
        disabled={disabledDec}
        aria-label="کاهش تعداد"
        className={`w-8 h-8 rounded-md cursor-pointer flex items-center justify-center text-xl transition-colors ${
          disabledDec
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-100 active:bg-gray-200"
        }`}
      >
        −
      </button>

      <div className="min-w-[40px] text-center font-medium text-sm text-gray-900 select-none">
        {value}
      </div>

      <button
        type="button"
        onClick={onIncrease}
        disabled={disabledInc}
        aria-label="افزایش تعداد"
        className={`w-8 h-8 rounded-md flex cursor-pointer items-center justify-center text-xl transition-colors ${
          disabledInc
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-100 active:bg-gray-200"
        }`}
      >
        +
      </button>
    </div>
  );
};

export default QuantityControl;