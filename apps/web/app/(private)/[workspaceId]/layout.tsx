"use client"
import { useWorkspace } from "@/features/workspaces/queries/workspace-queries";
import { redirect } from "next/navigation";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return <>{children}</>
}