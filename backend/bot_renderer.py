"""
Bot rendering service using Playwright for SEO optimization.
Detects bots, renders React pages, and caches results.
"""
import asyncio
import re
from datetime import datetime, timedelta
from typing import Optional, Dict
import logging

logger = logging.getLogger(__name__)

# In-memory cache with expiration
_render_cache: Dict[str, tuple[str, datetime]] = {}
CACHE_DURATION_HOURS = 24

# Bot user agents to detect
BOT_PATTERNS = [
    r'googlebot',
    r'bingbot',
    r'slurp',  # Yahoo
    r'duckduckbot',
    r'baiduspider',
    r'yandexbot',
    r'facebookexternalhit',
    r'twitterbot',
    r'linkedinbot',
    r'whatsapp',
    r'telegrambot',
    r'slackbot',
    r'discordbot',
    r'ia_archiver',  # Alexa
    r'applebot',
    r'pinterest',
    r'gptbot',  # ChatGPT
    r'chatgpt',
    r'claudebot',
    r'anthropic-ai',
]

BOT_REGEX = re.compile('|'.join(BOT_PATTERNS), re.IGNORECASE)


def is_bot(user_agent: str) -> bool:
    """Check if user agent is a bot."""
    if not user_agent:
        return False
    return bool(BOT_REGEX.search(user_agent))


def get_cached_render(url: str) -> Optional[str]:
    """Get cached rendered HTML if not expired."""
    if url in _render_cache:
        html, timestamp = _render_cache[url]
        if datetime.now() - timestamp < timedelta(hours=CACHE_DURATION_HOURS):
            logger.info(f"Cache hit for {url}")
            return html
        else:
            # Expired, remove from cache
            del _render_cache[url]
            logger.info(f"Cache expired for {url}")
    return None


def set_cached_render(url: str, html: str):
    """Cache rendered HTML."""
    _render_cache[url] = (html, datetime.now())
    logger.info(f"Cached render for {url}")


async def render_page_with_playwright(url: str, timeout: int = 10000) -> Optional[str]:
    """
    Render a page using Playwright and return the HTML.
    
    Args:
        url: Full URL to render
        timeout: Timeout in milliseconds (default 10 seconds)
    
    Returns:
        Rendered HTML or None if failed
    """
    try:
        from playwright.async_api import async_playwright
        
        logger.info(f"Starting Playwright render for {url}")
        
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            
            # Navigate to page with timeout
            await page.goto(url, wait_until='networkidle', timeout=timeout)
            
            # Wait a bit for any lazy-loaded content
            await page.wait_for_timeout(1000)
            
            # Get the rendered HTML
            html = await page.content()
            
            await browser.close()
            
            logger.info(f"Successfully rendered {url}")
            return html
            
    except asyncio.TimeoutError:
        logger.error(f"Timeout rendering {url}")
        return None
    except Exception as e:
        logger.error(f"Error rendering {url}: {str(e)}")
        return None


def generate_fallback_html(url: str) -> str:
    """
    Generate basic fallback HTML when rendering fails.
    """
    # Extract path to determine page
    from urllib.parse import urlparse
    path = urlparse(url).path
    
    # Basic content based on path
    if path == '/' or path == '':
        title = "Lighthouse Insurance Agency"
        description = "Expert insurance solutions in Sunrise, Florida. Personal Auto, Commercial Auto, and Homeowners Insurance with 20+ years of experience."
        content = """
        <h1>Lighthouse Insurance Agency</h1>
        <p>Expert insurance solutions in Sunrise, Florida. Get personalized coverage with competitive rates and exceptional service from Luis and the Lighthouse team.</p>
        <h2>Our Services</h2>
        <ul>
            <li>Personal Auto Insurance</li>
            <li>Commercial Auto Insurance</li>
            <li>Homeowners Insurance</li>
        </ul>
        <p>Contact us: (954) 584-3417 | luis@lhinsur.com</p>
        <p>Address: 10242 NW 47th St Suite 10, Sunrise, FL 33331</p>
        """
    elif '/about' in path:
        title = "About Us - Lighthouse Insurance"
        description = "Learn about Lighthouse Insurance Agency's 20+ years of serving Sunrise, Florida with expert insurance solutions."
        content = """
        <h1>About Lighthouse Insurance</h1>
        <p>Your trusted insurance partner in Sunrise, Florida, dedicated to providing personalized coverage solutions with exceptional service.</p>
        """
    elif '/services' in path:
        title = "Insurance Services - Lighthouse Insurance"
        description = "Personal Auto, Commercial Auto, and Homeowners Insurance services in Sunrise, FL."
        content = """
        <h1>Our Insurance Services</h1>
        <p>Comprehensive insurance solutions tailored to protect what matters most to you and your business.</p>
        <ul>
            <li>Personal Auto Insurance</li>
            <li>Commercial Auto Insurance</li>
            <li>Homeowners Insurance</li>
        </ul>
        """
    elif '/blog' in path:
        title = "Insurance Blog - Lighthouse Insurance"
        description = "Expert insurance advice and tips from Lighthouse Insurance Agency."
        content = """
        <h1>Insurance Insights & Tips</h1>
        <p>Expert advice and guidance to help you make informed insurance decisions.</p>
        """
    elif '/reviews' in path:
        title = "Client Reviews - Lighthouse Insurance"
        description = "See what our satisfied clients say about Lighthouse Insurance Agency. 4.9 stars from 17 Google reviews."
        content = """
        <h1>Client Reviews</h1>
        <p>4.9 out of 5 stars based on 17 Google Reviews. Our clients trust us with their insurance needs.</p>
        """
    elif '/contact' in path:
        title = "Contact Us - Lighthouse Insurance"
        description = "Get your free insurance quote. Contact Lighthouse Insurance Agency in Sunrise, FL."
        content = """
        <h1>Get Your Free Quote</h1>
        <p>Contact us today for a free quote and experience the Lighthouse difference.</p>
        <p>Phone: (954) 584-3417</p>
        <p>Email: luis@lhinsur.com</p>
        <p>Address: 10242 NW 47th St Suite 10, Sunrise, FL 33331</p>
        <p>Hours: Monday - Friday: 9 AM - 5 PM</p>
        """
    else:
        title = "Lighthouse Insurance"
        description = "Expert insurance solutions in Sunrise, Florida."
        content = "<h1>Lighthouse Insurance Agency</h1><p>Expert insurance solutions in Sunrise, Florida.</p>"
    
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <meta name="description" content="{description}">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{url}">
    <meta property="og:title" content="{title}">
    <meta property="og:description" content="{description}">
    <meta property="og:image" content="https://customer-assets.emergentagent.com/job_2bb91f8b-019e-485a-ba3d-6f80e8f45f7f/artifacts/dzc31mvl_lighthouse-01.svg">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="{url}">
    <meta property="twitter:title" content="{title}">
    <meta property="twitter:description" content="{description}">
    <meta property="twitter:image" content="https://customer-assets.emergentagent.com/job_2bb91f8b-019e-485a-ba3d-6f80e8f45f7f/artifacts/dzc31mvl_lighthouse-01.svg">
    
    <!-- Structured Data -->
    <script type="application/ld+json">
    {{
        "@context": "https://schema.org",
        "@type": "InsuranceAgency",
        "name": "Lighthouse Insurance Agency",
        "image": "https://customer-assets.emergentagent.com/job_2bb91f8b-019e-485a-ba3d-6f80e8f45f7f/artifacts/dzc31mvl_lighthouse-01.svg",
        "telephone": "(954) 584-3417",
        "email": "luis@lhinsur.com",
        "address": {{
            "@type": "PostalAddress",
            "streetAddress": "10242 NW 47th St Suite 10",
            "addressLocality": "Sunrise",
            "addressRegion": "FL",
            "postalCode": "33331",
            "addressCountry": "US"
        }},
        "aggregateRating": {{
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "17"
        }},
        "openingHoursSpecification": {{
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "17:00"
        }}
    }}
    </script>
</head>
<body>
    {content}
</body>
</html>"""


async def get_rendered_html(url: str, user_agent: str) -> Optional[str]:
    """
    Main function to get rendered HTML for bots.
    
    Args:
        url: Full URL to render
        user_agent: User agent string
    
    Returns:
        Rendered HTML or None if not a bot
    """
    # Check if it's a bot
    if not is_bot(user_agent):
        return None
    
    logger.info(f"Bot detected: {user_agent[:50]}... for URL: {url}")
    
    # Check cache first
    cached_html = get_cached_render(url)
    if cached_html:
        return cached_html
    
    # Render the page
    html = await render_page_with_playwright(url)
    
    # If rendering failed, use fallback
    if not html:
        logger.warning(f"Rendering failed for {url}, using fallback")
        html = generate_fallback_html(url)
    
    # Cache the result
    set_cached_render(url, html)
    
    return html
