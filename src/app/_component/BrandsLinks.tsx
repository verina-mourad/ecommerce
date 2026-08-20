"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdArrowForwardIos } from "react-icons/md";
import { BrandsProduct } from "@src/types/brand";

const BrandsLinks = () => {
  const path = usePathname();
  const specificBrands = path.split("/").filter(Boolean);

  return (
    <div className="flex items-center gap-2 text-xs px-4 my-4">
      <Link
        href="/"
        className={`flex items-center gap-1 hover:text-blue-400 ${
          path === "/" ? "text-blue-500 font-semibold" : ""
        }`}
      >
        home <MdArrowForwardIos />
      </Link>

      {specificBrands.map((segment, index) => {
        const href = "/" + specificBrands.slice(0, index + 1).join("/");

        return (
          <Link
            href="/"
            className={`flex items-center gap-1 hover:text-blue-400 ${
              path === "/brand" ? "text-blue-500 font-semibold" : ""
            }`}
          >
            {segment}

            {/* ⛔ fix here */}
            {index !== specificBrands.length - 1 && <MdArrowForwardIos />}
          </Link>
        );
      })}
    </div>
  );
};

export default BrandsLinks;
