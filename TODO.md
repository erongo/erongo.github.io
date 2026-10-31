# erongo.net — Redirection tranches

Pivot erongo.net messaging toward **Forward Deployed Engineering + Systems Integration**,
with Applied AI as one capability inside that. Phase it. Track progress here.

## Agreed direction (finalized)
- **Voice:** `we / our` — Erongo Software as the professional face. No "I".
- **Accent:** keep current blue (`#2563eb` family). No sage / neon turquoise.
- **Framing:** broad — operations, integrations, automation, applied AI. Not narrowly "AI".
- **Design:** industrial minimalism already exists (IBM-Carbon, flat, 2px radii, hairlines).
  De-slop = remove abstract orbital / wave parallax shapes; replace with real, authored
  data-flow / architecture diagrams. Zero stock photos, zero AI-generic art.
- **Typography:** keep Inter body; add monospace (JetBrains Mono) for eyebrows, step numbers,
  proof-tags, data points.

## Tranche 1 — Messaging & copy (HTML text only; no design) — DONE
- [x] Head / meta: rewrite `<title>`, `meta description`, `og:*`, `twitter:*`, keywords to new
      positioning (keep "Namibia / worldwide" for local reach).
- [x] JSON-LD `ProfessionalService.description`: drop "plus commercial products such as OMS";
      reframe to operations + integration + applied AI.
- [x] JSON-LD `ProfessionalService.serviceType`: keep; lead with integrations & automation/AI.
- [x] JSON-LD `Person`: `jobTitle` "Software Engineer" → "Forward Deployed Engineer"; refresh
      `description` (14y programming / 7y client + embed-and-map).
- [x] JSON-LD `WebPage` name/description: match new meta.
- [x] Hero eyebrow: "Development & products" → "Forward Deployed Engineering · Systems Integration".
- [x] Hero h1: replace "From business problem to running system." (see options below).
- [x] Hero lede: add the "everyone has AI, few can connect it to real data" beat + embed/map/integrate framing; keep Namibia/worldwide.
- [x] Value statement (#development) h2 + p: reframe to operations/integration.
- [~] Feature cards (4): sharpen bullets toward Connect/Automate; keep the 4 titles.
- [~] Process (#process) Plan/Build/Connect/Automate: skew detail to Connect + Automate; reinforce embed/map/integrate.
- [~] Engagements (#engagements): reframe cost bands with operations/integration language.
- [~] Delivery (#delivery): keep strong (code-in-your-repo, live demos, guards = core FDE accountability); light touch only.
- [~] Past-work callout + experiments framing: light touch.
- [~] CTA band: light touch.
- [x] Nav + footer: update footer brand line; keep all links.
- [x] Removed all em-dashes from client-facing copy (index.html).
- [x] Re-validated JSON-LD `@graph` (5 types) after edits.

## Tranche 2 — Typography accent
- [ ] Add JetBrains Mono (Google Fonts, display=swap; mono fallback stack) in `<head>`.
- [ ] Define `--font-mono` token; apply to `.eyebrow`, `.step-num`, `.proof-tag`, `.card-kicker`,
      `.metric-value`, callout titles. Keep Inter for body.

## Tranche 3 — Visual system (author diagrams from scratch)
- [ ] Author `img/hero-diagram.svg`: subtle data-flow / network motif to replace the solar-system
      hero artwork (low opacity; hero text must stay readable).
- [ ] Author `img/diagram-integration.svg`: real architecture diagram — legacy systems →
      integration/API layer → data / RAG → AI & automation, with a guardrails/security band.
      Place in the Connect / Automate area.
- [ ] Remove abstract parallax bg-shapes (waves, drifting polygons, orbit circles) across sections;
      replace with subtle grid / hairline or the new motifs.
- [ ] Keep blue accent, hairline dividers, flat 2px; no drop-shadow elevation creep.
- [ ] Render-review both diagrams in light + dark themes.

## Notes / constraints
- No test suite / build tooling for this static site.
- Keep JSON-LD valid (`@graph`) after edits; validate with a JSON lint before finishing a tranche.
- Keep semantic HTML, aria labels, and the theme toggle working.
- All changes uncommitted until ready to commit.
