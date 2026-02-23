# Theme 2: Multi-Step & Friction-Heavy Flows

**Workshop Priority:** #2 (9 votes)
**Owner:** @Megan Moore
**Flows:** New Caregiver, Forgot Password, Guest Account

---

## Problem Coverage

### 1. New account creation requires several steps before the parent reaches their goal
**Status:** Covered

The New Caregiver flow reduces the journey to: email → create account → verify → done. The identifier-first pattern eliminates the "Login vs Sign Up" choice entirely — the system checks the email and routes automatically. The parent never has to guess which button to click. The info banner on the success screen calls this out: "3 steps, no dead ends."

---

### 2. Duplicate account error surfaces only after completing most of signup
**Status:** Covered

The identifier-first pattern solves this at the root. The parent enters their email *first*, and the system checks whether an account exists before showing any signup form. If an account exists, it routes to login (Returning Caregiver flow). If not, it routes to signup. The parent never fills out a form only to be told their email is taken.

---

### 3. Password reset flow has no "back to login" option
**Status:** Covered

The Forgot Password flow provides clear navigation at every step. After resetting, the parent is auto-logged-in — no need to find their way back to a login screen. The info banner explains: "The parent already verified their identity with the 6-digit code and just typed their new password — no need to sign in again." The error step also has a direct "Forgot password?" link that carries the email forward (pre-filled, no re-entry).

---

### 4. Email verification adds friction and has deliverability issues
**Status:** Partially covered

The flow demonstrates verification with a branded, recognizable email (camp logo, camp name in sender, accent-colored CTA) which addresses the deliverability/trust side — parents are more likely to find and trust a camp-branded email vs a generic Auth0 one. The code is clickable/copyable to reduce the context-switch friction.

**Not addressed:** The fundamental friction of requiring a context switch (leave browser → open email → find code → return) still exists. This is an Auth0 platform constraint. The prototype makes the best of it but doesn't eliminate it.

**Worth noting:** Auth0 supports magic links as an alternative to 6-digit codes — the parent clicks a link in the email and is verified + logged in automatically, no code entry needed. This would eliminate the context switch entirely. Not something we're building out in this prototype, but a viable option to explore if verification friction remains a top complaint.

---

### 5. Password complexity requirements are significantly higher than before Auth0
**Status:** Covered

The `PasswordRequirements` component shows real-time feedback as the parent types — checkmarks fill in progressively for each rule met. Requirements are clearly structured: "at least 12 characters" and "at least 3 of the following 4 types." No surprise failures at submit time. The button stays disabled until all rules pass.

**Not addressed:** There's no explanation of *why* requirements changed from pre-Auth0 levels. This is a messaging/communication gap rather than a UX gap — camps may want talking points for parents who ask.

---

### 6. Guest account login experience is "particularly egregious"
**Status:** Covered

The Guest Account flow demonstrates a streamlined invitation experience: the primary caregiver sends an invite from their dashboard, the guest receives a camp-branded email with their name and permissions listed, and the create-account form pre-fills first name, last name, and email (read-only). The guest only needs to set a password. The email popup auto-opens to reduce clicks.

---

## Summary

| Problem | Status |
|---------|--------|
| Too many steps for new account creation | Covered |
| Duplicate account error after full signup | Covered |
| No "back to login" after password reset | Covered |
| Email verification friction & deliverability | Partially covered |
| Password complexity increase unexplained | Covered |
| Guest account flow is "egregious" | Covered |

**Strengths:**
- Identifier-first pattern eliminates the biggest friction point (Login vs Sign Up confusion) and prevents the duplicate-account dead end
- Real-time password feedback prevents submit-time surprises
- Auto-login after password reset removes a needless extra step
- Guest flow pre-fills fields and auto-opens email to minimize input burden
- Every flow has info banners explaining the friction reduction decisions

**Gaps:**
- **Email verification context switch** — the 6-digit code flow still requires leaving the browser to check email. This is an Auth0 platform constraint. The prototype improves it (branded email, clickable code) but can't eliminate it. Worth noting as a known trade-off.
- **Password change messaging** — no in-flow explanation of why requirements changed from pre-Auth0. Could be addressed with a one-line note during password creation for returning parents, or as a camp communication talking point outside the prototype.
