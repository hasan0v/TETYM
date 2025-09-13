import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TETYM - Tələbə Elmi Texniki Yaradıcılıq Mərkəzi",
  description: "Gələcəyin texnologiyalarını bugündən öyrənin. TETYM-də tələbələr innovativ layihələr hazırlayır, texniki bacarıqlarını inkişaf etdirir və karyera yollarını formalaşdırır.",
  keywords: "TETYM, texniki təhsil, innovasiya, layihələr, tələbələr, texnologiya",
  authors: [{ name: "TETYM Team" }],
  creator: "TETYM",
  publisher: "TETYM",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "az_AZ",
    url: "https://tetym.az",
    siteName: "TETYM",
    title: "TETYM - Tələbə Elmi Texniki Yaradıcılıq Mərkəzi",
    description: "Gələcəyin texnologiyalarını bugündən öyrənin",
  },
  twitter: {
    card: "summary_large_image",
    title: "TETYM - Tələbə Elmi Texniki Yaradıcılıq Mərkəzi",
    description: "Gələcəyin texnologiyalarını bugündən öyrənin",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az" className={inter.variable}>
      <body className="font-sans antialiased bg-gray-50">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
