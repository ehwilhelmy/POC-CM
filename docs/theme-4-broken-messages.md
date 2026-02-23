# Theme 4: Broken / Misleading Error & General Messages

**Workshop Priority:** #4 (7 votes)
**Owner:** @Megan Moore
**Flows:** Guest Account
**Also addressed by:** New Caretaker (identifier-first), Returning Caretaker (error states), Forgot Password (error + migration messaging), Branded Emails (reference)

---

## Problem Coverage

### 1. "Forgot Password" confirms a code was sent even when no account exists
**Status:** Covered

The identifier-first pattern eliminates this scenario. The system checks whether the email has an account *before* the parent ever reaches a password or reset flow. If no account exists, the parent is routed to signup (New Caretaker flow) — they never hit "Forgot Password" for a nonexistent account. The misleading "we sent a code" message can't happen because the system already knows the account status.

---

### 2. Duplicate account error message doesn't provide a clear recovery path
**Status:** Covered

This error can't occur in our flows. The identifier-first pattern checks the email first — if an account already exists, the parent is routed to the password screen (Returning Caretaker), not to a signup form. The parent never fills out a form only to be told the email is taken. No ambiguous "it's possible you already have an account" messaging needed.

---

### 3. Error messages don't guide the user toward resolution
**Status:** Covered

Every message in the prototype provides a clear next step:
- Password error → "reset your password" link directly in the error banner
- Migration warning → explains *why* the password may not work and links to reset
- Verification → "Check your email" button opens the email, code is clickable/copyable
- Success screens → "Go to My Dashboard" button
- "Didn't receive a code?" → Resend link
- "Try another email" → returns to email entry

No message leaves the parent without a path forward.

---

### 4. Verification emails display a broken Auth0 logo image
**Status:** Covered

All emails use camp branding — camp logo (if available) or initials fallback in an accent-colored banner. No Auth0 logo anywhere. The conditional rendering means there's never a broken image — if no logo URL exists, the camp's initials display instead. Sender shows as "{Camp Name} via campminder" rather than a generic noreply address.

---

### 5. Gmail flags verification/reset emails as suspicious
**Status:** Partially covered (design-level)

The prototype demonstrates what properly branded emails look like — recognizable camp name in sender, camp-branded header, clear purpose in subject line, professional layout. This addresses the *visual trust* problem (parents recognize and trust the email).

**Not fully addressed:** Email deliverability (spam filtering, DKIM/SPF configuration, Auth0 email provider settings) is an infrastructure concern outside the prototype's scope. The branded design helps — emails that look legitimate are less likely to be manually reported as spam — but the technical deliverability work needs to happen at the Auth0/email infrastructure level.

---

### 6. Expired link error page is a dead end
**Status:** Not covered

The prototype doesn't demonstrate what happens when a parent clicks an expired link. This is an edge case that matters — the current Auth0 behavior shows a generic error page with no recovery path.

**Worth noting:** The fix is straightforward — an expired-link page should show the camp's branding and a clear message: "This link has expired. [Request a new one]" with a button that routes back to the reset or verification flow. This could be added as a step in the Forgot Password flow.

---

### 7. Old pre-Auth0 links in camp email templates no longer work
**Status:** Not covered

This is an infrastructure/redirect concern, not a UX flow. Camps have old CampInTouch links saved in templates and handbooks. The fix is URL redirect mapping at the platform level — ensuring old V2 links route to the correct Auth0 login page with camp context preserved. Outside the scope of this prototype.

**Worth noting:** This could be documented as a migration checklist item — camps should be notified to update their saved links, and CampMinder should maintain redirects for the most common old URL patterns.

---

## Summary

| Problem | Status |
|---------|--------|
| "Forgot Password" confirms code for nonexistent account | Covered |
| Duplicate account error lacks recovery path | Covered |
| Error messages don't guide toward resolution | Covered |
| Verification emails show broken Auth0 logo | Covered |
| Gmail flags emails as suspicious | Partially covered (design-level) |
| Expired link error page is a dead end | Not covered |
| Old pre-Auth0 links broken | Not covered |

**Strengths:**
- Identifier-first pattern prevents the two worst messaging failures (false "code sent" confirmation and duplicate account error) from ever occurring
- Every error state includes a clear next step — no dead ends in any flow
- Camp-branded emails with conditional logo/initials fallback eliminate broken images entirely
- Migration warning on password error explains system changes without blaming the parent

**Gaps:**
- **Expired link page** — not demonstrated in the prototype. Could be added as a step in the Forgot Password flow showing a branded error page with a "Request a new link" button.
- **Old link redirects** — infrastructure concern outside prototype scope. Should be tracked as a migration checklist item.
- **Email deliverability** — the design helps with visual trust, but DKIM/SPF/email provider configuration is a separate infrastructure workstream.
