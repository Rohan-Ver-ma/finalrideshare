"use client"
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../ui/mode-toggle";

export default function Header() {
  return (
    <>
<header className="text-gray-600 body-font overflow-hidden">
<div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
  <a href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 cursor-pointer">
    <span className="ml-3 text-xl  font-bold dark:text-gray-300">RideShare</span>
  </a>
  <nav className="md:ml-auto flex flex-wrap items-center mr-3 text-base justify-center cursor-pointer">
    <a  href="/login" className="mr-4 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-200">Login</a>
    <Button className=" dark:bg-white dark:text-black bg-gradient-to-r bg-black text-white font-medium shadow-lg">
    <a href="/register" className="">Register</a>
    </Button>
  </nav>
  <ModeToggle />
</div>
</header>
    </>

  )
}