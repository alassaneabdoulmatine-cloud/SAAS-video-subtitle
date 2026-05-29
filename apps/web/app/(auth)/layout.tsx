"use client";

import { useMe } from "@/features/auth/hooks/useme";
import { useWorkspace } from "@/features/workspaces/queries/workspace-queries";
import { redirect } from "next/navigation";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { workspaces, workspaceListLoading } = useWorkspace();

    const { data, isLoading, error } = useMe();

    if (isLoading) return null;

    if (data) {
        redirect("111/home");
    }

    return (
        <div>
            {children}
        </div>
    )
}