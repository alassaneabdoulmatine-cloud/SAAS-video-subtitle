import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { ArrowUpRightIcon, FolderCodeIcon, Plus } from "lucide-react";

export default function EmptyProject() {
    return (
        <div className="flex justify-center items-center h-screen bg-background px-4">
            <Empty className="max-w-md text-center flex flex-col items-center">
                <EmptyHeader className="flex flex-col items-center gap-4">
                    {/* Conteneur d'icône stylé et moderne */}
                    <EmptyMedia variant="icon" className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted border shadow-xs text-foreground">
                        <FolderCodeIcon className="h-6 w-6 stroke-[1.5]" />
                    </EmptyMedia>

                    <div className="space-y-2 mt-2">
                        <EmptyTitle className="text-xl font-semibold tracking-tight text-foreground">
                            Aucun projet pour l'instant
                        </EmptyTitle>
                        <EmptyDescription className="text-sm text-muted-foreground max-w-[320px] leading-relaxed">
                            Vous n'avez créé aucun projet pour l'instant. Commencez par créer votre premier projet.
                        </EmptyDescription>
                    </div>
                </EmptyHeader>

                <EmptyContent className="flex flex-col items-center gap-3 mt-6 w-full">
                    {/* Bouton d'action principal avec icône Plus */}
                    <Button className="gap-2 w-full h-8 sm:w-auto px-4 cursor-pointer">
                        <Plus className="h-4 w-4" />
                        Créer un projet
                    </Button>

                    {/* Lien d'aide discret */}
                    <Button
                        variant="link"
                        asChild
                        className="text-muted-foreground hover:text-foreground transition-colors gap-1 text-xs font-normal mt-1"
                        size="sm"
                    >
                        <a href="#" className="flex items-center">
                            En savoir plus <ArrowUpRightIcon className="h-3 w-3 opacity-60" />
                        </a>
                    </Button>
                </EmptyContent>
            </Empty>
        </div>
    )
}