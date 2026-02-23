# Theme 1: Branding & Identity

**Workshop Priority:** #1 (10 votes)
**Owner:** @Megan Moore
**Flows:** Returning Caretaker, Campanion App
**Reference Tools:** Branded Emails

---

## Problem Coverage

### 1. No camp branding on login or signup screens
**Status:** Covered

New Caretaker + Returning Caretaker flows both use `AuthLayout` with full camp branding — logo, camp name, accent color, and background image are visible on every auth screen. The parent always sees their camp's identity before entering any personal information.

---

### 2. Campanion mobile app shows only Campanion branding
**Status:** Covered

The Campanion flow demonstrates why the app uses Campanion branding (not camp branding) at the auth screen — because the parent isn't logging into a single camp. Annotations explain this is intentional. After authentication, the camp picker shows all connected camps with distinct logos and colors, giving multi-camp parents clarity.

---

### 3. Googling "CampInTouch" leads to the wrong camp (Tawonga problem)
**Status:** Covered

This problem exists because today's login page is generic — there's nothing telling a parent they've landed at the wrong camp. With camp-specific branding on every login page (logo, name, colors), a parent who Googles and lands on Camp Tawonga's page immediately sees "Camp Tawonga" front and center and knows it's not their camp. The branding itself is the guardrail.

---

### 4. Auth0-generated emails lack recognizable sender identity
**Status:** Covered

Verification emails in the New Caretaker and Forgot Password flows show camp-branded headers (accent-colored banner with camp logo/initials and name). Sender shows as "Camp Tall Pines via campminder" instead of a generic noreply address. The Branded Emails reference tool previews all three email types (verification, password reset, invitation) with consistent camp branding.

---

### 5. Camps cannot customize the login page or transactional emails
**Status:** Covered

The prototype itself is the answer — it shows what camp-customized auth looks like. `campBrand.ts` defines branding as structured data (name, accent color, logo, background image), making it clear this is a system that scales across camps, not a one-off design.

---

### 6. No cohesive brand experience across any touchpoint
**Status:** Covered

Camp branding threads through the entire journey: camp website → auth screen → verification email → dashboard. The same logo, accent color, and camp name appear at every step. The "Powered by campminder" wordmark sits below the card, establishing the platform identity without competing with the camp's brand.

---

## Summary

| Problem | Status |
|---------|--------|
| No camp branding on login/signup | Covered |
| Campanion shows only Campanion branding | Covered |
| Wrong camp via Google (Tawonga) | Covered |
| Auth0 emails lack sender identity | Covered |
| Camps can't customize login/emails | Covered |
| No cohesive brand across touchpoints | Covered |

**Strengths:**
- Camp branding is consistent from website entry through to dashboard
- Email branding is well-demonstrated across 3 email types
- Campanion vs camp branding distinction is clearly explained with annotations
- `campBrand.ts` makes it feel like a real system, not one-off design

**No gaps remaining.** All 6 problems are addressed by the prototype.
