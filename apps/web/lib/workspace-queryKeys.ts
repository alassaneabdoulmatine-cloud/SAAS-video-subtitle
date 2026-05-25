export const workspaceKeys = {
    all: ["workspaces"] as const,
    detail: (id: string) => ["workspace", id] as const,
};