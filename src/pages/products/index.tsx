import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import { Data } from "../api/[[...products]]";
import useSWR from "swr";
import { fetcher } from "@/lib/swr/fetcher";
import { DataType } from "@/types/datatype";
import ProductCard from "@/components/products/ProductCard";
import SkeletonCard from "@/components/products/SkeletonCard";

function ProductsPage() {
  const [isLogin, setIsLogin] = useState<Boolean>(true);
  const { push } = useRouter();
  const [products, setProducts] = useState<Array<DataType> | []>([]);

  useEffect(() => {
    const testLogin = async () => {
      if (!isLogin) {
        await push("/auth/login");
      }
    };

    testLogin();
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

  const { data, error, isLoading } = useSWR<Data | any>(
    "/api/products",
    fetcher
  );

  if (data) {
    setTimeout(() => {
      setProducts(data.data || []);
    }, 2000);
  }

  return (
    <>
      <Head>
        <title>Products Page</title>
      </Head>

      {/*  */}
      {/*  */}
      {/*  */}
      {/* ================================================================== */}
      {/* ====================== START TITLE PRODUCTS ====================== */}
      {/* ================================================================== */}

      <h1 className="font-bold text-3xl mb-5">Products</h1>

      {/* ================================================================== */}
      {/* ======================= END TITLE PRODUCTS ======================= */}
      {/* ================================================================== */}
      {/*  */}
      {/*  */}
      {/*  */}

      <div className="container grid md:grid-cols-2 w-[95%] xl:grid-cols-3 overflow-y-auto h-[65vh] scrollbar-custom">
        {!isLoading && (products ?? []).length > 0
          ? products?.map((value, index) => (
              <Fragment key={`product-${index}`}>
                {/*  */}
                {/*  */}
                {/*  */}
                {/* ================================================================== */}
                {/* ====================== START PRODUCT CARD ====================== */}
                {/* ================================================================== */}

                <ProductCard value={value} />

                {/* ================================================================== */}
                {/* ======================= END PRODUCT CARD ======================= */}
                {/* ================================================================== */}
                {/*  */}
                {/*  */}
                {/*  */}
              </Fragment>
            ))
          : // SKELETONNYA
            [1, 2, 3, 4, 5].map((value, index) => (
              <Fragment key={`skeleton-${index}`}>
                {/*  */}
                {/*  */}
                {/*  */}
                {/* ================================================================== */}
                {/* ====================== START SKELETON CARD ====================== */}
                {/* ================================================================== */}

                <SkeletonCard />

                {/* ================================================================== */}
                {/* ======================= END SKELETON CARD ======================= */}
                {/* ================================================================== */}
                {/*  */}
                {/*  */}
                {/*  */}
              </Fragment>
            ))}
      </div>
    </>
  );
}

export default ProductsPage;
