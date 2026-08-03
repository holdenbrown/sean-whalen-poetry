import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

export function ContourLines({ className, ...props }: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 size-full text-foreground",
        className
      )}
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      >
        <path d="M-42 155C76 73 185 61 294 112c88 41 169 40 254-4 91-48 190-45 296 9" />
        <path d="M-52 181C71 97 184 86 291 136c90 42 174 41 261-6 94-51 196-47 305 12" />
        <path d="M-60 209C65 123 181 111 289 161c93 43 180 41 269-8 97-53 202-48 313 16" />
        <path d="M-70 239C59 150 178 137 288 186c96 43 185 41 277-10 100-55 208-48 322 20" />
        <path d="M-77 271C53 178 175 164 288 212c98 42 190 38 284-13 103-57 214-49 331 23" />
        <path d="M-84 305C47 207 173 190 289 238c100 41 195 36 291-16 106-58 221-49 340 28" />
        <path d="M-89 341C42 237 171 219 291 264c102 39 199 32 297-20 109-58 227-48 349 34" />
        <path d="M-92 378C38 269 170 249 294 291c103 35 202 27 302-25 112-57 233-45 356 42" />
        <path d="M-93 416C36 303 170 281 298 318c104 31 205 21 307-30 114-55 237-40 362 50" />
      </g>
    </svg>
  )
}
