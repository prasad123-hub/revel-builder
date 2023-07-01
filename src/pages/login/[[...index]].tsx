import { SignIn } from "@clerk/nextjs"

import { Layout } from "@/components/layout"

export default function SignInPage() {
  return (
    <Layout>
      <div className="flex min-h-[80vh] items-center justify-center">
        <SignIn
          path="/login"
          routing="path"
          signUpUrl="/signup"
          redirectUrl="/dashboard"
        />
      </div>
    </Layout>
  )
}
