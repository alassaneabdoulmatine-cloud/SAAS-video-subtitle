"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function Useuser() {

    const queryKey = ['users'];
    const queryClient = useQueryClient()
    const invalidate = () => queryClient.invalidateQueries({ queryKey })

    // fetch users data
    const { data, isLoading, error } = useQuery({
        queryKey,
        queryFn: async () => {
            const result = await fetch("http://localhost:3001/userapp");
            if (!result.ok) {
                throw new Error("Failed to fetch users");
            }
            return result.json();
        },
    });

    // get user by id
    const { mutate: getuserbyid, isPending: isLoadinguserbyid, error: erroruserbyid, data: datauserbyid } = useMutation({
        mutationFn: async (id: number) => {
            const result = await fetch(`http://localhost:3001/userapp/${id}`);
            if (!result.ok) {
                throw new Error("Failed to fetch user");
            }
            return result.json();
        },
        onSuccess: () => {
            invalidate()
        }
    })

    // delete user
    const { mutate: deleteuser, isPending: isLoadingdeleteuser, error: errordeleteuser, data: datadeleteuser } = useMutation({
        mutationFn: async (id: number) => {
            const result = await fetch(`http://localhost:3001/userapp/${id}`, {
                method: "DELETE",
            });
            if (!result.ok) {
                throw new Error("Failed to delete user");
            }
        },
        onSuccess: () => {
            invalidate()
        }
    })

    // update user
    const { mutate: updateuser, isPending: isLoadingupdateuser, error: errorupdateuser, data: dataupdateuser } = useMutation({
        mutationFn: async ({ id, updateduser }: { id: number, updateduser: any }) => {
            const result = await fetch(`http://localhost:3001/userapp/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateduser),
            });
            if (!result.ok) {
                throw new Error("Failed to update user");
            }
            return result.json();
        },
        onSuccess: () => {
            invalidate()
        }
    })

    // create user
    const { mutate: createuser, isPending: isLoadingcreateuser, error: errorcreateuser, data: datacre }
        = useMutation({
            mutationFn: async (userdata: any) => {
                const result = await fetch(`http://localhost:3001/userapp`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userdata),
                });
                if (!result.ok) {
                    throw new Error("Failed to create user");
                }
                return result.json();
            },
            onSuccess: () => {
                invalidate()
            }
        })

    return {
        users: data ?? [],
        isLoading,
        error,
        deleteuser,
        updateuser,
        createuser,
        getuserbyid,
        isLoadinguserbyid,
        erroruserbyid,
        datauserbyid,
        isLoadingdeleteuser,
        errordeleteuser,
        datadeleteuser,
        isLoadingupdateuser,
        errorupdateuser,
        dataupdateuser,
        isLoadingcreateuser,
        errorcreateuser,
        datacre
    }

}