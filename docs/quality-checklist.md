# Website quality checklist

## Content and structure

- Every page has one clear purpose and one meaningful h1.
- Repeated facts live in shared configuration; page copy lives in content modules.
- Claims, dates, names, contact details, and external URLs have an identified source.
- Empty, loading, error, and success states tell the truth.
- Internal briefs and planning material remain in docs unless intentionally approved as
  public website content.

## Design system

- Components use semantic tokens rather than raw brand colors.
- Spacing and typography use the documented scales.
- Shared patterns are reusable variants, not copied markup.
- Desktop and mobile layouts preserve hierarchy and readable line lengths.

## Accessibility

- Landmarks, heading order, labels, names, and states are semantic.
- All interactions work with a keyboard and show visible focus.
- Primary targets are at least 44 by 44 CSS pixels.
- Reduced-motion preferences are respected.
- Images have appropriate alternatives; decorative images use empty alternatives.
- Axe reports no serious or critical violations.

## SEO and sharing

- Every public route has a unique title, description, and canonical.
- Navigation, sitemap, canonicals, and exported routes agree.
- The 404 route is noindex and has no conflicting canonical.
- Open Graph/Twitter output and structured data match visible, verified content.
- Production canonicals use the approved HTTPS origin, never localhost or an example
  domain.

## Performance and resilience

- Images reserve space, declare sizes, and prioritize only the LCP image.
- No unnecessary client boundary or heavy dependency is introduced.
- External requests expose useful loading and error states.
- Static export works at both root and configured repository subpaths.

## Handoff

- pnpm verify passes.
- Generated artifacts are not committed.
- Environment variables are documented without secrets.
- Intentional deviations are recorded in the pull request.
