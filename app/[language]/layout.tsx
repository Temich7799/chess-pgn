import { LanguageSelector } from "@/components/atoms/LanguageSelector/LanguageSelector"
import '../../src/index.scss';
import { ReactNode } from "react";
import { dir } from 'i18next'
import { languages } from '../i18n/settings'

type RootLayoutProps = {
  children: ReactNode;
  params: {
    language: string
  }
}

export async function generateStaticParams() {
  return languages.map((language) => ({ language }))
}

export default function RootLayout({ children, params }: RootLayoutProps) {

  const { language } = params;

  return (
    <html lang={language} dir={dir(language)}>
      <body>
        {/* <LanguageSelector /> */}
        {children}
      </body>
    </html>
  )
}
