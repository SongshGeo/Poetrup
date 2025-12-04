"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobal } from "@/lib/context/GlobalContext";
import { AppDataProvider } from "@/lib/context/AppDataContext";
import { Layout } from "@/components/Layout";

export default function PoetryPage() {
  const router = useRouter();
  const { user, loading: userLoading } = useGlobal();

  useEffect(() => {
    if (!userLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, userLoading, router]);

  if (userLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">加载中...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <AppDataProvider>
      <Layout />
    </AppDataProvider>
  );
}
