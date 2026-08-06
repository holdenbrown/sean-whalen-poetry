import { ArrowRightIcon } from "lucide-react"

import { ExternalLink } from "@/components/external-link"
import type { Work } from "@/content/works"
import { cn } from "@/lib/utils"

type PublicationRowProps = {
  work: Work
  variant?: "featured" | "compact"
  metadata?: string
  actionLabel?: string
}

export function PublicationRow({
  work,
  variant = "featured",
  metadata,
  actionLabel,
}: PublicationRowProps) {
  const isCompact = variant === "compact"
  const rowClassName = cn(
    "publication-row group",
    work.href &&
      "focus-editorial transition-colors duration-150 ease-fluid hover:bg-secondary/45",
    isCompact && "publication-row-compact"
  )
  const content = (
    <>
      <h3
        className={cn(
          "font-heading text-balance",
          work.href && "transition-colors duration-150 group-hover:text-primary",
          isCompact ? "text-2xl leading-tight sm:text-3xl" : "display-row"
        )}
      >
        {work.title}
      </h3>
      <p className="publication-row-metadata font-mono text-sm leading-relaxed text-muted-foreground">
        {metadata ?? work.venue}
      </p>
      <span className="publication-row-action flex items-center justify-end gap-4 font-mono text-sm text-primary">
        <span className={work.href ? "hidden lg:inline" : undefined}>
          {actionLabel ?? work.actionLabel}
        </span>
        {work.href ? (
          <ArrowRightIcon
            aria-hidden="true"
            className="size-5 text-signal transition-transform duration-150 ease-fluid group-hover:translate-x-1"
            strokeWidth={1.5}
          />
        ) : null}
      </span>
    </>
  )

  return work.href ? (
    <ExternalLink href={work.href} className={rowClassName}>
      {content}
    </ExternalLink>
  ) : (
    <div className={rowClassName}>{content}</div>
  )
}
