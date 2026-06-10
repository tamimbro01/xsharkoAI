const websiteModel = require('../models/website.models');

const User = require("../models/user.models")

const generateResponse = require('../../config/openRouter.config')
const extractJson = require('../../utils/extractJson.utils');


const masterPrompt = `### ROLE
You are "NEXUS" — a world-class Frontend Architect and Creative Director. You build stunning, production-ready web experiences using only raw HTML, CSS, and Vanilla JS. Be decisive. Implement immediately. No options offered.

TARGET: Websites comparable to Awwwards, Apple, Stripe, Linear, Vercel, and Framer in elegance, usability, and performance.

OUTPUT MUST BE CLIENT-DELIVERABLE WITHOUT MODIFICATION.

❌ NO Tailwind, Bootstrap, React, jQuery, or any external library/CDN
❌ NO lorem ipsum or generic copy — all content must be industry-specific
❌ NO dead UI — every element must be interactive or purposeful

--------------------------------------------------
USER REQUIREMENT:
"\${USER_PROMPT}"
--------------------------------------------------

CONTENT
--------------------------------------------------
From USER_PROMPT, infer the business type and generate:
- Realistic company name, services, and value propositions
- Industry-specific copywriting and CTAs
Never write: "Welcome to our website" / "We provide quality services"

DESIGN — MODERN & VIBRANT
--------------------------------------------------
- Colors: Choose a vibrant, modern color scheme based on industry:
  * Tech/SaaS: Vibrant blues (#0066FF, #00D4FF) + Purple accents (#8B5CF6)
  * Creative/Agency: Bold gradients (Pink #FF006E to Orange #FF8500)
  * E-commerce: Warm colors (Coral #FF6B6B, Teal #4ECDC4, Gold #FFD93D)
  * Finance: Professional blues (#1E40AF) + Green (#10B981)
  * Healthcare: Calming blues (#3B82F6) + Mint (#6EE7B7)
  * Food/Restaurant: Appetizing reds (#EF4444) + Orange (#F59E0B)
  * NEVER use plain black/white only — always use rich, engaging colors
- All colors, spacing, and transitions defined as :root CSS variables
- Typography: Use modern font combinations with personality:
  * Headings: Poppins, Montserrat, Space Grotesk, or Clash Display (bold 600-800)
  * Body: Inter, DM Sans, or IBM Plex Sans (regular 400-500)
  * Use clamp() for all font sizes: clamp(1.5rem, 4vw, 3.5rem) for h1
  * Apply letter-spacing: -0.02em for headings, line-height: 1.6 for body
- Animations: cubic-bezier(0.4, 0, 0.2, 1) on all interactions; staggered entrance on load; backdrop-filter: blur(20px) on overlays
- Layout: CSS Grid + Flexbox, min 80px vertical section padding, balanced whitespace
- Gradients: Use modern gradients liberally (linear-gradient, radial-gradient) for backgrounds and accents
- Icons: Inline SVG only — colorful, with smooth transitions on hover

MOTION RULES
--------------------------------------------------
- Animations enhance UX only — no distracting or infinite loops
- Max animation duration: 800ms
- Always include: @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }

RESPONSIVE — NON-NEGOTIABLE
--------------------------------------------------
Mobile-first. Breakpoints: <768px | 768–1024px | >1024px
✔ Relative units only — %, rem, vw, vh, clamp()
✔ Navbar: hamburger menu on mobile with aria-expanded
✔ Multi-column → single-column on mobile
✔ ZERO horizontal scroll on any screen
✔ Min 44×44px tap targets on mobile

IMAGES
--------------------------------------------------
- Use MULTIPLE high-quality images throughout the site (minimum 3-5 images)
- Unsplash only: https://images.unsplash.com/photo-[relevant-id]?auto=format&fit=crop&w=1200&q=80
- Strategic placement:
  * Hero section: Large, impactful image (1920x1080 minimum)
  * About section: Team or workspace images
  * Services/Features: Relevant industry images for each service
  * Testimonials: Professional headshots (if applicable)
  * Gallery/Portfolio: Multiple showcase images (if relevant)
- Every <img>: loading="lazy" decoding="async" width height alt="" with descriptive alt text
- Wrap in overflow:hidden containers; apply object-fit:cover
- Add subtle hover effects: transform: scale(1.05) with smooth transition
- IMPORTANT: Choose images that match the industry and enhance the visual appeal

SEO
--------------------------------------------------
In <head>:
- <title> 50–60 chars, industry-specific
- <meta name="description"> 150–160 chars
- Open Graph: og:title, og:description, og:type, og:image
- Twitter Card: twitter:card, twitter:title, twitter:description, twitter:image
- <link rel="canonical" href="https://yourdomain.com/">
- One H1 per page; H2 for sections; H3 for sub-items
- <script type="application/ld+json"> with relevant structured data

ACCESSIBILITY — WCAG 2.2 AA
--------------------------------------------------
- Full keyboard navigation (Tab, Enter, Escape)
- Visible :focus-visible states on all interactive elements
- aria-label on icon-only buttons; aria-current="page" on active nav
- Min contrast: 4.5:1 body text, 3:1 large text
- Semantic landmarks: <header> <main> <nav> <footer> <section>

PERFORMANCE
--------------------------------------------------
- Lighthouse target: Performance 95+, Accessibility 95+, SEO 95+
- JS under 100KB; cache DOM refs; use event delegation
- No CLS — set explicit width+height on all images
- No memory leaks; batch DOM reads before writes
- No expensive ops in scroll/resize handlers — use requestAnimationFrame

SPA ARCHITECTURE
--------------------------------------------------
- One HTML file: exactly one <style>, one <script>, no external files
- Pages: Home, About, Services, Contact
- Vanilla JS SPA routing — zero page reloads, smooth transitions
- CRITICAL: .page { display:none } → .page.active { display:block } — Home MUST be visible on load
- All logic (routing, forms, nav state) in ONE JS Class or Object — zero global scope pollution
- aria-current="page" on active nav item at all times
- Contact form: client-side validation, visible error messages, no empty submit

TECHNICAL
--------------------------------------------------
- iframe srcdoc compatible
- Starts: <!DOCTYPE html> — Ends: </html>
- CSS order: :root → reset → base → layout → components → pages → animations → media queries
- All JS at end of <body>
- No inline onclick="" handlers — use addEventListener only

SELF-CHECK (fix before output)
--------------------------------------------------
1. ✅ Renders on mobile, tablet, desktop — zero horizontal scroll
2. ✅ Home visible on load without any interaction
3. ✅ All images: lazy + async + width + height + alt + correct Unsplash URL
4. ✅ All CSS vars in :root; zero external dependencies
5. ✅ SEO tags + JSON-LD in <head>
6. ✅ WCAG AA: focus states, aria attrs, contrast, keyboard nav
7. ✅ prefers-reduced-motion implemented; no animation > 800ms
8. ✅ Semantic HTML5; no div soup; no generic copy
9. ✅ Contact form validates; all JS in Class/Object

OUTPUT — RAW JSON ONLY
--------------------------------------------------
Return ONLY this structure. No backticks, no markdown, no text outside JSON:

{
  "message": "One sentence confirming the build.",
  "code": "<FULL HTML DOCUMENT <!DOCTYPE html> TO </html>>"
}

Any character outside this JSON = INVALID response.`;







const generateWebsite = async (req, res) => {
    try {

        const { prompt } = req.body;

        if (!prompt) {
            return res.status(401).json({
                success: false,
                message: "No prompt provided"
            })
        }
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Not Found User ",
            })
        }
        if (user.credits < 10) {
            return res.status(400).json({
                success: false,
                message: "You dont have enough credits to create website",
            })
        }
        const finalPrompt = masterPrompt.replace("${USER_PROMPT}", prompt);
        let raw = '';
        let parsed = null;
        for (let i = 0; i < 2 && !parsed; i++) {
            raw = await generateResponse(finalPrompt)
            parsed = extractJson(raw);
            if (!parsed) {
                raw = await generateResponse(finalPrompt + " \n\nRETURN ONLY RAW JSON");

                parsed = extractJson(raw);
            }
        }
        if (!parsed.code) {
            return res.status(400).json({
                success: false,
                message: "Failed to generate website",
            })
        }
        const website = await websiteModel.create({
            user: user._id,
            title: prompt.slice(0, 100),

            latestCode: parsed.code,

            conversation: [{
                role: "user",
                content: prompt
            },
            {
                role: "ai",
                content: parsed.message
            }]
        })
        user.credits = user.credits - 10;
        await user.save();
        return res.status(201).json({
            success: true,
            websiteId: website._id,
            reamingCredit: user.credits,
            message: "Website Generated Successfully",
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}




const getAllWebsites = async (req, res) => {
    try {
        const websites = await websiteModel.find({
            user: req.user._id,
        });

        if (!websites) {
            return res.status(400).json({
                success: false,
                message: "No websites found",
            })
        }
        return res.status(200).json({
            success: true,
            websites,
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}




const getWebsiteById = async (req, res) => {
    try {
        const website = await websiteModel.findOne({
            _id: req.params.id,
            user: req.user._id
        })

        if (!website) {
            return res.status(400).json({
                success: false,
                message: "No website found",
            })
        }
        return res.status(200).json({
            success: true,
            website,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}




const changeWebsite = async (req, res) => {
    try {
        console.log('Update request received:', req.params.id);
        const { prompt } = req.body;
        console.log('User prompt:', prompt);

        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: "No prompt provided",
            })
        }

        const website = await websiteModel.findOne({
            _id: req.params.id,
            user: req.user._id
        })

        console.log('Website found:', website ? 'Yes' : 'No');

        if (!website) {
            return res.status(400).json({
                success: false,
                message: "No website found",
            })


        }
        const user = await User.findById(req.user._id)
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            })
        }
        if (user.credits < 5) {
            return res.status(400).json({
                success: false,
                message: "Not enough credits",
            })
        }

        console.log('Calling AI API...');

        const updatePrompt = `### ROLE
You are "NEXUS" — continuing work on an existing project. Do NOT rebuild from scratch. Apply ONLY the requested changes surgically to the existing code.

EXISTING CODE:
${website.latestCode}

UPDATE INSTRUCTION:
"${prompt}"

--------------------------------------------------
UPDATE RULES
--------------------------------------------------
- Apply ONLY what the user asked — do not touch unrelated sections
- Maintain exact same design system: same colors, fonts, spacing from existing code
- Maintain same JavaScript structure — extend it, do not rewrite it
- Maintain all existing SEO, aria, and accessibility attributes
- If adding a new page — follow same SPA pattern, add to nav, keep all existing pages intact
- If updating a component — keep surrounding code unchanged

SELF-CHECK before output:
1. ✅ Only requested changes applied — nothing else broken
2. ✅ Design consistency maintained (colors, fonts, spacing)
3. ✅ SPA routing still works — all pages still accessible
4. ✅ Zero horizontal scroll still maintained
5. ✅ All previous SEO + accessibility preserved

OUTPUT — RAW JSON ONLY
--------------------------------------------------
{
  "message": "One sentence describing what was updated.",
  "code": "<FULL UPDATED HTML DOCUMENT>"
}

Any character outside this JSON = INVALID.`;

        let raw = '';
        let parsed = null;
        for (let i = 0; i < 2 && !parsed; i++) {
            raw = await generateResponse(updatePrompt)
            parsed = extractJson(raw);

            if (!parsed) {
                raw = await generateResponse(updatePrompt + " \n\nRETURN ONLY RAW JSON");

                parsed = extractJson(raw);
            }

        }
        console.log('AI response received, parsing...');

        if (!parsed.code) {
            console.log('Failed: No code in parsed response');
            return res.status(400).json({
                success: false,
                message: "Failed to generate website",
            })
        }
        console.log('Update successful, saving to database...');
        website.conversation.push(
            { role: "user", content: prompt },
            { role: "ai", content: parsed.message }
        )
        website.latestCode = parsed.code;
        await website.save();
        user.credits = user.credits - 5;
        await user.save();
        console.log('Database updated, sending response');
        return res.status(200).json({
            success: true,
            message: parsed.message,
            code: parsed.code,
            reamingCredit: user.credits,

        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}




const deployWebsite = async (req, res) => {
    try {

        const website = await websiteModel.findOne({
            _id: req.params.id,
            user: req.user._id
        })


        if (!website) {
            return res.status(400).json({
                success: false,
                message: "No website found",
            })
        }





        if (!website.slug) {
            const baseSlug = website.title
                .toLowerCase()
                .replace(/[^a-z0-9\s]/g, '')
                .trim()
                .split(/\s+/)
                .slice(0, 5)
                .join('-');

            website.slug = `${baseSlug}-${website._id.toString().slice(-8)}`;
        }

        website.deployed = true;
        website.deploymentUrl = `${process.env.FRONTEND_URL}site/${website.slug}`

        await website.save();

        return res.status(200).json({
            success: true,
            message: "Website deployed successfully",
            deploymentUrl: website.deploymentUrl,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}



const getBySlug = async (req, res) => {
    try {
        const website = await websiteModel.findOne({
            slug: req.params.slug,
        })

        if (!website) {
            return res.status(400).json({
                success: false,
                message: "No website found",
            })
        }


        return res.status(200).json({
            success: true,
            website,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}




module.exports = { generateWebsite, getAllWebsites, getWebsiteById, changeWebsite, deployWebsite, getBySlug };
