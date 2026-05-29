"use client"
import { Button } from "@/components/ui/button";
import { Settings, HelpCircle } from "lucide-react";
import { useWorkspace } from '@/features/workspaces/queries/workspace-queries';
import { useRouter } from 'next/navigation';

export default function NotFound() {

    const { workspaces } = useWorkspace()
    const router = useRouter()
    function handleRedirect() {
        if (!workspaces) return
        if (workspaces.length > 0) {
            router.push(`/${workspaces[0].id}/home`)
        }

        return (
            <div className="flex flex-col min-h-screen bg-[#fafafa] items-center justify-between p-4 font-sans selection:bg-gray-200">

                {/* Zone centrale : La carte d'erreur */}
                <div className="flex-1 flex items-center justify-center w-full">
                    <div className="bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-100 p-8 max-w-[440px] w-full text-center flex flex-col items-center">

                        {/* Illustration de l'icône (Engrenages + Point d'interrogation) */}
                        <div className="relative mb-6 text-gray-300">
                            <div className="p-4 bg-gray-50 rounded-full inline-block">
                                <Settings className="w-12 h-12 stroke-[1.2]" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                                <HelpCircle className="w-5 h-5 text-gray-400 fill-white" />
                            </div>
                        </div>

                        {/* Titre principal */}
                        <h1 className="text-[#111214] text-lg font-semibold mb-2 tracking-tight">
                            Cette page n’est pas disponible
                        </h1>

                        {/* Message de description */}
                        <p className="text-[#656972] text-sm leading-relaxed mb-6 px-4">
                            Vous n’avez pas accès à cet environnement de travail ou il n’existe plus.
                        </p>

                        {/* Bouton de retour (Composant shadcn) */}
                        <Button
                            onClick={handleRedirect}
                            className="w-full text-black font-medium rounded-lg h-10 transition-colors text-sm cursor-pointer"
                        >
                            Retour vers l'accueil
                        </Button>

                    </div>
                </div>

            </div>
        );
    }
}