// src/app/app/layout.tsx
"use client";
import { usePathname } from 'next/navigation';
import AppLayout from '@/components/AppLayout';
import { GlobalProvider } from '@/lib/context/GlobalContext';

export default function Layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    
    // 拼贴诗相关页面使用自己的完整布局，不使用模板的 AppLayout
    // /app 是拼贴诗应用的主页面，有自己的完整布局（包括侧边栏、导航栏等）
    // /app/poetry/* 是拼贴诗的子页面，也使用自己的布局
    const isPoetryPage = pathname === '/app' || pathname.startsWith('/app/poetry');
    
    return (
        <GlobalProvider>
            {isPoetryPage ? (
                // 拼贴诗应用使用自己的完整布局
                children
            ) : (
                // 其他页面（如 user-settings, storage 等）使用模板的 AppLayout
                <AppLayout>{children}</AppLayout>
            )}
        </GlobalProvider>
    );
}