import { notFound } from "next/navigation";
import { display, sans } from "../fonts";
import { locales, isLocale, localeHtmlLang, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/content";
import { personJsonLd } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { JsonLd } from "@/components/ui/JsonLd";
import { InstagramFloatingLink } from "@/components/layout/InstagramLink";

/** Pre-render one document per locale. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale as Locale);

  return (
    <html
      lang={localeHtmlLang[locale]}
      className={`${sans.variable} ${display.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-teal-deep focus:px-5 focus:py-2 focus:text-sm focus:text-canvas"
        >
          {dict.skipToContent}
        </a>

        <Header locale={locale} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer locale={locale} />
        <InstagramFloatingLink />

        <CookieBanner
          message={dict.cookie.message}
          accept={dict.cookie.accept}
          essential={dict.cookie.essential}
          moreLabel={dict.cookie.more}
          moreHref={`/${locale}/legal/cookie`}
        />

        {/* Site-wide Person structured data */}
        <JsonLd data={personJsonLd()} />
      </body>
    </html>
  );
}
