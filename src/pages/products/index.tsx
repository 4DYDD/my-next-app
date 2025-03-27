import User from "@/components/layouts/User";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Products() {
  const [isLogin, setIsLogin] = useState<Boolean>(false);
  const { push } = useRouter();

  useEffect(() => {
    if (!isLogin) {
      push("/auth/login");
    }
  }, []);

  return (
    <>
      <User>
        <div>Products</div>
      </User>
    </>
  );
}

export default Products;
