import EmptyProject from "./emptyProject"
import ProjectGrid from "./ProjectGrid"

export default function Page() {
    const isData = true;
    return (
        <>
            {isData ? <ProjectGrid /> : <EmptyProject />}
        </>
    )
}