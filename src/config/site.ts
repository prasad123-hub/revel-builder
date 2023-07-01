export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Revel",
  description:
    "Collect text testimonials. Share them everywhere. Convert more visitors and close more deals!",
  mainNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Pricing",
      href: "/pricing",
    },
    {
      title: "Snap Collection",
      href: "/dashboard/collection",
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
    },
  ],
  links: {
    twitter: "https://twitter.com",
    github: "https://github.com/prasad123-hub/revel.git",
    docs: "",
  },
  url: "https://revel.npmstack.com",
}
