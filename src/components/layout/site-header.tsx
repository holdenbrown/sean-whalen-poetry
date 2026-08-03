import Link from "next/link"

import { MobileNavigation } from "@/components/layout/mobile-navigation"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="site-frame field-section">
        <div aria-hidden="true" className="border-r border-border" />
        <nav
          aria-label="Primary navigation"
          className="field-content flex min-h-20 items-center justify-between gap-6"
        >
          <Link
            href="/"
            aria-label={siteConfig.name + " home"}
            className="flex min-h-11 items-center font-sans text-xl font-normal tracking-tight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {siteConfig.shortName}
          </Link>

          <div className="hidden items-center gap-10 md:flex">
            <div className="flex items-center gap-2">
              {siteConfig.navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex min-h-11 items-center px-3 text-sm font-medium text-foreground transition-colors duration-150 ease-fluid hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Button asChild variant="outline" className="rounded-none px-6 font-normal">
              <Link href={siteConfig.primaryAction.href}>
                {siteConfig.primaryAction.label}
              </Link>
            </Button>
          </div>

          <MobileNavigation />
        </nav>
      </div>
    </header>
  )
}
