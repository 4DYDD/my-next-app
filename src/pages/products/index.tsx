import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import { Data } from "../api/products";

interface DataType {
  id: string;
  name: string;
  price: number;
  size: string;
}

function Products() {
  const [isLogin, setIsLogin] = useState<Boolean>(true);
  const [products, setProducts] = useState<Array<DataType> | null>();
  const { push } = useRouter();

  useEffect(() => {
    if (!isLogin) {
      push("/auth/login");
    }
  }, [isLogin]);

  useEffect(() => {
    const fetchProducts = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate 1 second delay
      fetch("/api/products")
        .then((res) => res.json())
        .then((response: Data) => {
          console.log(response);
          setProducts(response.data);
        });
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Head>
        <title>Products Page</title>
      </Head>

      <h1 className="font-bold text-3xl mb-5">Products</h1>

      <div className="container grid grid-cols-3">
        {products
          ? products.map((value, index) => (
              <Fragment key={`product-${index}`}>
                <ul className="m-3 p-5 flex-col flexc gap-1 rounded-lg shadow shadow-gray-300 border border-gray-300">
                  <li className="font-bold flexc !justify-start w-full">
                    <span className="w-[3rem] flexc !justify-start">id</span>{" "}
                    <span className="w-[2rem] flexc">:</span>
                    <span className="flexc !justify-start min-w-[5rem]">
                      {value.id}
                    </span>
                  </li>
                  <li className=" flexc !justify-start w-full">
                    <span className="w-[3rem] flexc !justify-start">name</span>{" "}
                    <span className="w-[2rem] flexc">:</span>
                    <span className="flexc !justify-start min-w-[5rem]">
                      {value.name}
                    </span>
                  </li>
                  <li className=" flexc !justify-start w-full">
                    <span className="w-[3rem] flexc !justify-start">price</span>{" "}
                    <span className="w-[2rem] flexc">:</span>
                    <span className="flexc !justify-start min-w-[5rem]">
                      {value.price}
                    </span>
                  </li>
                  <li className=" flexc !justify-start w-full">
                    <span className="w-[3rem] flexc !justify-start">size</span>{" "}
                    <span className="w-[2rem] flexc">:</span>
                    <span className="flexc !justify-start min-w-[5rem]">
                      {value.size}
                    </span>
                  </li>
                </ul>
              </Fragment>
            ))
          : // SKELETONNYA
            [1, 2, 3, 4, 5].map((value, index) => (
              <Fragment key={`skeleton-${index}`}>
                <ul className="m-3 p-5 flex-col flexc gap-1 rounded-lg shadow shadow-gray-300 border border-gray-300">
                  <li className="font-bold flexc !justify-start w-full my-0.5">
                    <span className="w-[3rem] flexc !justify-start">id</span>{" "}
                    <span className="w-[2.5rem] flexc">:</span>
                    <span className="flexc !justify-start w-[90%] animate-pulse bg-gray-400 h-6" />
                  </li>
                  <li className="flexc !justify-start w-full my-0.5">
                    <span className="w-[3rem] flexc !justify-start">name</span>{" "}
                    <span className="w-[2.5rem] flexc">:</span>
                    <span className="flexc !justify-start w-[90%] animate-pulse bg-gray-400 h-6" />
                  </li>
                  <li className="flexc !justify-start w-full my-0.5">
                    <span className="w-[3rem] flexc !justify-start">price</span>{" "}
                    <span className="w-[2.5rem] flexc">:</span>
                    <span className="flexc !justify-start w-[90%] animate-pulse bg-gray-400 h-6" />
                  </li>
                  <li className="flexc !justify-start w-full my-0.5">
                    <span className="w-[3rem] flexc !justify-start">size</span>{" "}
                    <span className="w-[2.5rem] flexc">:</span>
                    <span className="flexc !justify-start w-[90%] animate-pulse bg-gray-400 h-6" />
                  </li>
                </ul>
              </Fragment>
            ))}
      </div>
    </>
  );
}

export default Products;
