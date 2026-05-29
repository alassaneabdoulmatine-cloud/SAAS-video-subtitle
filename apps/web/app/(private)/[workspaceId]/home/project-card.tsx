import { Project } from "@/features/projects/project-type";
import ProjectCardBody from "./Project-card-body";
import ProjectCardFooter from "./project-card-footer";
import { useWorkspace } from "@/features/workspaces/queries/workspace-queries";

type VideoProjectCard = {
    project: Project
}
export default function VideoProjectCard({
    project
}: VideoProjectCard) {
    const { workspaces, } = useWorkspace();
    const workspace = workspaces?.find((workspace) => workspace.id === project.workspaceId);

    return (
        <div
            className="group relative aspect-[11/12] flex flex-col rounded-md bg-card border hover:border-primary/40 overflow-hidden transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1 cursor-pointer"
        >
            <ProjectCardBody name={project.name} workspace={workspace} />
            <ProjectCardFooter project={project} />
        </div>
    );
}