# Hosting-Level Redirect Rules (apply on your real domain / host)

The app already adds a per-page `<link rel="canonical">` and consistent structured
data. However, the **301 redirects** for http→https and www→non-www must be
configured at the hosting / CDN / DNS layer (they cannot be enforced from inside
a client-side React app). Apply ONE of the following depending on your host.

Canonical host chosen: **https://lighthouseinsgroup.com** (non-www, https).

## Nginx
```nginx
# Redirect http -> https and www -> non-www (single 301)
server {
    listen 80;
    server_name lighthouseinsgroup.com www.lighthouseinsgroup.com;
    return 301 https://lighthouseinsgroup.com$request_uri;
}
server {
    listen 443 ssl;
    server_name www.lighthouseinsgroup.com;
    # ssl_certificate ...
    return 301 https://lighthouseinsgroup.com$request_uri;
}
server {
    listen 443 ssl;
    server_name lighthouseinsgroup.com;
    # ... serve the app ...
}
```

## Apache (.htaccess)
```apache
RewriteEngine On
# http -> https
RewriteCond %{HTTPS} off
RewriteRule ^ https://lighthouseinsgroup.com%{REQUEST_URI} [L,R=301]
# www -> non-www
RewriteCond %{HTTP_HOST} ^www\.lighthouseinsgroup\.com [NC]
RewriteRule ^ https://lighthouseinsgroup.com%{REQUEST_URI} [L,R=301]
```

## Cloudflare (no code)
1. SSL/TLS → Edge Certificates → enable **Always Use HTTPS**.
2. Rules → Redirect Rules → create: If hostname equals `www.lighthouseinsgroup.com`
   → Static redirect to `https://lighthouseinsgroup.com` (301, preserve path & query).

## Vercel (vercel.json)
```json
{
  "redirects": [
    { "source": "/:path*", "has": [{ "type": "host", "value": "www.lighthouseinsgroup.com" }], "destination": "https://lighthouseinsgroup.com/:path*", "permanent": true }
  ]
}
```
Vercel serves https and auto-redirects http→https by default.

## After applying
- In Google Search Console, keep only `https://lighthouseinsgroup.com` as the
  property and submit `https://lighthouseinsgroup.com/sitemap.xml`.
- Request re-indexing; the duplicate http/https indexing will consolidate.
