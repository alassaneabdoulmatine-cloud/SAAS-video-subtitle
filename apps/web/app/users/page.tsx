"use client";
import { Button } from "@/components/ui/button";
import Useuser from "./Useuser";

export default function UsersPage() {
    const { users, isLoading, error, createuser, deleteuser, updateuser, getuserbyid, isLoadingcreateuser, isLoadingdeleteuser } = Useuser();

    function handleCreateUser() {
        const user = {
            name: "mon nom",
            email: "maineconna@gmail.com",

        }
        createuser(user);
        console.log("ajouter");
    }
    function handleDeleteUser(id: number) {
        deleteuser(id);
    }
    function handleUpdateUser(id: number, updateduser: any) {
        updateuser({ id, updateduser });
    }
    function handleGetUserById(id: number) {
        getuserbyid(id);
    }
    console.log(users)
    return (
        <div className="flex flex-col justify-center item-center px-100 py-20">
            <div className="flex flex-row justify-between">
                <span>les users</span>
                <Button onClick={handleCreateUser} disabled={isLoadingcreateuser}>{isLoadingcreateuser ? "Creating..." : "Create User"}</Button>
            </div>

            <div className="w-full flex flex-col justify-center item-center">
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        {users.map((user: any) => (
                            <div key={user.id} className="w-full flex flex-row justify-between py-10 border-b px-10">
                                <span>{user.name}</span>
                                <span>{user.email}</span>
                                <Button onClick={() => handleDeleteUser(user.id)} disabled={isLoadingdeleteuser}>{isLoadingdeleteuser ? "Deleting..." : "Delete"}</Button>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}