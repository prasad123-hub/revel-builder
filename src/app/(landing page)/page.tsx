import Image from "next/image"

import { Button } from "@/components/ui/button"
import { InfiniteTestimonialCards } from "@/components/infinite-testimonial-cards"
import { TestimonialWall } from "@/components/testimonial-wall"

export default async function LandingPage() {
  return (
    <>
      <section aria-label="hero-section" className="py-12 md:py-14 lg:py-20">
        <h3 className="bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text font-hand text-2xl font-semibold text-transparent">
          Testimonials Made Easy
        </h3>
        <h1 className="max-w-xl py-6 font-cal text-4xl font-bold md:text-5xl">
          Collecting testimonials doesn't get easier than this
        </h1>
        <Button size="sm" className="mt-2">
          Get Started for Free
        </Button>

        <div className="mx-auto mt-12 max-w-7xl">
          <Image
            width={2000}
            height={1000}
            alt={`Cover Image for Revel`}
            src="/hero.png"
          />
        </div>
      </section>

      <section
        aria-label="features-section"
        className="space-y-12 py-12 md:space-y-14 md:py-14 lg:space-y-20 lg:py-20"
      >
        {/* FEATURE --> 1 */}
        <div className="relative w-full bg-white">
          <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8">
            <div className="flex flex-col justify-center lg:col-span-7 lg:gap-x-6 xl:col-span-6">
              <h3 className="bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text font-hand text-2xl font-semibold text-transparent">
                Collect
              </h3>
              <h1 className="max-w-xl py-6 font-cal text-4xl font-bold md:text-5xl">
                Build your testimonial form as you want -
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Revel makes it easy for your happy customers to leave you a
                video or text testimonial. Your beautiful new collection form
                takes less than 30 seconds to create.
              </p>
            </div>
            <div className="relative mt-10 lg:col-span-5 lg:mt-0 xl:col-span-6">
              <Image
                src="/feature1.png"
                alt="Revel Hero"
                width={1200}
                height={800}
                className="rounded-lg"
              />
            </div>
          </div>

          <div className="mx-auto mt-28 max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8">
            <div className="flex flex-col justify-center lg:order-1 lg:col-span-7 lg:gap-x-6 xl:col-span-6">
              <h3 className="bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text font-hand text-2xl font-semibold text-transparent">
                Collect
              </h3>
              <h1 className="max-w-xl py-6 font-cal text-4xl font-bold md:text-5xl">
                Collect testimonials from your customers with email.
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Revel makes it easy for your happy customers to leave you a
                video or text testimonial. Your beautiful new collection form
                takes less than 30 seconds to create.
              </p>
            </div>
            <div className="lg:order-0 relative mt-10 lg:col-span-5 lg:mt-0 xl:col-span-6">
              <Image
                src="/feature2.png"
                alt="Revel Hero"
                width={1200}
                height={800}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        aria-label="features-section"
        className="py-12 md:py-14 lg:py-20"
      >
        <h3 className="bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-center font-hand text-2xl font-semibold text-transparent">
          Wall of Love
        </h3>
        <h1 className="mx-auto max-w-xl py-6 text-center font-cal text-4xl font-bold md:text-5xl">
          Let your customers share what they love about you
        </h1>
        {/* <InfiniteTestimonialCards /> */}
        <TestimonialWall />
      </section>
    </>
  )
}
