# Muneeb — Portfolio

A world-class, production-ready personal portfolio for **Muneeb**, a Berlin-based business student, content creator, and marketer. Built to feel premium, cinematic, and unlike any common template — inspired by Apple, Stripe, Linear, Vercel, and Arc.

## ✨ Highlights

- **Cinematic hero** with masked word-reveal headline, mouse-reactive gradient glow, and a 3D-tilt portrait card
- **Animated experience timeline** with a scroll-driven progress line
- **Filterable skill cards** with spotlight hover effects
- **Languages** with animated proficiency bars
- **Contact** section with copy-to-clipboard cards
- **Premium UX**: animated page loader, custom dual-ring cursor, glass navigation with active-link highlighting, scroll progress bar, back-to-top, magnetic buttons
- **Ambient background**: animated gradient blobs, faint grid, floating particles, and a noise texture
- **Dark mode by default** with a light-mode toggle (persisted to `localStorage`)
- **Lenis** smooth scrolling with full `prefers-reduced-motion` support
- **Accessible**: semantic HTML, skip link, ARIA labels, visible focus states, keyboard-friendly
- **SEO-ready**: meta tags, Open Graph, Twitter cards, JSON-LD, `manifest.webmanifest`, `robots.txt`, `sitemap.xml`, SVG favicon

## 🧰 Tech Stack

React 19 · Vite 6 · Tailwind CSS v4 · Framer Motion · Lenis · Lucide Icons

## 🚀 Getting Started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build
npm run lint     # lint the project
```

## 🖼️ Profile Photo

The hero shows a gradient placeholder until you add a real photo. Drop your image at:

```
public/muneeb.jpg
```

It will automatically replace the placeholder.

## 📁 Structure

```
src/
├── animations/    # shared Framer Motion variants
├── components/    # reusable UI + premium UX (cursor, loader, navbar, …)
│   └── ui/        # primitives (MagneticButton, Reveal, TextReveal, …)
├── constants/     # site config & navigation
├── context/       # ThemeProvider (dark/light)
├── data/          # experience, skills, languages content
├── hooks/         # useLenis, useActiveSection, useMousePosition, …
├── layouts/       # MainLayout (chrome around the page)
├── sections/      # Hero, About, Experience, Skills, Languages, Contact, Footer
└── utils/         # cn() class merge helper
```

## 🎨 Customizing

- **Content**: edit files in `src/data/` and `src/constants/site.js`
- **Colors / fonts / tokens**: `src/index.css` (`@theme` block + CSS variables)
- **SEO / meta**: `index.html`

## ♿ Accessibility & Performance

- Lazy-loaded, code-split sections
- GPU-accelerated transforms only
- `prefers-reduced-motion` disables animations and smooth scroll
- Semantic landmarks, skip-to-content link, and focus-visible outlines

---

Built with care in Berlin.
