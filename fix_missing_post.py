#!/usr/bin/env python3
"""Add the missing first blog post"""
import requests
import json

BASE_URL = "https://trucking-agency-v2.preview.emergentagent.com/api"
ADMIN_PASSWORD = "Lighthouse2026!"

# Login
login_resp = requests.post(f"{BASE_URL}/admin/login", json={"password": ADMIN_PASSWORD})
token = login_resp.json()['token']
headers = {'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'}

# The missing post data
missing_post = {
    "slug": "how-much-does-trucking-insurance-cost-florida-2026",
    "title": "How Much Does Trucking Insurance Cost in Florida in 2026?",
    "excerpt": "A clear breakdown of what Florida truckers pay for insurance in 2026, the factors that move your premium, and how to lower your rates.",
    "author": "Luis Rodriguez",
    "tags": ["Trucking Insurance", "Costs", "Florida"],
    "status": "published",
    "coverImage": "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=70",
    "seoTitle": "Trucking Insurance Cost in Florida (2026) | Lighthouse",
    "seoDescription": "How much does trucking insurance cost in Florida in 2026? See average premiums, rate factors, and ways to save. Call (954) 584-3417.",
    "faqs": [
        {"question": "How much is trucking insurance per month in Florida?",
         "answer": "Most Florida owner-operators pay roughly $700 to $1,400 per month for a full policy that includes primary liability, physical damage, and motor truck cargo. Fleets are priced per unit and often qualify for lower per-truck rates."},
        {"question": "Why is trucking insurance more expensive in Florida?",
         "answer": "Florida has heavy traffic, frequent severe weather, high litigation rates, and a large volume of commercial vehicles. These factors raise claim costs, which insurers reflect in premiums."},
        {"question": "How can I lower my trucking insurance cost?",
         "answer": "Maintain a clean CDL and MVR, run newer well-maintained equipment, keep continuous coverage, choose sensible deductibles, and work with an independent agent who shops multiple carriers for you."}
    ],
    "content": """## What Trucking Insurance Really Costs in Florida

Trucking insurance is one of the largest fixed costs any owner-operator or fleet owner carries. In 2026, Florida truckers should expect to pay somewhere between **$8,000 and $18,000 per truck per year** for a complete program, though your actual number depends heavily on your operation.

For a single owner-operator running interstate with their own authority, a typical full policy (primary liability + physical damage + motor truck cargo) usually lands around **$700 to $1,400 per month**. Drivers who lease onto a carrier and only need physical damage and non-trucking liability often pay far less.

## The Coverages Inside Your Premium

Your total premium is the sum of several separate coverages:

- **Primary auto liability** – Required for MC/DOT authority. This is usually the single largest line item, often 50–70% of your total premium.
- **Physical damage** – Covers your truck and trailer. Priced as a percentage of the insured value.
- **Motor truck cargo** – Protects the freight you haul. Cost depends on commodity type and limits.
- **Non-trucking liability** – Inexpensive coverage for when you drive off-dispatch.
- **General liability & occupational accident** – Optional but commonly bundled.

## What Drives Your Rate Up or Down

Insurers price trucking risk using a long list of factors. The biggest ones in Florida are:

1. **Driving record (MVR) and CDL experience.** Two-plus years of clean, verifiable experience makes a major difference.
2. **Years in business under your own authority.** New ventures (under 12 months) pay a "new authority" surcharge.
3. **Radius of operation.** Local and regional hauls usually cost less than long-haul interstate.
4. **Commodity hauled.** Reefer, hazmat, and high-value loads cost more to insure than general dry freight.
5. **Equipment age and value.** Newer trucks cost more for physical damage but can reduce liability risk.
6. **Loss history.** Prior claims and CSA scores directly affect what carriers will offer.

## How to Keep Your Costs Under Control

The single most effective way to control cost is to **shop multiple carriers every renewal**. Trucking markets shift constantly, and the carrier that was cheapest last year may not be competitive today. That is exactly where an independent agency earns its keep — instead of quoting one company, we market your risk to many.

Other proven strategies:

- Keep coverage continuous — gaps trigger surcharges.
- Choose a physical damage deductible you can actually afford, but not lower than you need.
- Bundle cargo, liability, and physical damage with one carrier for package credits.
- Report accurate mileage and radius; over-stating them wastes money.

## Get a Real Florida Trucking Quote

Online estimates only go so far. Because Lighthouse Insurance is an independent agency based in Sunrise, FL, we compare real quotes from multiple trucking carriers and explain the trade-offs in plain English. Call us at **(954) 584-3417** for a no-obligation quote tailored to your operation.
"""
}

# Create the post
resp = requests.post(f"{BASE_URL}/admin/posts", json=missing_post, headers=headers)
if resp.status_code == 200:
    print("✅ Successfully created missing post")
    print(json.dumps(resp.json(), indent=2))
else:
    print(f"❌ Failed to create post: {resp.status_code}")
    print(resp.text)
