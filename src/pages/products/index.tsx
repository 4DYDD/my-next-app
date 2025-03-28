import User from "@/components/layouts/User";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Head from 'next/head';

function Products() {
  const [isLogin, setIsLogin] = useState<Boolean>(true);
  const { push } = useRouter();

  useEffect(() => {
    if (!isLogin) {
      push("/auth/login");
    }
  }, [isLogin]);

  return (
    <>
    <Head>
      <title>Products Page</title>
    </Head>
      <div>Products</div>
    </>
  );
}

export default Products;
