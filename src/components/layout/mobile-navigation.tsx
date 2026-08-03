"use client"

import { MenuIcon } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"

import { siteConfig } from "@/config/site"

export function MobileNavigation() {
  const detailsRef = useRef<HTMLDetailsElement>(null)

  function closeNavigation() {
    if (detailsRef.current) {
      detailsRef.current.open = false
    }
  }

  return (
    <details ref={detailsRef} className="group relative md:hidden">
      <summary className="flex size-11 cursor-pointer list-none items-center justify-center text-foreground transition-colors duration-150 ease-fluid hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
        <MenuIcon aria-hidden="true" className="size-6" strokeWidth={1.5} />
        <span className="sr-only">Toggle navigation</span>
      </summary>
      <div className="absolute top-full right-0 mt-2 w-64 border border-border bg-background p-2 text-foreground">
        <div className="flex flex-col gap-1">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeNavigation}
              className="flex min-h-11 items-center px-3 text-sm font-medium transition-colors duration-150 ease-fluid hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </details>
  )
}
