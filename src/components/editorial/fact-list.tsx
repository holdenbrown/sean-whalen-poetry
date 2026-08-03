import { cn } from "@/lib/utils"

type Fact = {
  term: string
  detail: string
}

type FactListProps = {
  facts: readonly Fact[]
  variant?: "rows" | "columns"
}

export function FactList({ facts, variant = "rows" }: FactListProps) {
  return (
    <dl
      className={cn(
        "relative border-t border-border",
        variant === "columns" && "sm:grid sm:grid-cols-3"
      )}
    >
      {facts.map((fact) => (
        <div
          key={fact.term}
          className={cn(
            "border-b border-border py-6",
            variant === "rows" && "grid gap-3 sm:grid-cols-[9rem_1fr] sm:gap-6",
            variant === "columns" &&
              "sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
          )}
        >
          <dt className="font-mono text-xs font-semibold tracking-wide text-foreground">
            {fact.term}
          </dt>
          <dd
            className={cn(
              "font-mono text-sm leading-relaxed text-muted-foreground",
              variant === "columns" && "mt-3"
            )}
          >
            {fact.detail}
          </dd>
        </div>
      ))}
    </dl>
  )
}
