export const videoKeys = {
    all: ["videos"] as const,

    list: (workspaceId: string, projectId: string) =>
        ["videos", "list", workspaceId, projectId] as const,

    detail: (workspaceId: string, projectId: string, videoId: string) =>
        ["videos", "detail", workspaceId, projectId, videoId] as const,
};