import React, { useMemo, useState, useCallback } from "react";
import { AiOutlineStar } from "@react-icons/all-files/ai/AiOutlineStar";
import QuantityControl from "./QuantityControl";

export interface Product {
  id: number;
  title: string;
  price: number;
  discountPercentage?: number;
  thumbnail?: string;
  rating?: number;
  stock?: number;
  isBestseller?: boolean;
}

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const [qty, setQty] = useState<number>(1);
  const [inCart, setInCart] = useState<boolean>(false);

  const discountedPrice = useMemo(() => {
    const d = product.discountPercentage ?? 0;
    return Math.round(product.price * (1 - d / 100));
  }, [product.price, product.discountPercentage]);

  const total = useMemo(
    () => Math.round(discountedPrice * qty),
    [discountedPrice, qty],
  );

  const inc = useCallback(
    () => setQty((q) => Math.min(product.stock ?? 9999, q + 1)),
    [product.stock],
  );
  const dec = useCallback(() => setQty((q) => Math.max(1, q - 1)), []);
  const toggleCart = useCallback(() => setInCart((v) => !v), []);

  const isDiscounted = (product.discountPercentage ?? 0) > 0;
  const isBestseller = product.isBestseller ?? (product.rating ?? 0) >= 4.5;

  return (
    <article className="bg-white text-slate-900 rounded-2xl shadow-md overflow-hidden flex flex-col">
      <div className="relative">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-40 xs:h-44 sm:h-48 md:h-52 lg:h-56 object-contain md:scale-75"
        />

        <div className="absolute right-3 top-3 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full flex items-center gap-2 text-xs font-medium shadow-sm">
          <AiOutlineStar className="w-4 h-4 text-emerald-500" />
          <span className="font-semibold">
            {(product.rating ?? 0).toFixed(1)}
          </span>
        </div>

        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {isDiscounted && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-600 text-white">
              {Math.round(product.discountPercentage ?? 0)}% تخفیف
            </span>
          )}
          {isBestseller && (
            <span className="px-3 py-1 rounded-full text-center text-xs font-semibold bg-yellow-100 text-slate-900">
              پرفروش
            </span>
          )}
        </div>
      </div>

      <div className="p-3 sm:p-4 flex-1 flex flex-col">
        <h3 className="text-base sm:text-lg font-bold mb-2 line-clamp-2">
          {product.title}
        </h3>

        <div className="mt-auto">
          <div className="flex flex-col gap-4">
            {/* قیمت و مجموع */}
            <div className="flex items-end justify-between gap-3">
              <div>
                {isDiscounted ? (
                  <div className="flex flex-col gap-1">
                    <div className="text-xs text-slate-400 line-through">
                      {product.price}
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg sm:text-xl lg:text-2xl font-extrabold text-slate-900">
                        {discountedPrice}
                      </span>
                      <span className="text-xs font-bold sm:text-sm text-slate-600">
                        دلار
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg sm:text-xl lg:text-2xl font-extrabold text-slate-900">
                      {product.price}
                    </span>
                    <span className="text-xs font-bold sm:text-sm text-slate-600">
                      دلار
                    </span>
                  </div>
                )}
              </div>

              {/* مجموع در حالت سبد - کنار قیمت */}
              {inCart && (
                <div className="flex items-baseline gap-1 px-2.5 py-1 bg-amber-50 rounded-md border border-amber-100">
                  <span className="text-xs font-medium text-slate-600">
                    مجموع:
                  </span>
                  <span className="text-sm font-bold text-amber-600">
                    {total}
                  </span>
                  <span className="text-xs font-bold text-slate-500">دلار</span>
                </div>
              )}
            </div>

            {/* دکمه‌ها و quantity control */}
            <div className="flex items-center gap-2">
              {inCart ? (
                <>
                  <QuantityControl
                    value={qty}
                    onIncrease={inc}
                    onDecrease={dec}
                    min={1}
                    max={product.stock ?? 9999}
                  />
                  <button
                    onClick={() => {
                      setInCart(false);
                      setQty(1);
                    }}
                    className="flex-1 cursor-pointer px-3 py-2.5 rounded-lg bg-red-500 text-white text-sm font-semibold hover:bg-red-600 active:bg-red-700 transition"
                  >
                    حذف
                  </button>
                </>
              ) : (
                <button
                  onClick={toggleCart}
                  className="w-full py-3 cursor-pointer rounded-lg bg-gradient-to-r from-pink-500 to-pink-400 text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-xl active:shadow-md transition"
                >
                  افزودن به سبد
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
