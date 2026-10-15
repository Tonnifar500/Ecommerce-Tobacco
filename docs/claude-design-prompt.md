# Claude Design prompt – First Draw (Website V1)

Design a complete, clickable **V1 e-commerce prototype** for **First Draw**, a Danish online cigar shop built for people buying their **first premium cigar**. All copy is in **English**. Prices are in **DKK**.

## 1. Brand & value proposition
- **Name:** First Draw ("first draw" = the first puff of a cigar).
- **Value proposition:** *"Your first cigar, chosen for you. Delivered fresh."*
- **Customer:** An adult in Denmark buying a premium cigar for a special occasion (a celebration, a gift, a milestone) who knows nothing about cigars and is afraid of looking like an amateur.
- **Tone:** Warm, calm, helpful, never snobby. Plain language. Explain every cigar term the first time it appears (e.g. "Maduro – a darker, sweeter wrapper leaf").
- **Positioning:** A friendly guide first, a shop second. The shop must never feel "for experts only".

## 2. Visual direction
Mood: warm, premium, relaxed, like a quiet evening in a leather armchair. Not cheesy, not macho.
- **Palette:** espresso brown `#2A1A12` (text, dark sections), tobacco brown `#8A5A3B`, amber/gold `#C8963E` (accents, band-like details), warm cream `#F6EFE3` (page background), ember red `#A63A24` (small accents, badges), smoke grey-blue `#9FB3BD` (subtle details).
- **Type:** an elegant serif for headings (e.g. Playfair Display or Fraunces), a clean humanist sans for body (e.g. Inter or Source Sans).
- **Details:** thin gold rules, subtle paper/wood texture, generous whitespace, rounded-but-refined buttons, cigar-band-inspired badges.
- **Imagery:** warm lifestyle photography (cigar resting on a crystal ashtray in soft window light, cigars in a wooden box with a wisp of smoke, an evening gathering). Use clearly marked **placeholder image slots** with a warm gradient and a short alt-text caption describing the ideal photo, so real photos can be dropped in. Do not use watermarked stock images.
- **Mobile-first:** every page must work at 375px wide. Sticky bottom "Add to cart" on product pages, collapsible filters on mobile, thumb-friendly buttons.

## 3. Global elements
- **Header:** logo, nav (*Start Here*, *Shop Cigars*, *Guides*, *Help*, *About*), search, cart icon with count. Mobile: hamburger.
- **Top bar:** "Free delivery over 500 DKK · Delivered fresh from humidor storage · 18+ only".
- **Footer:** nav links, delivery and returns info, age notice ("Tobacco products are sold to adults 18+ only"), contact email, a note: "Prototype – products and brands are fictional".
- **Trust bar** (reused on home, product and cart): *Age verified with MitID* · *Stored in a humidor, shipped fresh* · *Replacement guarantee* · *Delivery in 1–3 working days*.

## 4. Pages to design (all must be linked and clickable)

### 4.1 Homepage
1. **Hero:** headline "Your first cigar, chosen for you." Sub: "Simple guidance, honest descriptions and fresh delivery." Two primary CTAs: **Start Here – New to cigars?** and **Browse all cigars**.
2. **"Where do you want to start?"** – three discovery cards: *I'm new to cigars* (to Beginner Guide), *Shop by occasion* (to Finder pre-filtered), *Starter & sampler packs*.
3. **Shop by occasion:** Celebration, Gift, Relaxing evening, Outdoors/with friends, First-time try.
4. **Our beginner picks:** 4 product cards ("Mild & smooth", "Beginner-friendly" badges).
5. **How it works:** 3 steps – Choose with our guide → We verify your age → Fresh to your door with a care guide.
6. **Trust section:** humidor storage, replacement guarantee, MitID age check, 4.8★ average from (fictional) customers, with 3 short testimonials.
7. **Guide teaser:** "How to choose your first cigar in 3 minutes".
8. Footer.

### 4.2 Beginner Guide ("How to choose your first cigar")
Long-form, scannable article page with a sticky table of contents: What is a cigar vs. a cigarillo · Strength (mild to full) explained · Flavour notes in plain language · What "wrapper", "maduro", "robusto" mean (mini glossary with tooltips) · How long will it take to smoke · Which cigar for which occasion · "Our 3 safest first picks" product cards · Final CTA to the Finder. Include an **interactive "Find my first cigar" mini-quiz** (3 questions: occasion, how strong, taste – sweet, woody, creamy) that ends with 2–3 recommended products.

### 4.3 Cigar Finder / Collection page
- Left filter sidebar (mobile: bottom-sheet): **Strength** (Mild, Mild–Medium, Medium, Medium–Full, Full), **Flavour** (Sweet & creamy, Woody & nutty, Spicy, Earthy, Coffee & cocoa), **Occasion**, **Country of origin** (Colombia, Dominican Republic, Nicaragua, Honduras, Ecuador, Mexico), **Price**, **Beginner-friendly only** toggle, **Size** (Robusto, Corona, Toro, Petit corona).
- Each filter value has a one-line plain-English explanation (info icon).
- Sort: Recommended for beginners, Price, Strength, Rating.
- Quick category chips above the grid: *Beginner picks · Colombian cigars · Starter packs · Gifts · Mild & smooth*.
- Product card: image, brand + name, country flag, a **strength meter (1–5)**, 2–3 flavour tags, "Beginner-friendly" badge, rating, price, quick add to cart.
- Empty state: "No match – try removing a filter or take the quiz."
- A "Not sure? Let us help" banner linking to the guide/quiz.

### 4.4 Product Page
Layout: image gallery on the left, buy box on the right (stacked on mobile).
- Title, brand, country with flag, star rating and review count, price, stock status.
- **"Is this right for me?" panel:** Beginner-friendly: Yes/No, Strength meter, Flavour profile wheel or simple bars (sweet, spicy, woody, earthy, creamy), Smoking time, Best for (occasion).
- **Key facts:** Country of origin (e.g. Colombia), wrapper/binder/filler, size (length × ring gauge in mm), vitola explained, cigars per box.
- Quantity selector, **Add to cart**, and secondary **"Add the starter pack instead"** link.
- **Reassurance block:** stored in a humidor at 70% humidity, replacement guarantee if damaged or dry, delivery cost and time shown **before** cart, MitID age check explained.
- Tabs/accordions: *Tasting notes* · *Origin story* · *How to enjoy it* · *Storage tips* · *Delivery & returns*.
- Reviews (fictional), including one "I'm a beginner" review.
- "Pairs well with…" and "If you like this, try…" product rows.

### 4.5 Cart & Checkout (demo)
- **Cart drawer + cart page:** line items, free-delivery progress bar, delivery price and time visible, trust bar, "Age check required at checkout" notice.
- **Checkout (3 clear steps on one page):** 1 Delivery details · 2 **Age verification (mock MitID screen, "Verify with MitID (demo)")** · 3 Payment (mock card, MobilePay option, clearly marked "Demo – no real payment"). Order summary sticky on desktop. Clear total with no surprise fees.
- Guest checkout, minimal fields.

### 4.6 Order Confirmation & Care Guide
- Thank-you, order number, delivery estimate.
- **Care guide:** how to store (humidor, 65–72% humidity, cool place), how to cut, how to light, how to enjoy and when to stop, with simple illustrations or placeholders.
- "If you liked this, try…" recommendations and a "What to smoke next" button.
- Mock "email preview" showing the care guide email.

### 4.7 FAQ / Help & Support
Searchable accordion grouped by: Age verification · Delivery & shipping · Freshness & storage · Damaged or dry cigars · Returns & replacement · Contact. Contact card with email, a short contact form and response time ("We reply within 1 working day").

### 4.8 About Us
Who runs First Draw (a small Danish team of enthusiasts who remember being beginners), how we select cigars (taste-tested, beginner-friendly first), how we source (named fictional farms and partners in Colombia, Dominican Republic, Nicaragua), how we store (humidor photo slot), and our promise. Include a team section with placeholder portraits.

## 5. Product catalogue (fictional brands, use for all product cards)
Each product needs: name, brand, country, strength (1–5), flavour notes, size, smoking time, occasion tags, beginner-friendly (yes/no), price in DKK, rating.

| # | Name | Brand | Country | Str. | Notes | Size | Time | Beginner | Price |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Aurora Robusto | Casa Aurelia | Colombia | 2 | Cream, honey, light cedar | Robusto 124×50 | 45 min | Yes | 89 |
| 2 | Andes Corona | Casa Aurelia | Colombia | 2 | Almond, vanilla, toast | Corona 142×44 | 40 min | Yes | 79 |
| 3 | Sierra Dorada Toro | Finca Montaña | Colombia | 3 | Cocoa, caramel, soft spice | Toro 152×52 | 70 min | Yes | 119 |
| 4 | Café de la Sierra | Finca Montaña | Colombia | 3 | Coffee, dark chocolate | Robusto 127×50 | 55 min | No | 109 |
| 5 | Golden Hour Petit Corona | Luna Vieja | Dominican Republic | 1 | Light, creamy, sweet hay | Petit corona 127×42 | 30 min | Yes | 69 |
| 6 | Ember Evening Robusto | Luna Vieja | Dominican Republic | 3 | Toasted nuts, leather | Robusto 127×50 | 50 min | Yes | 99 |
| 7 | Santiago Reserve | Tabaquera Santiago | Dominican Republic | 4 | Pepper, cedar, espresso | Toro 152×54 | 80 min | No | 149 |
| 8 | Volcán Maduro | Isla Ceniza | Nicaragua | 4 | Dark cocoa, black pepper, earth | Robusto 127×52 | 60 min | No | 129 |
| 9 | Volcán Connecticut | Isla Ceniza | Nicaragua | 2 | Butter, cedar, light spice | Robusto 127×52 | 55 min | Yes | 95 |
| 10 | Noche Fuerte | Isla Ceniza | Nicaragua | 5 | Strong pepper, tobacco, dark roast | Toro 152×56 | 90 min | No | 159 |
| 11 | Río Claro Corona | Valle Brisa | Honduras | 3 | Cedar, nutmeg, dried fruit | Corona 142×44 | 45 min | Yes | 85 |
| 12 | Honey Leaf Petit | Valle Brisa | Ecuador | 1 | Honey, hay, soft wood | Petit corona 115×40 | 25 min | Yes | 59 |
| 13 | Tierra Roja | Rancho Sol | Mexico | 4 | Earthy, sweet spice, cocoa | Robusto 127×50 | 60 min | No | 115 |
| 14 | Celebration Churchill | Casa Aurelia | Colombia | 3 | Smooth, vanilla, toasted bread | Churchill 178×48 | 100 min | Yes | 169 |

**Starter / sampler packs:**
- **First Draw Starter Trio (3 mild cigars, #1, #5, #9) – 229 DKK.** Includes a printed care guide card.
- **Colombian Discovery Pack (4 Colombian cigars, #1, #2, #3, #14) – 349 DKK.**
- **Gift Celebration Box (2 cigars + cutter + matches in a wooden box) – 399 DKK.**

## 6. Funnel & measurement hooks (UI only, for the team's explanation)
Make the key funnel steps visible and easy to track: Awareness (guide to shop click) → Engagement ("Start Here" entry) → Consideration (product page add-to-cart) → Purchase (checkout completion) → Post purchase (repeat purchase within 90 days). Use clear, single primary CTAs per page.

## 7. Output expectations
- A consistent design system (colours, type scale, buttons, badges, cards, form fields, strength meter, trust bar).
- All 8 pages in desktop and mobile, linked as a clickable prototype.
- Realistic English copy everywhere, no lorem ipsum.
- Accessible: sufficient contrast, visible focus states, alt text on image slots.
