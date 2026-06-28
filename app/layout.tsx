import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "プロジェクト管理 | 平田商店",
  description: "製造コンサルタント向けプロジェクト管理システム",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
