import React from "react";
import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import { DataType } from "@/types/datatype";
import Head from "next/head";
import Image from "next/image";
import { toIndonesiaCurrency } from "@/utils/toIndonesiaCurrency";
import Custom404 from "../404";
import { DataError } from "../api/[[...products]]";

const inter = Inter({ subsets: ["latin"] });

function DetailProduct({ product }: { product: DataType | DataError }) {
  return (
    <>
      <Head>
        <title>Detail Product Page</title>
      </Head>

      <div
        className={`${styles.flexc} ${styles.wFull} ${styles.hScreen} ${inter.className}`}
      >
        {/* SERVER-SIDE RENDERING */}
        {product &&
        "category" in product &&
        "image" in product &&
        "name" in product &&
        "price" in product ? (
          <ul className="m-3 p-3 flex-col flexc gap-1 rounded-xl shadow shadow-gray-400 outline-1 outline-gray-300">
            <li className=" flexc !justify-start w-full mb-5">
              <div className="flexc w-full overflow-hidden rounded-xl">
                <Image
                  width={592}
                  height={592}
                  className="w-full"
                  src={product.image}
                  alt={`sepatu-${product.name}`}
                />
              </div>
            </li>
            <li className=" flexc !justify-start w-full px-2">
              <span className="flexc !justify-start min-w-[5rem] font-bold text-2xl">
                {product.name}
              </span>
            </li>
            <li className=" flexc !justify-start w-full px-2">
              <span className="flexc !justify-start min-w-[5rem] text-lg font-semibold">
                {toIndonesiaCurrency(product.price)}
              </span>
            </li>
            <li className=" flexc !justify-start w-full px-2 mb-3">
              <span className="flexc !justify-start min-w-[5rem] text-gray-600">
                {product.category}
              </span>
            </li>
          </ul>
        ) : (
          <Custom404 />
        )}
      </div>
    </>
  );
}

export default DetailProduct;

export async function getServerSideProps({
  params,
}: {
  params: { id: string };
}) {
  // fetch data
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/${params.id}`
  );

  const response = await res.json();

  const product: DataType | null = response?.data;

  return {
    props: {
      product,
    },
  };
}
