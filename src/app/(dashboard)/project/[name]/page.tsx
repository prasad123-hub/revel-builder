import { Sidebar } from "@/components/sidebar"

export default async function ProjectDetailsPage() {
  return (
    <div>
      {Array.from({ length: 30 }).map((_, i) => (
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
          consectetur nam fuga voluptatem quam nemo sapiente facere esse laborum
          architecto!
        </div>
      ))}
    </div>
  )
}
