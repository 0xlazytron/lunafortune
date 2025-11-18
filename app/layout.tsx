import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mr Luna Casino - Fortune Wheel",
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
        <link rel="stylesheet" href="/wheel-styles.css" />
        <link rel="icon" type="image/svg+xml" href="/assets/images/logo/logo.svg" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/assets/images/logo/logo.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/logo/logo.svg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
