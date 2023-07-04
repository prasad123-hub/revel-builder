interface ProjectDetailsPageProps {
  params: {
    id: string
  }
}

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  return (
    <div>
      <h1>Project Details Page for {params.id}</h1>
    </div>
  )
}
