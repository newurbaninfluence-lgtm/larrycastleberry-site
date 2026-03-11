# AGENCY RULES: PROJECT-SPECIFIC BRANDING
- STYLE: Always use a high-end "2026" visual aesthetic (Glassmorphism, 3D, GSAP).
- COLORS: Look for a "BRAND_PALETTE" defined in the prompt or TECH_STACK.md. 
- PREVIEW: If I ask for a preview, do not show code. Just say "Pushed to GitHub."

## AGENCY COMMAND SHORTCUTS (Instant Execution)
- !start [Niche]: Initializes Vite + Tailwind + Supabase using the [Niche] style.
- !add-crm: Wires the Lead capture and Admin table.
- !add-blog: Deploys the Markdown editor and Supabase storage.
- !add-chat: Installs the AI Chatbot interface (Anthropic/Gemini).
- !add-pay: Imports the MINI-CHECKOUT logic and Stripe hooks.
- !add-push: Sets up the Web Push API and Admin "Send" button.
- !wizard: Builds the hidden /setup route for one-click API key entry.
- !ship: Runs a final lint check and pushes to GitHub.

## GITHUB AUTOMATION RULES
- CREATION: For every new !start project, automatically run 'gh repo create [NAME] --private' first.
- SYNCING: Every time you finish a code block or a component, push to GitHub immediately.
- EFFICIENCY: NEVER output the full code in chat. Push to GitHub and provide the link. Only show small "snippets" for explanation if I ask.

## PREVIEW AUTOMATION
- COMMAND: !preview
- ACTION: Run 'npm run dev' and 'cloudflared tunnel --url http://localhost:5173' in parallel.
- RULE: Never suggest a Netlify build for quick checks. Always use the Tunnel to save tokens/time.
- OUTPUT: Provide the .trycloudflare.com link to the user immediately.
