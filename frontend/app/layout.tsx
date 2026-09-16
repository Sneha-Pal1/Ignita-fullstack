import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { NavbarWrapper } from "@/components/NavbarWrapper";
import { AuthProvider } from "@/lib/auth-context";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GrainTexture } from "@/components/levo/GrainTexture";

const geistSans = { variable: "font-geist-sans" };
const geistMono = { variable: "font-geist-mono" };
const martianMono = { variable: "font-martian-mono" };

export const metadata: Metadata = {
  title: "IGNITA — Event Aggregator for Tech Enthusiasts",
  description:
    "Discover hackathons, internships, coding contests, and workshops all in one unified, real-time platform.",
  icons: {
    icon: "/favicon.svg",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("font-sans dark", geistSans.variable, geistMono.variable, martianMono.variable)}
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${martianMono.variable} min-h-screen bg-[#0e0e0d] text-[#f4f4f0] antialiased selection:bg-[#FFB100] selection:text-black`}
        suppressHydrationWarning
      >
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
        >
          <AuthProvider>
            <GrainTexture />
            <NavbarWrapper />
            <main className="min-h-screen w-full">{children}</main>
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}


