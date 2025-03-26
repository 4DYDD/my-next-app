import React from "react";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface MyQuery {
  id: string;
}

function DetailProduct() {
  const router = useRouter();
  const query = router.query as MyQuery | ParsedUrlQuery;

  return (
    <>
      <div
        className={`${styles.flexc} ${styles.wFull} ${styles.hScreen} ${inter.className}`}
      >
        DetailProduct : {query.id}
      </div>
    </>
  );
}

export default DetailProduct;
