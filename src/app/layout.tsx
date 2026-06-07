import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'My Portfolio',
  description: 'Created with React, TypeScript, and MUI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body style={{ margin: 0, padding: 0, fontFamily: 'sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
