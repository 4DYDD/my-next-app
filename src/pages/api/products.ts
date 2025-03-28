// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { retrieveData } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";

export type Data = {
  status: boolean;
  statusCode: number;
  data:
    | Array<{
        id: string;
        name: string;
        price: number;
        size: string;
      }>
    | any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const data = [
  //   {
  //     id: 1,
  //     name: "Baju Baru",
  //     price: 500000,
  //     size: "xl",
  //   },
  //   {
  //     id: 2,
  //     name: "Baju Lama",
  //     price: 100000,
  //     size: "l",
  //   },
  // ];

  const data = await retrieveData("products");

  res.status(200).json({ status: true, statusCode: 200, data });
}
