import React from "react";

const SkeletonCard = () => {
  return (
    <>
      <ul className="m-3 p-3 flex-col flexc gap-1 rounded-xl shadow outline-1 outline-gray-100 bg-primary-50">
        <li className=" flexc w-full mb-5">
          <div className="flexc w-full overflow-hidden rounded-xl">
            <div className="bg-primary-variant-50 animate-pulse size-72 xl:size-80 flexc w-full overflow-hidden rounded-xl" />
          </div>
        </li>
        {[1, 2, 3].map((value, index) => (
          <li key={index} className="flexc !justify-start w-full my-0.5 px-2">
            <span className="flexc w-[80%] animate-pulse bg-primary-variant-50 h-6" />
          </li>
        ))}
        <li className="flexc w-full mb-2"></li>
      </ul>
    </>
  );
};

export default SkeletonCard;
