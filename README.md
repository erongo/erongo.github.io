# erongo.net

The Erongo Software website — a **single-page static site** in the site-oms design
language (IBM-Carbon-inspired: Inter, 2px radii, flat surfaces, light-first with a
dark variant, `#2563eb` accent).

## What's here

| File | Purpose |
|------|---------|
| `index.html` | The single page: hero, Development, Process (Plan/Build/Connect/Automate), Products, Past Work, Infrastructure, CTA |
| `scope.html` | "Scope Your Project" wizard — interactive project-scoping tool served at `/scope` (canonical) and `/scope.html` |
| `style.css` | Design tokens + all components (page + wizard) |
| `app.js` | Mobile nav, scroll-spy, reveal-on-scroll, footer year |
| `theme.js` | Theme toggle (respects `prefers-color-scheme`, persists to `localStorage`) |
| `img/` | OG card (SVG + PNG), favicons, PWA manifest icons |
| `sitemap.xml` | `/` + `/scope` |

## Page sections (single page)

1. **Hero** — development-first positioning, CTA to book a call or run the scope wizard
2. **Development** (`#development`) — the four services: Technical Consultation, Software Delivery, Integrations and APIs, Automation and Applied AI
3. **Process** (`#process`) — Plan / Build / Connect / Automate
4. **Products** (`#products`) — OMS (flagship, → oms-platform.net) + unreleased products (redacted)
5. **Past work** (`#work`) — selection of client projects with tech tags
6. **Infrastructure** (`#infrastructure`) — the backend services (api, auth, billing, license, portal, support, dash, git)

Public services (radio, headlines) were dropped with the single-page rewrite — the
radio service was retired in the erongo infra in 2026-09.

## Deployment

Served by the central Nginx on e1 — see **runbook 023** (`runbooks/023-web-site.md`).

The deploy artifact is the vendored copy in
`runbooks/ansible/roles/quadlet/files/site/www/`. After changes here:

```bash
cd runbooks/ansible/roles/quadlet/files/site/www
cp ~/Documents/erongo/web-site/{index.html,scope.html,style.css,theme.js,app.js} .
cp ~/Documents/erongo/web-site/{favicon.ico,favicon.svg,favicon-96x96.png,apple-touch-icon.png,site.webmanifest} .
rsync -a --delete ~/Documents/erongo/web-site/img/ img/
```

Then deploy:

```bash
cd runbooks/ansible
ansible-playbook playbooks/site.yml -i inventory/production --tags "site,nginx"
```

Commit the vendored files in the runbooks repo with the site change.
