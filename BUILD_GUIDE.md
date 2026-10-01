# Digi∞Artha — Build Guide for Subagents

**Read this FIRST. Then read `/home/z/my-project/worklog.md`. Do NOT skip either.**

## 1. What you are building

A single-page Next.js 16 App Router site for the brand **Digi∞Artha** — "Digital. Measurable. Growth." The user only ever sees `/` (`src/app/page.tsx`). Every "page" from the sitemap is rendered as an anchored section on the homepage. The page.tsx already imports and composes all scene + section components — your job is to author those component files so the imports resolve.

The page.tsx imports:
```
src/components/digi/scenes/scene-{name}.tsx        (19 scenes)
src/components/digi/sections/{name}.tsx           (8 secondary sections)
```
Each file MUST default-export nothing and named-export the exact symbol the page imports (see your assignment).

## 2. Brand source of truth

- Master brief: `/home/z/my-project/upload/DigiArtha_3D_Website_Master_Prompt_v2.md`
- All copy: `/home/z/my-project/upload/DigiArtha_Content_Pack.md` (76KB, ~2000 lines)
  - Source A = sections 1–31 (page H1s, solution pages, Growth Score, industries, about, contact, tech, insights, SEO meta, CTAs)
  - Source B = sections 1–22 (eyebrow "Your business is online. But is it digitally discoverable?", engagement models, trust, measurement, governance, pre-launch checklist)
  - Source C = 13 pillars, ecosystem flow, "Don't just rank. Become the answer.", vanity vs business metrics, Growth Score report example, 12-week roadmap, Digital Growth Operating System diagram
- Logo reference image (already analyzed): gradient ∞ ribbon (Cyan→Royal→Violet→Magenta→Coral→Orange), arrowhead up-right, 4-point sparkle above the "i", "ARTHA" with gradient chevron "A"s, tagline flanked by gradient rules.

**Copy rule (NON-NEGOTIABLE):** Use copy VERBATIM from the content pack. Do not invent, shorten, or skip. Pull the exact H1/H2/CTA strings.

## 3. Brand palette + CSS tokens (already wired in `globals.css`)

Backgrounds:
- `bg-ink` (#001331), `bg-ink-deep` (#050A24), `bg-ink-soft` (#0A1A3E)
- `bg-mist` (#FDFDFD), `bg-mist-soft` (#F4F6FB)
- `stage-ink` (radial glow + ink→ink-deep gradient) — use for dark scenes
- `stage-mist` (mist→mist-soft gradient) — use for light scenes

Brand colors (text/bg/border variants all available as `text-cyan`, `bg-cyan`, `border-cyan`, etc.):
- `cyan` #02A3FE, `royal` #2E4BFE, `violet` #7B3FFE, `magenta` #E93BF2, `coral` #FF544D, `orange` #FF8E2D, `amber` #FFB020

Signature utilities:
- `.bg-ribbon` (horizontal gradient Cyan→…→Orange)
- `.text-ribbon` / `.text-ribbon-diag` (gradient text)
- `.border-ribbon`
- `.glow-ribbon` + `.glow-{cyan,royal,violet,magenta,coral,orange,amber}` (bloom shadows)
- `.glass-light` / `.glass-dark` (frosted panels)
- `.mesh-grid` (subtle grid overlay for dark sections)
- `.lane-organic` (cyan→royal), `.lane-inorganic` (violet→magenta), `.lane-performance` (coral→orange)

Animations (all respect reduced motion automatically):
- `.animate-ribbon-flow`, `.animate-sparkle`, `.animate-float`, `.animate-pulse-glow`, `.animate-scan`, `.animate-orbit`

Fonts:
- Headlines: `font-display` (Manrope, weight 800)
- Body: `font-sans` (Inter)
- Mono: `font-mono` (JetBrains Mono) — use for scores, KPI numbers, stage indices
- `.tabular` for tabular numerals

## 4. Shared components you MUST reuse (already built)

All in `src/components/digi/`. Import paths:
```ts
import { Section, SectionHeading, Eyebrow, CtaButton, GlassNode, SidePanel, Tag, Table, GradientRule } from '@/components/digi/ui'
import { InfinityLogo, Sparkle, Wordmark, Tagline, Illustrative, CtaArrow } from '@/components/digi/brand'
import { useReducedMotion, useScrollSpy, useScrollProgress, scrollToSection, useInViewProgress } from '@/components/digi/hooks'
import { InfinityRibbon } from '@/components/digi/infinity-ribbon'
```

API contracts (props you'll use most):

```tsx
<Section id="scene-Nn-name" scene="Nn" tone="dark" | "mist" | "light">
  {children}
</Section>

<SectionHeading
  eyebrow="string"
  h2={<>Turn Digital Into <span className="text-ribbon">Measurable Growth.</span></>}
  lead="string or ReactNode"
  align="left" | "center"
  tone="dark" | "light"
/>

<CtaButton href="#growth-score" variant="primary" | "ghost" | "light">
  Get Your Digital Growth Score →   // include the arrow text exactly as in CTA library
</CtaButton>

<GlassNode
  index="01"             // optional stage/pillar number
  title="Performance Marketing"
  accent="#2E4BFE"        // hex color for glow + index
  onClick={() => setOpenPanel('performance')}  // optional → renders as button
>
  <p className="text-sm text-mist/70">...</p>
</GlassNode>

<SidePanel open={open} onClose={close} title="Performance Marketing" accent="#2E4BFE">
  {full detail copy here}
</SidePanel>

<Tag color="#FF8E2D">High priority</Tag>

<Table tone="dark" rows={[
  ['Vanity metric', 'Impressions'],
  ['Business metric', 'Reach quality / demand'],
]} />

<Illustrative />   // small amber pill — use next to ANY non-verified number
```

**Use these primitives. Do not reinvent cards/buttons.** Only build bespoke visuals when a scene needs a unique 3D set-piece (e.g. lead-birth particles, growth-score orbs, growth-loop finale).

## 5. Mandatory rules (Master Prompt §13, §14)

1. **Real HTML text behind every canvas.** Every scene has semantic `<h2>` + copy as plain HTML — never canvas-only. The page must read correctly without JS/WebGL.
2. **One H1 per page (already in SceneHero). Every other scene uses H2.** Sub-groups use H3.
3. **`whileInView` from Framer Motion** for entrance animations, `viewport={{ once: true, margin: '-15% 0px -10% 0px' }}`.
4. **Reduced motion:** the `Section` and `SectionHeading` already handle the common cases. For bespoke visuals, check `useReducedMotion()` and render a static fallback (illustrated vertical flow, no orbit, no particles).
5. **Illustrative tag:** EVERY non-verified number (scores, percentages, timeframes, "typically 3x") MUST sit next to an `<Illustrative />` pill. No fabricated client metrics anywhere.
6. **No third-party logos** (Google, Meta, etc.). Use abstract glyph tiles + the platform NAME as text only.
7. **No rocket clichés.** The logo's arrowhead is the only arrow motif. Use `<CtaArrow />` for CTAs.
8. **Claims governance:** use "can", "designed to", "aims to". Never "guaranteed", "#1", "best in India".
9. **CTAs** use EXACT text from the CTA Library (Source A §23). No generic "Learn More".
10. **Accessibility:** semantic HTML, `aria-label` on icon-only buttons, `alt` text, keyboard-reachable, WCAG AA contrast on both dark and light.
11. **Mobile-first responsive.** Test mentally at 360px, 768px, 1280px.
12. **Sticky footer is already wired** via `page-shell` flex + `mt-auto` on `<SiteFooter>`.

## 6. File template (copy this for each scene)

```tsx
'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Section, SectionHeading, CtaButton, GlassNode, SidePanel, Tag, Table } from '@/components/digi/ui'
import { InfinityLogo, Sparkle, Illustrative, CtaArrow } from '@/components/digi/brand'
import { useReducedMotion } from '@/components/digi/hooks'

export function SceneXxx() {
  const [open, setOpen] = React.useState<string | null>(null)
  const reduced = useReducedMotion()
  return (
    <Section id="scene-N-xxx" scene="N" tone="dark">
      <SectionHeading
        eyebrow="SCENE N"
        h2={<>Verbatim H2 from content pack</>}
        lead="Verbatim lead from content pack"
      />
      {/* the scene's 3D set-piece + semantic HTML */}
      <CtaButton href="#growth-score" variant="primary">Build My Performance Strategy →</CtaButton>
      <SidePanel open={open === 'xxx'} onClose={() => setOpen(null)} title="Xxx" accent="#2E4BFE">
        {/* detail copy */}
      </SidePanel>
    </Section>
  )
}
```

## 7. Don't do these

- Don't `bun run build`. Don't `bun run dev` (it's already running on port 3000 in the background — just save files and they hot-reload).
- Don't install new packages. Use what's in package.json (framer-motion, lucide-react, shadcn/ui, etc.).
- Don't edit `globals.css`, `layout.tsx`, `page.tsx`, `brand.tsx`, `ui.tsx`, `hooks.tsx`, `infinity-ribbon.tsx`, `progress-rail.tsx`, `site-header.tsx`, `site-footer.tsx`, `ignition-loader.tsx` — they're already final.
- Don't create new routes under `src/app/`. Everything is `/`.
- Don't import `z-ai-web-dev-sdk` in client components — backend only.
- Don't use `next/image` for local SVGs — use `<img>` or inline `<svg>`.
- Don't fabricate case study results, testimonials, or client logos.
- Don't use indigo or blue as primary brand color — the brand palette above is the only palette.

## 8. When you finish

1. Run `bun run lint` from `/home/z/my-project` and fix any errors in your files. Warnings are OK.
2. Append a section to `/home/z/my-project/worklog.md` (APPEND, do not overwrite) using this template:
   ```
   ---
   Task ID: <your task id>
   Agent: <subagent A | B | C>
   Task: <one-line summary>

   Work Log:
   - <step 1>
   - <step 2>
   - ...

   Stage Summary:
   - Files created: <list>
   - Decisions: <anything important>
   - Open issues / handoffs: <if any>
   ```
3. Return a short final message listing the files you created and any blockers.

## 9. Your assignment

See your dispatch prompt for the specific scene files you must build and the exact content pack sections to extract copy from.
