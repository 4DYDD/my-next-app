import React, { ReactNode } from "react";
import Footer from "./Footer";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";

//
//
//
//
//
//
const Navbar = dynamic(() => import("./Navbar"), { ssr: false });
/**
 * Komponen Navbar ini harus dirender di sisi client, tidak di server, karena di
 * komponen ini menggunakan Image dari next/image yang tidak support SSR, dan
 * juga menggunakan Script dari next/script yang juga tidak support SSR.
 */
//
//
//
//
//
//

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });
// const quicksand = Quicksand({ subsets: ["latin"], weight: ["400", "700"] });

const disableNavbarFooter = ["/", "/auth/login", "/auth/register", "/404"];

//
//
//
//
//
//
/**
 * Komponen User digunakan untuk mengatur layout halaman user.
 *
 * Komponen ini menerima 2 properti, yaitu children yang berisi komponen React dan className yang opsional.
 *
 * pathname diambil dari useRouter(). Kita menggunakan useRouter() untuk
 * mendapatkan pathname dari url yang sekarang sedang dibuka.
 *
 * Jika pathname (tidak ada) di dalam array disableNavbarFooter, maka komponen Navbar
 * akan dirender di atas elemen children dan komponen Footer akan dirender di
 * bawah elemen children.
 *
 * Jika pathname (ada) di dalam array disableNavbarFooter, maka komponen Navbar dan
 * Footer tidak akan dirender.
 */
function User({ children }: { children: ReactNode; className?: string }) {
  const { pathname } = useRouter();

  return (
    <main className={`${inter.className} h-screen flexc flex-col`}>
      {!disableNavbarFooter.includes(pathname) && <Navbar />}
      <div className="h-full flexc flex-col w-full">{children}</div>
      {!disableNavbarFooter.includes(pathname) && <Footer />}
    </main>
  );
}
//
//
//
//
//
//

export default User;
