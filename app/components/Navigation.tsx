"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationLink {
  label: string;
  href: string;
}
const links: NavigationLink[] = [
  {
    label: "Overview",
    href: "/",
  },
  {
    label: "Detail",
    href: "/detail",
  },
];

function Navigation() {
  const pathname = usePathname();
  return (
    <div className="bg-slate-400">
      <div className="flex flex-col py-4">
        {links.map((link) => (
          <Link
            key={link.href}
            className={classNames(
              "w-full px-8 py-1 font-medium text-lg",
              pathname === link.href ? "bg-white text-slate-900" : "text-white"
            )}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Navigation;
