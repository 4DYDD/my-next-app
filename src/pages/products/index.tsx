import User from "@/components/layouts/User";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

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
      <div>Products</div>
    </>
  );
}

export default Products;
