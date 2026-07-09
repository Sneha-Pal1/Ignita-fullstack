import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { NavbarWrapper } from "@/components/NavbarWrapper";
import { AuthProvider } from "@/lib/auth-context";
import { GoogleOAuthProvider } from "@react-oauth/google";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const SchibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted_grotesk",
  subsets: ["latin"],
});

const MartianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IGNITA",
  description:
    "an event aggregator for students and developers to discover hackathons, internships, coding contests, and tech events",
  icons: {
    icon: "/icons/iglogoremovebg.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)} suppressHydrationWarning>
      <body
        className={`${SchibstedGrotesk.variable} ${MartianMono.variable} min-h-screen antialiased`}
        suppressHydrationWarning
      >
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <AuthProvider>
            <NavbarWrapper />
            {/* Background is clean #0d1117 defined in globals.css */}

            <main>{children}</main>
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
