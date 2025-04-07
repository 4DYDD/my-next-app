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
    | {
        id?: string;
        name: string;
        price: number;
        size: string;
      }
    | any;
};

export type DataError = {
  status: boolean;
  statusCode: number;
  data: Array<string> | any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | DataError>
) {
  //
  //
  //
  //
  //
  // ========================================================================================
  // Periksa apakah permintaan memiliki parameter kueri untuk mengambil produk berdasarkan ID
  // ========================================================================================
  if (req.query.products?.[1]) {
    const data = await retrieveDataById("products", req.query.products[1]);

    if (data) {
      res.status(200).json({ status: true, statusCode: 200, data });
    } else {
      res.status(404).json({
        status: false,
        statusCode: 404,
        data: ["Halaman Tidak Ditemukan!"],
      });
    }
  }
  //
  //
  //
  //
  //
  // =======================================================================================================
  // Ambil semua produk jika permintaan tidak memiliki parameter kueri untuk mengambil produk berdasarkan ID
  // =======================================================================================================
  else {
    const data = await retrieveData("products");

    if (data) {
      res.status(200).json({ status: true, statusCode: 200, data });
    } else {
      res.status(400).json({
        status: false,
        statusCode: 400,
        data: ["Tidak ada data yang ditemukan!"],
      });
    }

    // res.status(200).json({ status: true, statusCode: 200, data });
  }
}
