import { SignUp } from "@clerk/nextjs"

import { Layout } from "@/components/layout"

export default function SignUpPage() {
  return (
    <Layout>
      <div className="flex min-h-[90vh] items-center justify-center">
        <SignUp path="/signup" routing="path" signInUrl="/login" />
      </div>
    </Layout>
  )
}
