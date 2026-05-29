"use client";
import { useWorkspace } from "@/features/workspaces/queries/workspace-queries";
import { redirect } from "next/navigation";

export default function Page() {
    const { workspaces, workspaceListLoading } = useWorkspace()

    if (workspaceListLoading) return <div>Loading...</div>
    if (workspaces && workspaces?.length > 0) redirect(`/${workspaces?.[0]?.id}/home`)

}