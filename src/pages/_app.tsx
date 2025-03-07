import "@/src/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { createQueryClient } from "@/src/utils/reactQuery";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <>
      <Head>
        <title>Movora - Discover Movies & TV Shows</title>
        <meta
          name="description"
          content="Discover and explore movies and TV shows with Movora"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <div
          className={`${geistSans.variable} ${geistMono.variable}`}
        >
          <Component {...pageProps} />
        </div>
      </QueryClientProvider>
    </>
  );
}
