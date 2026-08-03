import type { Metadata } from "next"
import Link from "next/link"

import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Page not found",
  description: "The requested page does not exist.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <section className="flex min-h-[65svh] items-center py-site-3xl">
      <Container width="reading" className="text-center">
        <p className="font-mono text-sm font-semibold tracking-widest text-primary">
          404
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
          This page could not be found.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Check the address or return to the homepage.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/">Return home</Link>
        </Button>
      </Container>
    </section>
  )
}
