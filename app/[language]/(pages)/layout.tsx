'use client'

import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";
import { ReactNode } from "react";
import { DefaultSearchParams } from "@/ts/DefaultSearchParamsType";
import { CurrentDateContextProvider } from "@/lib/contexts/CurrentDateContext";
import { LanguageContextProvider } from "@/lib/contexts/CurrentLanguageContext";

type RootLayoutProps = {
  children: ReactNode;
  searchParams: DefaultSearchParams;
  params: {
    language: string
  }
}

export default function PageLayout({ children, searchParams = {}, params }: RootLayoutProps) {

  const date = new Date();

  const { language } = params;

  const { day: currentDay = `${date.getDate()}`, month: currentMonthIndex = `${date.getMonth() + 1}` } = searchParams;

  const currentDate = { currentDay: parseInt(currentDay), currentMonthIndex: parseInt(currentMonthIndex) }

  return (
    <CurrentDateContextProvider value={currentDate}>
      <LanguageContextProvider value={{ language }}>
        <Provider store={store}>
          {children}
        </Provider>
      </LanguageContextProvider>
    </CurrentDateContextProvider>
  )
}
