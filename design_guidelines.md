{
  "project": {
    "name": "Lighthouse Insurance, Inc. Website Redesign",
    "type": "marketing_site_local_business_with_blog_cms",
    "brand_attributes": [
      "professional",
      "trustworthy",
      "local",
      "conversion-focused",
      "fast/SEO-first"
    ],
    "notes": [
      "Match existing look: navy primary #1f3549, light theme with navy accents.",
      "No heavy animations/3D; prioritize Core Web Vitals (no CLS, minimal JS).",
      "All interactive + key informational elements MUST include data-testid (kebab-case, role-based).",
      "Codebase uses .js (not .tsx)."
    ]
  },

  "design_personality": {
    "style_fusion": {
      "base": "Clean local-services aesthetic (insurance/financial)",
      "layout_principle": "Swiss-style hierarchy + generous whitespace + clear typographic grid",
      "component_language": "Soft-elevated cards (subtle shadow), crisp borders, navy ink headings",
      "conversion_pattern": "Sticky mobile click-to-call + persistent quote CTA + trust strip near forms"
    },
    "do_not": [
      "Do not center-align the entire app container.",
      "Do not use universal transitions (no transition: all).",
      "Do not use saturated/dark gradients; keep gradients mild and limited to decorative section backgrounds (<20% viewport)."
    ]
  },

  "typography": {
    "font_pairing": {
      "heading": {
        "family": "Space Grotesk",
        "fallback": "ui-sans-serif, system-ui",
        "usage": "H1–H3, nav labels, card titles"
      },
      "body": {
        "family": "Inter",
        "fallback": "ui-sans-serif, system-ui",
        "usage": "paragraphs, forms, long blog reading"
      }
    },
    "implementation": {
      "google_fonts": [
        "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap"
      ],
      "css_notes": [
        "Set body font to Inter; headings use Space Grotesk via utility classes (font-[family]).",
        "Keep blog reading line-length ~65–75ch for comfort."
      ]
    },
    "type_scale_tailwind": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight",
      "h2": "text-base md:text-lg font-medium text-muted-foreground",
      "section_title": "text-2xl sm:text-3xl font-semibold tracking-tight",
      "card_title": "text-lg font-semibold",
      "body": "text-sm sm:text-base leading-relaxed",
      "small": "text-xs sm:text-sm text-muted-foreground"
    }
  },

  "color_system": {
    "brand": {
      "navy": "#1f3549",
      "navy_ink": "#162838",
      "navy_soft": "#2b4761"
    },
    "neutrals": {
      "paper": "#fbfbfa",
      "surface": "#ffffff",
      "surface_2": "#f4f6f8",
      "border": "#e3e8ee",
      "text": "#0f172a",
      "muted_text": "#475569"
    },
    "accents": {
      "cta": "#0ea5a4",
      "cta_hover": "#0b8b8a",
      "highlight": "#f59e0b",
      "success": "#16a34a",
      "danger": "#dc2626"
    },
    "allowed_gradients": {
      "usage_rules": [
        "Gradients only as section background accents or decorative overlays.",
        "Never exceed 20% of viewport.",
        "Never apply to text-heavy reading areas or small UI elements (<100px)."
      ],
      "examples": [
        "radial-gradient(900px circle at 10% 10%, rgba(14,165,164,0.14), transparent 55%)",
        "radial-gradient(700px circle at 90% 0%, rgba(245,158,11,0.12), transparent 50%)"
      ]
    },
    "design_tokens_css": {
      "file": "/app/frontend/src/index.css",
      "tokens": {
        "--background": "0 0% 100%",
        "--foreground": "222.2 84% 4.9%",
        "--card": "0 0% 100%",
        "--card-foreground": "222.2 84% 4.9%",
        "--popover": "0 0% 100%",
        "--popover-foreground": "222.2 84% 4.9%",
        "--primary": "210 40% 20%",
        "--primary-foreground": "0 0% 98%",
        "--secondary": "210 20% 96%",
        "--secondary-foreground": "210 40% 20%",
        "--muted": "210 20% 96%",
        "--muted-foreground": "215 16% 35%",
        "--accent": "182 84% 35%",
        "--accent-foreground": "0 0% 98%",
        "--border": "214 20% 90%",
        "--input": "214 20% 90%",
        "--ring": "182 84% 35%",
        "--radius": "0.75rem"
      },
      "notes": [
        "Map --primary to Lighthouse navy (#1f3549).",
        "Map --accent to teal CTA for modern, non-purple insurance feel.",
        "Keep cards white; use navy for headings and nav."
      ]
    }
  },

  "layout_and_grid": {
    "container": {
      "max_width": "max-w-6xl",
      "padding": "px-4 sm:px-6 lg:px-8",
      "section_spacing": "py-12 sm:py-16",
      "vertical_rhythm": "space-y-6 sm:space-y-8"
    },
    "page_templates": {
      "marketing_pages": "Hero (CTA + trust) → Services grid → Proof (reviews) → FAQ (where relevant) → Final CTA",
      "pillar_pages": "Hero (industry-specific) → Coverage breakdown → Requirements/FAQ → Reviews → Quote CTA",
      "blog_post": "Breadcrumb → Title/meta → TOC (optional) → Article (65–75ch) → FAQ accordion → CTA strip",
      "admin": "App-shell layout: left rail (desktop) / drawer (mobile) + table list + editor"
    }
  },

  "components": {
    "component_path": {
      "shadcn_primary": "/app/frontend/src/components/ui",
      "use_components": [
        {
          "name": "NavigationMenu",
          "path": "navigation-menu.jsx",
          "use": "Top nav with Commercial Insurance dropdown"
        },
        {
          "name": "DropdownMenu",
          "path": "dropdown-menu.jsx",
          "use": "Mobile overflow actions / admin user menu"
        },
        {
          "name": "Button",
          "path": "button.jsx",
          "use": "Primary CTA (Get a Quote), click-to-call"
        },
        {
          "name": "Card",
          "path": "card.jsx",
          "use": "Service highlight cards, review cards"
        },
        {
          "name": "Accordion",
          "path": "accordion.jsx",
          "use": "Trucking/Cargo/Owner-Operator FAQ + coverage Q&A"
        },
        {
          "name": "Tabs",
          "path": "tabs.jsx",
          "use": "Coverage breakdown (e.g., Liability/Cargo/Physical Damage)"
        },
        {
          "name": "Form + Input + Textarea + Label",
          "path": "form.jsx, input.jsx, textarea.jsx, label.jsx",
          "use": "Quote form + contact form"
        },
        {
          "name": "Badge",
          "path": "badge.jsx",
          "use": "Trust chips (4.9 rating, 20+ years, Sunrise FL)"
        },
        {
          "name": "Breadcrumb",
          "path": "breadcrumb.jsx",
          "use": "Blog post + service pages for SEO + UX"
        },
        {
          "name": "Table",
          "path": "table.jsx",
          "use": "Admin post list"
        },
        {
          "name": "Dialog / Sheet",
          "path": "dialog.jsx, sheet.jsx",
          "use": "Confirm publish, mobile nav drawer"
        },
        {
          "name": "Pagination",
          "path": "pagination.jsx",
          "use": "Blog list pagination"
        },
        {
          "name": "Sonner",
          "path": "sonner.jsx",
          "use": "Toasts for admin save/publish"
        }
      ]
    },

    "header_nav": {
      "desktop_structure": [
        "Logo left (navy wordmark)",
        "Primary links: Home, About, Services, Trucking, Reviews, Blog, Contact",
        "Commercial dropdown: Commercial Auto, Trucking, Cargo, Owner-Operator, Fleet",
        "Right side: click-to-call button + Get a Quote button"
      ],
      "mobile_structure": [
        "Top bar with logo + phone icon button",
        "Hamburger opens Sheet with nav + big click-to-call + quote CTA"
      ],
      "sticky_behavior": {
        "rule": "Sticky header with subtle border + backdrop blur; avoid heavy shadows",
        "tailwind": "sticky top-0 z-50 bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b"
      }
    },

    "buttons": {
      "style": "Professional/Corporate with slight softness",
      "tokens": {
        "radius": "rounded-xl",
        "primary": "bg-[color:var(--brand-navy)] text-white hover:bg-[#162838] focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]",
        "cta": "bg-[#0ea5a4] text-white hover:bg-[#0b8b8a]",
        "secondary": "bg-white border border-slate-200 text-slate-900 hover:bg-slate-50",
        "ghost": "bg-transparent hover:bg-slate-100"
      },
      "micro_interactions": [
        "Use transition-colors duration-150 on hover/focus (no transition-all).",
        "Active press: active:scale-[0.98] only on buttons (not global)."
      ]
    },

    "cards": {
      "service_card": {
        "layout": "Icon + title + 2-line description + 2 links (Learn more, Get quote)",
        "tailwind": "rounded-2xl border border-slate-200 bg-white shadow-[0_1px_0_rgba(15,23,42,0.04)] hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-shadow duration-200",
        "icon_style": "Use lucide-react icons in a navy-tinted chip: bg-slate-50 border border-slate-200"
      },
      "review_card": {
        "tailwind": "rounded-2xl border bg-white p-6",
        "content": "Stars row + quote + reviewer name + location"
      }
    },

    "forms": {
      "quote_form": {
        "pattern": "Short, 6–8 fields max; progressive disclosure for trucking pages (stepper-like sections)",
        "fields": [
          "Name",
          "Phone",
          "Email",
          "Insurance type (select)",
          "ZIP",
          "Message"
        ],
        "ui": {
          "inputs": "h-11 rounded-xl",
          "helper_text": "text-xs text-slate-500",
          "error_text": "text-sm text-red-600"
        },
        "conversion": [
          "Place phone CTA adjacent to submit on desktop; stacked on mobile.",
          "Add reassurance line under submit: 'Fast quotes. No obligation.'"
        ]
      },
      "admin_editor": {
        "pattern": "Title, slug, excerpt, cover image URL, content (markdown/textarea), status (draft/published)",
        "use": "Textarea + Tabs (Write/Preview) optional"
      }
    },

    "faq": {
      "component": "Accordion",
      "rules": [
        "Entire header row clickable.",
        "Allow multiple open items for comparison.",
        "Use clear, plain-English questions; keep answers scannable with bullets.",
        "Add FAQ schema in backend rendering layer (or JSON-LD injection) for pillar pages and blog posts with FAQ sections."
      ],
      "motion": "Accordion open/close uses built-in shadcn transitions; keep duration ~200–250ms"
    },

    "blog_reading_experience": {
      "article_container": "max-w-[75ch]",
      "typography_classes": "prose prose-slate max-w-none prose-headings:font-[Space_Grotesk] prose-a:text-[#0ea5a4] hover:prose-a:text-[#0b8b8a] prose-a:underline-offset-4",
      "notes": [
        "Use a sticky 'Call (954) 584-3417' mini-CTA at bottom on mobile for blog posts.",
        "Add a 'Related services' card rail after article (Trucking/Cargo/Owner-Operator)."
      ]
    },

    "footer": {
      "structure": [
        "NAP block (name, address, phone) for local SEO",
        "Hours",
        "Services links",
        "Trucking links",
        "Small legal line"
      ],
      "tailwind": "border-t bg-white",
      "local_seo": "Ensure NAP is plain text (not only images) and consistent across pages"
    }
  },

  "motion_and_microinteractions": {
    "principles": [
      "Motion should clarify hierarchy, not entertain.",
      "Prefer opacity/translate entrance on scroll only for hero/supporting sections; keep minimal to protect performance."
    ],
    "recommended": {
      "library": "framer-motion (optional)",
      "usage": [
        "Hero trust strip fade-in",
        "Service cards stagger (small translate-y-2 + opacity)"
      ],
      "fallback": "If not using framer-motion, use CSS-only: motion-safe:animate-in + duration utilities"
    },
    "avoid": [
      "Parallax heavy effects",
      "Video backgrounds unless optimized and optional (poster image first)"
    ]
  },

  "seo_and_content_ui": {
    "local_seo_blocks": [
      "Header and Contact page must show phone number as tel: link",
      "Footer NAP + embedded map section on Contact",
      "Reviews page: aggregate rating + review count"
    ],
    "schema_targets": [
      "LocalBusiness (sitewide)",
      "FAQPage (trucking/cargo/owner-operator pages + blog FAQ sections)",
      "BlogPosting (blog detail)",
      "BreadcrumbList (blog + services)"
    ],
    "internal_linking_ui": [
      "On trucking pillar pages, include a 'Related coverages' grid linking to Cargo + Owner-Operator",
      "Blog posts include 'Get a quote' CTA and link to relevant service pages"
    ]
  },

  "image_urls": {
    "status": "MOCKED",
    "reason": "image_selector_tool provider unavailable in this environment",
    "placeholders": [
      {
        "category": "hero_home",
        "description": "Local office/team photo or friendly agent consultation",
        "url": "https://images.unsplash.com/photo-1521791136064-7986c2920216"
      },
      {
        "category": "hero_trucking",
        "description": "Professional trucking highway image (sunrise/Florida vibe)",
        "url": "https://images.unsplash.com/photo-1503376780353-7e6692767b70"
      },
      {
        "category": "about_team",
        "description": "Founder/agent portrait style image",
        "url": "https://images.unsplash.com/photo-1556157382-97eda2d62296"
      }
    ],
    "implementation_notes": [
      "Use <img loading='lazy'> for below-the-fold images.",
      "Always set width/height or aspect-ratio to prevent CLS.",
      "Prefer WebP/AVIF where possible; compress aggressively."
    ]
  },

  "accessibility": {
    "requirements": [
      "WCAG AA contrast for text and interactive elements",
      "Visible focus rings (use ring color tied to --ring teal)",
      "Touch targets >= 44px height",
      "Accordion and menus must be keyboard navigable (shadcn defaults help)"
    ]
  },

  "testing_attributes": {
    "rule": "All interactive and key informational elements MUST include data-testid",
    "examples": [
      "data-testid='header-click-to-call-button'",
      "data-testid='header-get-quote-button'",
      "data-testid='services-trucking-card'",
      "data-testid='reviews-google-rating'",
      "data-testid='contact-quote-form-submit-button'",
      "data-testid='blog-post-title'",
      "data-testid='admin-post-publish-button'"
    ]
  },

  "instructions_to_main_agent": [
    "Replace default CRA App.css styles; remove dark App-header and spinning logo styles.",
    "Update /app/frontend/src/index.css :root tokens to match navy/teal system above; keep light theme.",
    "Implement header using shadcn NavigationMenu + Sheet for mobile; include click-to-call tel: link prominently.",
    "Use Card grid for services; include new trucking/cargo/owner-operator/fleet cards on Home + Services.",
    "Trucking/Cargo/Owner-Operator pages: include Coverage breakdown (Tabs or Card grid) + FAQ Accordion + final CTA.",
    "Blog: implement list + detail pages with readable typography (75ch), Breadcrumb, and FAQ section.",
    "Admin: password-protected route; use Table for post list; use Form components; use Sonner for save/publish feedback.",
    "Ensure every button/input/link that matters has data-testid.",
    "Keep animations minimal; only transition-colors/shadow; avoid layout-shifting effects."
  ]
}

<General UI UX Design Guidelines>  
    - You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms
    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text
   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json

 **GRADIENT RESTRICTION RULE**
NEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc
NEVER use dark gradients for logo, testimonial, footer etc
NEVER let gradients cover more than 20% of the viewport.
NEVER apply gradients to text-heavy content or reading areas.
NEVER use gradients on small UI elements (<100px width).
NEVER stack multiple gradient layers in the same viewport.

**ENFORCEMENT RULE:**
    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors

**How and where to use:**
   • Section backgrounds (not content backgrounds)
   • Hero section header content. Eg: dark to light to dark color
   • Decorative overlays and accent elements only
   • Hero section with 2-3 mild color
   • Gradients creation can be done for any angle say horizontal, vertical or diagonal

- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**

</Font Guidelines>

- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. 
   
- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.

- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.
   
- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly
    Eg: - if it implies playful/energetic, choose a colorful scheme
           - if it implies monochrome/minimal, choose a black–white/neutral scheme

**Component Reuse:**
	- Prioritize using pre-existing components from src/components/ui when applicable
	- Create new components that match the style and conventions of existing components when needed
	- Examine existing components to understand the project's component patterns before creating new ones

**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component

**Best Practices:**
	- Use Shadcn/UI as the primary component library for consistency and accessibility
	- Import path: ./components/[component-name]

**Export Conventions:**
	- Components MUST use named exports (export const ComponentName = ...)
	- Pages MUST use default exports (export default function PageName() {...})

**Toasts:**
  - Use `sonner` for toasts"
  - Sonner component are located in `/app/src/components/ui/sonner.tsx`

Use 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals.
</General UI UX Design Guidelines>
