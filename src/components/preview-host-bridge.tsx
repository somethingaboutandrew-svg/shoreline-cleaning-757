"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { installPreviewHostBridge } from "@/lib/preview-host-bridge";

const ROUTES = [
  "/",
  "/services",
  "/about",
  "/reviews",
  "/service-areas",
  "/faq",
  "/blog",
  "/contact",
  "/privacy",
  "/terms",
];

export function PreviewHostBridge() {
  const router = useRouter();

  useEffect(() => {
    return installPreviewHostBridge({
      navigate: (path) => {
        router.push(path);
      },
      getRoutePaths: () => ROUTES,
    });
  }, [router]);

  return null;
}
