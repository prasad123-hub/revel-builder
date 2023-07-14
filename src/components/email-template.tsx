import * as React from "react"
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Link,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"

interface RevelInviteUserEmailProps {
  username?: string
  message?: string
  formId?: string
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export function RevelInviteUserEmail({
  username,
  message,
  formId,
}: RevelInviteUserEmailProps) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-[40px] w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Text className="text-[14px] leading-[24px] text-black">
              Hey {username} 👋🏻,
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              {message}
            </Text>
            <Section className="mb-[32px] mt-[32px] text-center">
              <Button
                pX={20}
                pY={12}
                className="rounded bg-[#000000] text-center text-[12px] font-semibold text-white no-underline"
                href={`${baseUrl}/form/t/${formId}`}
              >
                Share Testimonial
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              or copy and paste this URL into your browser:{" "}
              <Link
                href={`${baseUrl}/form/t/${formId}`}
                className="text-blue-600 no-underline"
              >
                {`${baseUrl}/form/t/${formId}`}
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
