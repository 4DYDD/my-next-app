import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import { Data } from "../api/[[...products]]";
import { toIndonesiaCurrency } from "@/utils/toIndonesiaCurrency";
import Image from "next/image";
import useSWR from "swr";
import { fetcher } from "@/lib/swr/fetcher";
import { DataType } from "@/types/datatype";
import Link from "next/link";

function Products() {
  const [isLogin, setIsLogin] = useState<Boolean>(true);
  const { push } = useRouter();

  useEffect(() => {
    if (!isLogin) {
      push("/auth/login");
    }
  }, [isLogin]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate 1 second delay
  //     fetch("/api/products")
  //       .then((res) => res.json())
  //       .then((response: Data) => {
  //         console.log(response);
  //         setProducts(response.data);
  //       });
  //   };

  //   fetchProducts();
  // }, []);

  const { data, error, isLoading } = useSWR<Data | null>(
    "/api/products",
    fetcher
  );
  const products: Array<DataType> | null = data?.data;

  return (
    <>
      <Head>
        <title>Products Page</title>
      </Head>

      <h1 className="font-bold text-3xl mb-5">Products</h1>

      <div className="container grid md:grid-cols-2 w-[95%] xl:grid-cols-3 overflow-y-auto h-[65vh] scrollbar-custom">
        {!isLoading && (products ?? []).length > 0
          ? products?.map((value, index) => (
              <Fragment key={`product-${index}`}>
                <Link
                  href={`/products/${value.id}`}
                  className="m-3 p-3 flex-col flexc gap-1 rounded-xl shadow shadow-gray-400 outline-1 outline-gray-300"
                >
                  <li className=" flexc !justify-start w-full mb-5">
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
                  <li className=" flexc !justify-start w-full px-2">
                    <span className="flexc !justify-start min-w-[5rem] font-bold text-2xl">
                      {value.name}
                    </span>
                  </li>
                  <li className=" flexc !justify-start w-full px-2">
                    <span className="flexc !justify-start min-w-[5rem] text-lg font-semibold">
                      {toIndonesiaCurrency(value.price)}
                    </span>
                  </li>
                  <li className=" flexc !justify-start w-full px-2 mb-3">
                    <span className="flexc !justify-start min-w-[5rem] text-gray-600">
                      {value.category}
                    </span>
                  </li>
                </Link>
              </Fragment>
            ))
          : // SKELETONNYA
            [1, 2, 3, 4, 5].map((value, index) => (
              <Fragment key={`skeleton-${index}`}>
                <ul className="m-3 p-5 flex-col flexc gap-1 rounded-lg shadow shadow-gray-300 border border-gray-300">
                  <li className=" flexc !justify-start w-full mb-5">
                    <div className="flexc w-full overflow-hidden rounded-xl">
                      <div className="bg-gray-400 animate-pulse size-72 xl:size-80" />
                    </div>
                  </li>
                  <li className="flexc !justify-start w-full my-0.5">
                    <span className="flexc !justify-start w-full animate-pulse bg-gray-400 h-6" />
                  </li>
                  <li className="flexc !justify-start w-full my-0.5">
                    <span className="flexc !justify-start w-full animate-pulse bg-gray-400 h-6" />
                  </li>
                  <li className="flexc !justify-start w-full my-0.5">
                    <span className="flexc !justify-start w-full animate-pulse bg-gray-400 h-6" />
                  </li>
                </ul>
              </Fragment>
            ))}
      </div>
    </>
  );
}

export default Products;
