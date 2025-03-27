import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React from "react";

interface MyQuery extends ParsedUrlQuery {
  slug: Array<string>;
}

function ShopPage() {
  const router = useRouter();
  const query = router.query as MyQuery;

  return (
    <>
      <div>ShopPage</div>
      <p>
        Shop :{" "}
        {query.slug
          ? query.slug.map((value, index) =>
              index !== query.slug.length - 1 ? value + "-" : value
            )
          : ""}
      </p>
    </>
  );
}

export default ShopPage;
