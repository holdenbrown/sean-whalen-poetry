import { createElement } from "react"
import { ImageResponse } from "next/og"

import { siteConfig } from "@/config/site"
import { homeContent } from "@/content/home"

export const dynamic = "force-static"

const size = {
  width: 1200,
  height: 630,
}

export function GET() {
  return new ImageResponse(
    createElement(
      "div",
      {
        style: {
          alignItems: "stretch",
          background: "#f2efe5",
          color: "#151815",
          display: "flex",
          height: "100%",
          width: "100%",
        },
      },
      createElement(
        "div",
        {
          style: {
            alignItems: "center",
            borderRight: "2px dashed #555d56",
            display: "flex",
            justifyContent: "center",
            width: "112px",
          },
        },
        createElement("div", {
          style: {
            background: "#a33c2a",
            height: "2px",
            width: "42px",
          },
        })
      ),
      createElement(
        "div",
        {
          style: {
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px 58px",
          },
        },
        createElement(
          "div",
          { style: { fontSize: 28, fontWeight: 500 } },
          siteConfig.name
        ),
        createElement(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            },
          },
          createElement(
            "div",
            { style: { fontSize: 104, fontWeight: 500, lineHeight: 0.92 } },
            homeContent.hero.title
          ),
          createElement(
            "div",
            {
              style: {
                color: "#555d56",
                fontSize: 28,
                lineHeight: 1.35,
                maxWidth: "780px",
              },
            },
            homeContent.socialSummary
          )
        ),
        createElement(
          "div",
          { style: { color: "#555d56", fontSize: 20 } },
          homeContent.hero.identity
        )
      )
    ),
    size
  )
}
