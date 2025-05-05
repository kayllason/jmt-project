import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'JMT Project',
  description: '존맛탱 프로젝트 오메추 룰렛',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body className="font-reco bg-[#ffffff]">{children}</body>
    </html>
  );
}
