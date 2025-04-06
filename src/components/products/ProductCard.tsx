import { DataType } from "@/types/datatype";
import { toIndonesiaCurrency } from "@/utils/toIndonesiaCurrency";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({
  value,
  index,
  className,
}: {
  value: DataType;
  index?: number;
  className?: string;
}) => {
  return (
    <>
      <Link
        href={`/products/${value.id}`}
        className="m-3 p-3 flex-col flexc gap-1 rounded-xl shadow outline-1 outline-gray-100 bg-primary-50"
      >
        <li className="flexc w-full mb-5">
          <div className="flexc w-full overflow-hidden rounded-xl">
            <Image
              width={592}
              height={592}
              className="w-full"
              src={value.image}
              alt={`sepatu-${value.name}`}
            />
          </div>
        </li>
        <li className="flexc !justify-start w-full px-2">
          <span className="flexc !justify-start min-w-[5rem] font-bold text-2xl">
            {value.name}
          </span>
        </li>
        <li className="flexc !justify-start w-full px-2">
          <span className="flexc !justify-start min-w-[5rem] text-gray-600 text-lg font-semibold">
            {toIndonesiaCurrency(value.price)}
          </span>
        </li>
        <li className=" flexc !justify-start w-full px-2 mb-3">
          <span className="flexc !justify-start min-w-[5rem] text-gray-400 text-sm">
            {value.category}
          </span>
        </li>
      </Link>
    </>
  );
};

export default ProductCard;
