import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import LightRays from "@/components/ui/LightRays";
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
            {/* Background Rays - Hidden for Dashboard Routes */}
            <div className="absolute inset-0 top-0 z-[-1] min-h-screen pointer-events-none">
              <LightRays
                raysOrigin="top-center-offset"
                raysColor="#5dfeca"
                raysSpeed={0.5}
                lightSpread={0.9}
                rayLength={1.4}
                followMouse={true}
                mouseInfluence={0.02}
                noiseAmount={0.0}
                distortion={0.01}
                className="custom-rays"
              />
            </div>

            <main>{children}</main>
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
