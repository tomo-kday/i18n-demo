"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n } from "../../../i18n-config";

export default function LocaleSwitcher() {
  // const pathName = usePathname();
  // const host = window.location.host;
  if (typeof window !== "undefined") {
    const host = window.location.host;
    console.log(
      "🚀 ~ file: locale-switcher.tsx:11 ~ LocaleSwitcher ~ host:",
      host
    );
  }
  const redirectedPathName = (locale: string) => {
    // console.log(
    //   "🚀 ~ file: locale-switcher.tsx:19 ~ redirectedPathName ~ locale:",
    //   locale
    // );

    if (locale === "jp") return "http://localhost:3000";
    return `http://${locale}.localhost:3000`;
    // if (!pathName && locale === 'jp') return 'localhost:3000/';
    // const segments = pathName.split("/");
    // console.log(
    //   "🚀 ~ file: locale-switcher.tsx:16 ~ redirectedPathName ~ segments:",
    //   segments
    // );
    // segments[1] = locale;
    // return segments.join("/");
  };

  return (
    <div>
      <p>Locale switcher:</p>
      <ul>
        {i18n.locales.map((locale) => {
          return (
            <li key={locale}>
              <Link href={redirectedPathName(locale)}>{locale}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
