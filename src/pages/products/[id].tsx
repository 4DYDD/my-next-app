import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import useSWR from "swr";
import { fetcher } from "@/lib/swr/fetcher";
import { DataType } from "@/types/datatype";
import { Data } from "@/pages/api/[[...products]]";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { toIndonesiaCurrency } from "@/utils/toIndonesiaCurrency";

const inter = Inter({ subsets: ["latin"] });

interface MyQuery {
  id: string;
}

interface DetailProductProps {
  product: DataType;
}

// {product}:DetailProductProps

function DetailProduct({ product }: DetailProductProps) {
  const router = useRouter();
  const query = router.query as MyQuery | ParsedUrlQuery;

  // CLIENT-SIDE HOOKS
  // const { data, error, isLoading } = useSWR<Data | null>(
  //   `/api/products/${query.id}`,
  //   fetcher
  // );
  // const product: DataType | null = data?.data;

  return (
    <>
      <Head>
        <title>Detail Product Page</title>
      </Head>

      <div
        className={`${styles.flexc} ${styles.wFull} ${styles.hScreen} ${inter.className}`}
      >
        {/* CLIENT-SIDE RENDERING */}
        {/* {!isLoading && product ? (
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
          // SKELETONNYA
          [1].map((value, index) => (
            <Fragment key={`skeleton-${index}`}>
              <ul className="m-3 p-3 flex-col flexc gap-1 rounded-lg shadow shadow-gray-300 border border-gray-300">
                <li className=" flexc !justify-start w-full mb-5">
                  <div className="flexc w-full overflow-hidden rounded-xl">
                    <div className="bg-gray-400 animate-pulse size-72 xl:size-[592px]" />
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
          ))
        )} */}

        {/* SERVER-SIDE RENDERING */}
        {product && (
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
  const res = await fetch(`http://localhost:3000/api/products/${params.id}`);
  const response = await res.json();

  const product: Array<DataType> | null = response?.data || [];

  return {
    props: {
      product,
    },
  };
}

// export async function getStaticPaths() {
//   const res = await fetch(`http://localhost:3000/api/products`);
//   const response: Data = await res.json();

//   const paths = response.data.map((product: DataType) => ({
//     params: {
//       id: product.id,
//     },
//   }));

//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params }: { params: { id: string } }) {
//   // fetch data
//   const res = await fetch(`http://localhost:3000/api/products/${params.id}`);
//   const response = await res.json();

//   const product: Array<DataType> | null = response?.data || [];

//   return {
//     props: {
//       product,
//     },
//   };
// }
