// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { retrieveData, retrieveDataById } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";

export type Data = {
  status: boolean;
  statusCode: number;
  data:
    | Array<{
        id?: string;
        name: string;
        price: number;
        size: string;
      }>
    | any;
};

export type DataError = {
  status: boolean;
  statusCode: number;
  errors: Array<string> | any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | DataError>
) {
  if (req.query.products?.[1]) {
    const data = await retrieveDataById("products", req.query.products[1]);

    if (data) {
      res.status(200).json({ status: true, statusCode: 200, data });
    } else {
      res
        .status(400)
        .json({ status: false, statusCode: 400, errors: ["nggk ada datanya"] });
    }
  } else {
    const data = await retrieveData("products");

    if (data) {
      res.status(200).json({ status: true, statusCode: 200, data });
    } else {
      res
        .status(400)
        .json({ status: false, statusCode: 400, errors: ["nggk ada datanya"] });
    }

    // res.status(200).json({ status: true, statusCode: 200, data });
  }
}
