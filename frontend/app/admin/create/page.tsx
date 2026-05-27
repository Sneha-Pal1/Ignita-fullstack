"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LegacyAdminCreatePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/create-event");
  }, [router]);

  return null;
}
