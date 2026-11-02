# erongo.net

The Erongo Software website -- a **single-page static site** plus the project
scoping wizard and the legal pages, in the site-oms design language
(IBM-Carbon-inspired: Inter, 2px radii, flat surfaces, `#2563eb` accent in
light mode, `#3b82f6` in dark). Positioning is **Forward Deployed Engineering
& Systems Integration**, with applied AI as the standout.

The theme follows the visitor's system colour preference
(`prefers-color-scheme`) until they pick one with the toggle; the choice
persists to `localStorage`.

## What's here

| File | Purpose |
|------|---------|
| `index.html` | The single page: hero, Development, Process, Engagements, Delivery, CTA |
| `scope.html` | "Scope Your Project" wizard -- interactive project-scoping tool served at `/scope` (canonical) and `/scope.html` |
| `privacy.html` | Privacy Policy (PoPI) -- served at `/privacy` (canonical) and `/privacy.html` |
| `terms.html` | Terms of Use (CPA plain-language) -- served at `/terms` (canonical) and `/terms.html` |
| `style.css` | Design tokens + all components (page + wizard) |
| `app.js` | Mobile nav, scroll-spy, reveal-on-scroll, footer year |
| `theme.js` | Theme toggle (follows `prefers-color-scheme` until the user picks; persists to `localStorage`) |
| `img/` | OG card (SVG + PNG), favicons, web-manifest icons |
| `sitemap.xml` | `/` + `/scope` + `/privacy` + `/terms` |
| `robots.txt`, `CNAME` | Crawl rules; apex-domain record (not deployed by the role) |

## Legal pages

`privacy.html` and `terms.html` are the canonical legal documents for all
erongo properties (erongo.net, the service sites, and the SaaS products);
the service-site footers link here with absolute URLs. They are plain
static HTML in the house design language (`.legal-doc` styles in
`style.css`). Erongo Software, Walvis Bay, Namibia.

## Page sections (single page)

1. **Hero** -- "Wiring AI & automation into the systems you already run", CTA to book a 15-minute call or run the scope wizard
2. **Development** (`#development`) -- the four services: Technical Consultation, Software Delivery, Integrations and APIs, Automation and Applied ML/AI
3. **Process** (`#process`) -- Plan / Build / Connect / Automate
4. **Engagements** (`#engagements`) -- the A-F typical-investment bands as a budget sense-check
5. **Delivery** (`#delivery`) -- the milestone pipeline (scope & agree, code in your repo, live milestone demo, handover & warranty) plus the fair-terms guardrails
6. **CTA** -- book a call or scope it yourself; written scope, timeline, and cost within 2-4 business days of the meeting

The wizard (`/scope`) estimates a complexity tier, delivery duration, and a
published investment range. The ranges are a static matrix by tier, client
origin, and urgency shipped in the page; the internal rate card is not
included in the client-side code.

## Deployment

Served by the central Nginx on e1 -- see **runbook 023**
(`runbooks/023-web-site.md`).

The deploy artifact is the vendored copy in the runbooks repo:
`runbooks/ansible/roles/quadlet/files/site/www/`. After changes here:

```bash
cd ~/Projects/erongo/runbooks/ansible/roles/quadlet/files/site/www
cp ~/Projects/Erongo/web-site/{index.html,scope.html,privacy.html,terms.html,style.css,theme.js,app.js,sitemap.xml,robots.txt} .
cp ~/Projects/Erongo/web-site/img/{favicon.ico,favicon.svg,favicon-96x96.png,apple-touch-icon.png,site.webmanifest} .
rsync -a --delete ~/Projects/Erongo/web-site/img/ img/
```

Then deploy:

```bash
cd ~/Projects/erongo/runbooks/ansible
ansible-playbook playbooks/site.yml -i inventory/production -K --skip-tags "tailscale" --tags "site,nginx"
```

Commit the vendored files in the runbooks repo with the site change.
