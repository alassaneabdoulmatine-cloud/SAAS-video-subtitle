const API_URL = "http://localhost:3001";

export async function api<T>(url: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${API_URL}${url}`, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        ...options,
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "API Error");
    }

    return res.json() as T;
}