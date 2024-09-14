"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed w-full z-50">
      <div className="w-full flex  max-sm:flex-wrap max-sm:justify-center justify-between md:px-[8%] shadow-md bg-yellow-500">
        <div className="flex gap-5 ">
          <div className="flex items-center gap-2 py-1 hover:scale-105 transition-all">
            <img src="/phone.svg" className="w-[25px] h-[25px]" alt="phone" />
            <Link href="tel:+48792293364" className="text-xs text-white font-semibold">792293364</Link>
          </div>
          <div className="flex items-center gap-2 py-1 hover:scale-105 transition-all">
            <img src="/phone.svg" className="w-[25px] h-[25px]" alt="phone" />
            <Link href="tel:+48795139224" className="text-xs text-white font-semibold">795139224</Link>
          </div>
          <div className="flex items-center gap-2 py-1 hover:scale-105 transition-all">
            <img src="/Email.svg" className="w-[25px] h-[25px]" alt="phone" />
            <Link href="mailto:+48795139224" className="text-xs text-white font-semibold">biuro@stylmetal.pl</Link>
          </div>
        </div>
		<div className="flex ">
			<div className="flex items-center gap-4 py-1" >
				<Link className="hover:scale-110 transition-all" href="https://www.facebook.com/profile.php?id=100083640406301"><img src="/Facebook.svg" className="w-[25px] h-[25px]" alt="facebook" /></Link>
				<Link className="hover:scale-110 transition-all" href="#"><img src="/Google.svg" className="w-[25px] h-[25px]" alt="google" /></Link>
				
			</div>
		</div>
      </div>
      <nav className="bg-slate-950 shadow-md z-50 p-5 md:mx-[8%] m-auto flex items-center max-md:flex-wrap text-white justify-between ">
        <img src="/logo.png" className="w-[200px] h-[70px]" alt="logo" />
        <FiMenu
          className="lg:hidden block h-6 w-6"
          onClick={() => setOpen(!open)}
        />
        <ul
          className={`${
            open ? "block" : "hidden"
          } lg:flex w-full max-md:gap-5 justify-evenly text-md font-semibold uppercase`}
        >
          <li className="hover:text-red-500 ">
            <Link href="/">Strona główna</Link>
          </li>
          <li className="hover:text-red-500 ">
            <Link href="https://www.skonfiguruj-garaz.pl/konfigurator/stylmetal" target="_blank">Konfigurator</Link>
          </li>
          <li className="hover:text-red-500 ">
            <Link href="/realizacje">Realizacje</Link>
          </li>
          <li className="hover:text-red-500 ">
            <Link href="/#info">Informacje</Link>
          </li>
          <li className="hover:text-red-500 ">
            <Link href="/kontakt">Kontakt</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
