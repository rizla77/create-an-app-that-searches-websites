# Journey Launch Hub WordPress Plugin

## Install

1. Upload `journey-launch-hub.zip` in WordPress under `Plugins > Add New > Upload Plugin`.
2. Activate the plugin.
3. Create or edit a page.
4. Add this shortcode:

```text
[journey_launch_hub]
```

To point the product button at a checkout URL:

```text
[journey_launch_hub checkout_url="https://your-checkout-link"]
```

## Lead Collection

The lead form saves submissions to a custom WordPress database table and emails the site admin address.

View leads in:

```text
WordPress Admin > Journey Leads
```

The admin page includes CSV export.

## Files

- `journey-launch-hub.php`: plugin, shortcode, AJAX lead capture, admin lead table.
- `assets/launch-hub.css`: scoped frontend styles.
- `assets/launch-hub.js`: generator, calculator, lead form AJAX.
- `assets/hero-revenue-kit.png`: product image.
- `product/`: local product preview and worksheets.
