"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdArrowForwardIos } from "react-icons/md";

const BreadCrumb = ({
  brand,
  brandname,
}: {
  brand: string;
  brandname: string;
}) => {
  const path = usePathname();
  return (
    <>
      <div className="flex items-center gap-1 pt-5 mx-4">
        <Link
          href="/brand"
          className={`flex items-center gap-1 hover:text-blue-400 ${
            path === "/brand" ? "text-blue-500 font-semibold" : ""
          }`}
        >
          brand <MdArrowForwardIos />
        </Link>
        <Link
          href={`/brand/${brand}`}
          className={` hover:text-blue-400 ${
            path === `/brand/${brand}` ? "text-blue-500 font-semibold" : ""
          }`}
        >
          {brandname}
        </Link>
      </div>
    </>
  );
};

export default BreadCrumb;
