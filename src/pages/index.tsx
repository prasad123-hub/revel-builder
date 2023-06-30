import Image from "next/image";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold font-cal">
        Collect Testimonials in no time
      </h1>
      <p className="text-lg font-medium font-hand">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
      </p>
      <Button size="lg">Get Started</Button>
    </div>
  );
}
