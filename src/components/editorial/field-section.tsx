import type { ComponentProps, ReactNode } from "react"

import { cn } from "@/lib/utils"

type FieldSectionProps = Omit<ComponentProps<"section">, "children"> & {
  railLabel: `${string} / ${string}`
  children: ReactNode
  contentClassName?: string
  railClassName?: string
  railMarkClassName?: string
}

export function FieldSection({
  railLabel,
  children,
  className,
  contentClassName,
  railClassName,
  railMarkClassName,
  ...props
}: FieldSectionProps) {
  const [railTerm, railOrdinal] = railLabel.split(" / ")

  return (
    <section className={cn("field-section", className)} {...props}>
      <div aria-hidden="true" className={cn("field-rail draw-meridian", railClassName)}>
        <span className={cn("field-rail-mark", railMarkClassName)}>
          <span>{railTerm}</span>
          <span className="field-rail-sequence"> / {railOrdinal}</span>
        </span>
      </div>
      <div className={cn("field-content", contentClassName)}>{children}</div>
    </section>
  )
}
