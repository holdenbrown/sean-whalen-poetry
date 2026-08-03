import Link from "next/link"

import { siteConfig } from "@/config/site"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background text-foreground">
      <div className="site-frame field-section">
        <div aria-hidden="true" className="border-r border-border" />
        <div className="field-content grid divide-y divide-border py-site-xl md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="pb-site-lg md:pr-site-xl md:pb-0">
            <Link
              href="/"
              aria-label={siteConfig.name + " home"}
              className="inline-flex min-h-11 items-center font-heading text-4xl leading-tight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {siteConfig.name}
            </Link>
            <p className="mt-1 font-mono text-sm leading-relaxed text-muted-foreground">
              Poet · Rural Boone County, Iowa
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-x-6 gap-y-2 py-site-lg md:justify-center md:px-site-xl md:py-0"
          >
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex min-h-11 items-center text-sm text-foreground transition-colors duration-150 ease-fluid hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center pt-site-lg md:justify-end md:pt-0 md:pl-site-xl">
            <p className="max-w-xs font-mono text-sm leading-relaxed text-muted-foreground">
              Poem links lead to their original publications.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
