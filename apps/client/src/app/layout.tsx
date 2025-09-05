import {
  Atkinson_Hyperlegible_Next,
  Geist,
  JetBrains_Mono,
  Noto_Serif,
} from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { QueryProvider } from "@/providers/query.provider";
import { seo } from "@/shared/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const hyperLegible = Atkinson_Hyperlegible_Next({
  variable: "--font-atkinson-serif",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata = seo({
  title: "notempo",
  description: "A simple notetaking implementation.",
  keywords: "note, notes, knowledge, management, system",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${hyperLegible.variable} ${notoSerif.variable} ${jetBrainsMono.variable} antialiased flex w-screen h-screen justify-center items-center`}
      >
        <QueryProvider>{children}</QueryProvider>
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
