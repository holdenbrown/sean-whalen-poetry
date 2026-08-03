import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

type ContainerProps = ComponentProps<"div"> & {
  width?: "wide" | "reading"
}

export function Container({ className, width = "wide", ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "w-full px-6 lg:px-8",
        width === "wide" ? "site-frame" : "reading-frame",
        className
      )}
      {...props}
    />
  )
}
