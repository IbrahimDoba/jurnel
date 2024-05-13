import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import ReduxWrapper from "./ReduxWrapper";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "WordGen",
    template: `%s - WordGen`,
  },
  description: "Learn new words and journal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxWrapper>
      <body className={spaceGrotesk.className}>
        {children}
        <div id="portal"></div>
      </body>
    </ReduxWrapper>
  );
}
