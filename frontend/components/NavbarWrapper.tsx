"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export const NavbarWrapper = () => {
  const pathname = usePathname();

  // Hide navbar for dashboard and app routes
  const dashboardRoutes = [
    "/Dashboard",
    "/events",
    "/Bookmarks",
    "/Notification",
    "/analytics",
    "/linkedin-post-generator",
    "/profile",
    "/settings",
    "/alerts",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ];

  const shouldHideNavbar = dashboardRoutes.some(
    (route) => pathname.startsWith(route) || pathname === route,
  );

  if (shouldHideNavbar) {
    return null;
  }

  return <Navbar />;
};
