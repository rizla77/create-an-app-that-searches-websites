# Deployment Notes

Current check on May 28, 2026:

- `https://www.journeytoonlinesuccess.com/` returns HTTP 200.
- Response header reports `Server: Netlify`.
- Current page title is `Job Skill Planner`.
- This folder is not a Git repository.
- The Netlify CLI is not installed globally on this machine.

## Fastest production deploy

Use Netlify's drag-and-drop deploy:

1. Open the Netlify site for `journeytoonlinesuccess.com`.
2. Go to the site's deploys page.
3. Upload `journey-launch-hub.zip`.
4. Set it as the production deploy if Netlify does not do that automatically.

## WordPress deploy

If `journeytoonlinesuccess.com` is running WordPress or you want to move the launch hub into a WordPress page:

1. In WordPress, go to `Plugins > Add New > Upload Plugin`.
2. Upload `wordpress-plugin/journey-launch-hub.zip`.
3. Activate `Journey Launch Hub`.
4. Create a page and add:

```text
[journey_launch_hub]
```

Use this version when you want WordPress to store leads. Leads appear under `Journey Leads` in the admin menu, and can be exported as CSV.

## Safer staged deploy

If you do not want to replace the current Job Skill Planner yet:

1. Create a new Netlify site from `journey-launch-hub.zip`.
2. Preview the generated Netlify URL.
3. Add the checkout URL with `?pay=ENCODED_CHECKOUT_LINK`.
4. After confirming links and payment, move `journeytoonlinesuccess.com` to the new site or publish this folder to the existing site.

## Checkout setup

Create a checkout for `AI Local Service Revenue Kit` at `$29` using Gumroad, Payhip, Lemon Squeezy, Stripe Payment Links, or another checkout provider.

The page supports a payment-link override:

```text
https://www.journeytoonlinesuccess.com/?pay=https%3A%2F%2Fyour-checkout-link
```

That changes the product CTA without editing code.

## What is inside the zip

- Static launch hub: `index.html`, `styles.css`, `app.js`
- Product image: `assets/hero-revenue-kit.png`
- Product files: `product/AI-Local-Service-Revenue-Kit.md`, `product/roi-calculator.csv`, `product/30-day-content-calendar.csv`
- Netlify config: `netlify.toml`
- Local usage docs: `README.md`
