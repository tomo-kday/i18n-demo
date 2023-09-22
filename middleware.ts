import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { i18n } from './i18n-config'

import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { getSubdomainFromUrl } from './utils/get-subdomain-url'

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(    
    locales
  )

  console.log("🚀 ~ file: middleware.ts:19 ~ getLocale ~ negotiatorHeaders:", negotiatorHeaders)

  // console.log("🚀 ~ file: middleware.ts:19 ~ getLocale ~ languages:", languages)

  const lang_locale = getSubdomainFromUrl(negotiatorHeaders.host)
  const locale = matchLocale(languages, locales, i18n.defaultLocale)

  return lang_locale
}

export function middleware(request: NextRequest) {
  // path name is irrelevant
  // const pathname = request.nextUrl.pathname
  // console.log("🚀 ~ file: middleware.ts:33 ~ middleware ~ pathname:", pathname)
  const host = request.nextUrl.host
  console.log("🚀 ~ file: middleware.ts:33 ~ middleware ~ request.nextUrl:", request.nextUrl)
  console.log();
  console.log("🚀 ~ file: middleware.ts:33 ~ middleware ~ request.url:", request.url)

  // // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
  // // If you have one
  // if (
  //   [
  //     '/manifest.json',
  //     '/favicon.ico',
  //     // Your other files in `public`
  //   ].includes(pathname)
  // )
  //   return

  // Check if there is any supported locale in the pathname
  // const pathnameIsMissingLocale = i18n.locales.every(
  //   (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  // )
  
  // console.log("🚀 ~ file: middleware.ts:56 ~ middleware ~ pathname.startsWith:", pathname.startsWith('/'))
  // console.log("🚀 ~ file: middleware.ts:50 ~ middleware ~ pathnameIsMissingLocale:", pathnameIsMissingLocale)

  // // Redirect if there is no locale
  // if (pathnameIsMissingLocale) {
  //   const locale = getLocale(request)
  //   console.log("🚀 ~ file: middleware.ts:55 ~ middleware ~ locale:", locale)
  //   console.log("🚀 ~ file: middleware.ts:69 ~ middleware ~ request.url:", request.url)    
  //   console.log(`${locale}.${host}`);
  //   // console.log(NextResponse.redirect(
  //   //   new URL(
  //   //     `${locale}.${hostname}`
  //   //   )
  //   // ));
  //   // e.g. incoming request is /products
  //   // The new URL is now /en-US/products
  //   // return NextResponse.redirect(
  //   //   new URL(
  //   //     `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
  //   //     request.url
  //   //   )
  //   // )
    
  //   return NextResponse.rewrite(
  //     new URL(
  //       `/${locale}.${host}`,
  //         request.url
  //     )
  //   )
  // }
  const locale = getLocale(request)
  console.log("🚀 ~ file: middleware.ts:55 ~ middleware ~ locale:", locale)
  return NextResponse.rewrite(
    new URL(
      `/${locale}.${host}`,
        request.url
    )
  )        
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  // Optional: only run on root (/) URL
  // '/'
}
