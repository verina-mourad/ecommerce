"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdArrowForwardIos } from "react-icons/md";

const Breadcrumb = () => {
  const path = usePathname();
  return (
    <div className="flex items-center gap-2 mb-4">
      <Link
        href="/"
        className={`flex items-center gap-1 hover:text-blue-400 ${
          path === "/" ? "text-blue-500 font-semibold" : ""
        }`}
      >
        Home <MdArrowForwardIos />
      </Link>
      <Link
        href="/MyAccount"
        className={`flex items-center gap-1 hover:text-blue-400 ${
          path === "/MyAccount" ? "text-blue-500 font-semibold" : ""
        }`}
      >
        My Account
      </Link>
    </div>
  );
};

export default Breadcrumb;
