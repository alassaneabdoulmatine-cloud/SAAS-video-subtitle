export const projectKeys = {
    all: ["projects"] as const,

    list: (workspaceId: string) =>
        ["projects", "list", workspaceId] as const,

    detail: (workspaceId: string, projectId: string) =>
        ["projects", "detail", workspaceId, projectId] as const,
};