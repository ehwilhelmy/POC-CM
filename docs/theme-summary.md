# Auth Flow Prototype — Theme Coverage Summary

**Prototype:** [ehwilhelmy.github.io/POC-CM/#/auth](https://ehwilhelmy.github.io/POC-CM/#/auth)

---

## Overall Coverage

| Theme | Priority | Covered | Partial | Not Covered |
|-------|----------|---------|---------|-------------|
| 1. Branding & Identity | #1 (10 votes) | 6/6 | — | — |
| 2. Multi-Step Friction | #2 (9 votes) | 5/6 | 1 | — |
| 3. Account Status Confusion | #3 (8 votes) | 4/5 | — | 1 |
| 4. Broken Messages | #4 (7 votes) | 5/7 | 1 | 1 |

**Total: 20 of 24 problems fully covered, 2 partially covered, 2 not covered.**

---

## Theme 1: Branding & Identity

| Problem | Status |
|---------|--------|
| No camp branding on login/signup | Covered |
| Campanion shows only Campanion branding | Covered |
| Wrong camp via Google (Tawonga) | Covered |
| Auth0 emails lack sender identity | Covered |
| Camps can't customize login/emails | Covered |
| No cohesive brand across touchpoints | Covered |

**How the prototype addresses it:** Every auth screen shows the camp's logo, name, accent color, and background image via `AuthLayout`. Emails use camp-branded headers with "{Camp Name} via campminder" sender. Campanion flow explains why it uses product branding (multi-camp) and shows a camp picker after auth. Camp-specific branding on login pages is itself the guardrail against the Tawonga/wrong-camp problem.

---

## Theme 2: Multi-Step Friction

| Problem | Status |
|---------|--------|
| Too many steps for new account creation | Covered |
| Duplicate account error after full signup | Covered |
| No "back to login" after password reset | Covered |
| Email verification friction & deliverability | Partially covered |
| Password complexity increase unexplained | Covered |
| Guest account flow is "egregious" | Covered |

**How the prototype addresses it:** Identifier-first pattern eliminates the Login vs Sign Up choice. New account creation is 3 steps (email → create account → verify). Password reset auto-logs in after completion. Real-time password requirements with progressive checkmarks. Guest flow pre-fills fields and auto-opens the invitation email.

**Remaining gap:** Email verification still requires a context switch (leave browser → check email → return). Auth0 supports magic links as an alternative — parent clicks a link and is verified automatically, no code entry needed. Not built out in this prototype but a viable option to explore.

---

## Theme 3: Account Status Confusion

| Problem | Status |
|---------|--------|
| Login vs Sign Up guessing game | Covered |
| Camps can't see account status | Covered |
| Wrong path → dead ends | Covered |
| Pre-Auth0 password expectations | Covered |
| Dual caretaker/staff accounts | Not covered |

**How the prototype addresses it:** Identifier-first pattern means the system decides the path — no guessing. Account Lookup tool gives camp staff visibility into account status, verification state, and last login. Migration warning banner on the password error screen explains why old passwords may not work without blaming the parent.

**Remaining gap:** Dual caretaker/staff accounts (same email, separate Auth0 accounts with different MFA) is an identity architecture question outside the scope of this prototype. Worth raising in the Auth0 implementation discussion.

---

## Theme 4: Broken / Misleading Messages

| Problem | Status |
|---------|--------|
| "Forgot Password" confirms code for nonexistent account | Covered |
| Duplicate account error lacks recovery path | Covered |
| Error messages don't guide toward resolution | Covered |
| Verification emails show broken Auth0 logo | Covered |
| Gmail flags emails as suspicious | Partially covered |
| Expired link error page is a dead end | Covered |
| Old pre-Auth0 links broken | Not covered |

**How the prototype addresses it:** Identifier-first prevents the false "code sent" confirmation and duplicate account error from ever occurring. Every error state includes a clear next step. Camp-branded emails with conditional logo/initials fallback eliminate broken images. Expired Link reference tool shows a branded recovery page with one-click resend.

**Remaining gaps:**
- **Email deliverability** — the branded design helps with visual trust, but DKIM/SPF/email provider configuration is a separate infrastructure workstream.
- **Old link redirects** — camps have pre-Auth0 links in templates and handbooks that no longer work. This is a URL redirect mapping task at the platform level, not a UX concern.

---

## What the Prototype Demonstrates

### Caretaker Journeys (5)
1. **New Caretaker** — Camp website → identifier-first → create account → verify email → dashboard
2. **Returning Caretaker** — Camp website → identifier-first → password → dashboard
3. **Forgot Password** — Wrong password → migration warning → reset → auto-login
4. **Guest Account** — Primary caretaker invites guest → branded email → pre-filled signup
5. **Campanion App** — Mobile login → Campanion branding → camp picker → stream

### Reference Tools (3)
6. **Branded Emails** — Preview verification, password reset, and invitation email templates
7. **Account Lookup** — Camp staff tool to check parent account status
8. **Expired Link** — Branded expired link recovery page (verification + reset scenarios)

---

## Key Design Patterns

| Pattern | What it solves |
|---------|---------------|
| **Identifier-first** | Eliminates Login vs Sign Up confusion, prevents duplicate account errors, prevents false "code sent" messages |
| **Camp-branded auth screens** | Builds trust, prevents wrong-camp confusion, restores what camps lost post-Auth0 |
| **Camp-branded emails** | Replaces broken Auth0 logo, makes emails recognizable and trustworthy |
| **Migration warning** | Explains pre-Auth0 password changes without blaming the parent |
| **Auto-login after reset** | Removes needless re-authentication after identity is already verified |
| **Pre-filled fields** | Reduces friction (email carries forward, guest fields pre-populated) |
| **Real-time password feedback** | Prevents submit-time surprises with progressive checkmarks |
| **One-click expired link recovery** | Replaces dead-end error pages with clear next steps |
