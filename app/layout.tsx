/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mr Luna - Fortune Wheel",
  description: "Spin the Mr Luna wheel and get amazing bonuses!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/wheel-styles.css" />
        <link rel="icon" type="image/svg+xml" href="/assets/images/logo/favicon.svg" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/assets/images/logo/favicon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/logo/favicon.svg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
