import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PCOS Plan - Personalized Weight Loss for Women with PCOS",
  description:
    "Take control of PCOS with a personalized diet and lifestyle plan. Balance hormones, boost metabolism, and achieve sustainable weight loss.",
  keywords: [
    "PCOS",
    "weight loss",
    "hormone balance",
    "diet plan",
    "personalized nutrition",
  ],
  openGraph: {
    title: "PCOS Plan - Personalized Weight Loss for Women with PCOS",
    description:
      "Take control of PCOS with a personalized diet and lifestyle plan.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
