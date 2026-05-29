# Journey to Online Success Launch Hub

This is a launch-ready static site that combines the strongest unfinished products into one monetizable hub:

- Creator Money Studio: free campaign generator for traffic and affiliate content.
- AI Local Service Revenue Kit: $29 digital product positioned for local service businesses.
- Affiliate toolbox: hosting, email, funnel, lead magnet, and creator-tool recommendations.
- Job Skill Planner: linked as the already-live product on `journeytoonlinesuccess.com`.

## Run locally

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Open:

```text
http://127.0.0.1:4173
```

## Payment link

The buy button defaults to the local product preview file. After creating a Gumroad, Payhip, Lemon Squeezy, or Stripe Payment Link checkout, append the encoded checkout URL:

```text
https://journeytoonlinesuccess.com/?pay=https%3A%2F%2Fexample-checkout-link
```

The page will replace every `data-buy-link` CTA with that checkout URL.

## Files to publish

Upload the full folder contents to a static host:

- `index.html`
- `styles.css`
- `app.js`
- `assets/hero-revenue-kit.png`
- `product/AI-Local-Service-Revenue-Kit.md`
- `product/roi-calculator.csv`
- `product/30-day-content-calendar.csv`
- `netlify.toml`

## WordPress version

An installable WordPress plugin is included at:

```text
wordpress-plugin/journey-launch-hub.zip
```

Install it in WordPress under `Plugins > Add New > Upload Plugin`, activate it, then add this shortcode to a page:

```text
[journey_launch_hub]
```

Leads are saved in WordPress under `Journey Leads`, with CSV export.

## Launch sequence

1. Create the checkout for the AI Local Service Revenue Kit at $29.
2. Publish this static folder to the domain.
3. Add the checkout link using the `?pay=` method or edit the buy link directly.
4. Publish one generated campaign per day for seven days.
5. Track clicks to the kit and affiliate tools, then double down on the channels that get replies or sales.
