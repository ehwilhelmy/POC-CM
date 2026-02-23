# Theme 3: Account Status Confusion

**Workshop Priority:** #3 (8 votes)
**Owner:** @Megan Moore
**Flows:** Forgot Password
**Reference Tools:** Account Lookup
**Also addressed by:** New Caregiver (identifier-first), Returning Caregiver (identifier-first)

---

## Problem Coverage

### 1. Login vs. Sign Up is a guessing game with no guidance
**Status:** Covered

The identifier-first pattern eliminates this entirely. Every parent enters their email on the same screen — the system checks whether an account exists and routes them automatically. New parents go to signup, returning parents go to password entry. There is no "Login" vs "Sign Up" button to choose between. Info banners in both flows call this out explicitly.

---

### 2. Camps have no visibility into whether a caregiver has an Auth0 account
**Status:** Covered

The Account Lookup reference tool gives camp staff a way to search by email and see: account status (verified / unverified / not found), camp association, last login date, and account creation date. For unverified accounts, staff can resend the verification email. For "not found" results, the tool tells staff the parent may need to create an account or try a different email.

---

### 3. Choosing the wrong path leads to confusing dead ends
**Status:** Covered

There is no wrong path to choose. The system decides the path based on the email entered. A parent with an existing account is routed to the password screen (Returning Caregiver). A parent without an account is routed to the signup form (New Caregiver) with a notice explaining why. The duplicate-account dead end is impossible — the system already knows the email exists before showing any form.

---

### 4. Pre-Auth0 parents expect old credentials to work
**Status:** Covered

The Forgot Password flow handles the case where a returning parent's password doesn't work. On the password-error step, a warning banner now explains: "Our security system was recently updated. If you haven't logged in recently, your previous password may no longer work." This gives the parent context without blaming them, and links directly to the reset flow. After reset, auto-login means they don't have to sign in again.

---

### 5. Caregivers who are also camp staff have two discrete accounts
**Status:** Not covered

The prototype doesn't address the dual-account scenario (same email, separate caregiver and staff Auth0 accounts with different MFA requirements). This is an identity architecture question — whether to merge accounts, add role switching, or keep them separate with clearer disambiguation. Not something the prototype can solve with UX alone.

**Worth noting:** This is likely a lower-frequency edge case compared to the other problems in this theme, but it's worth flagging for the Auth0 identity architecture discussion.

---

## Summary

| Problem | Status |
|---------|--------|
| Login vs Sign Up guessing game | Covered |
| Camps can't see account status | Covered |
| Wrong path → dead ends | Covered |
| Pre-Auth0 password expectations | Covered |
| Dual caregiver/staff accounts | Not covered |

**Strengths:**
- Identifier-first is the single biggest unlock — it eliminates the root cause of 3 out of 5 problems in this theme
- Account Lookup tool gives camps the visibility they've been asking for
- Forgot Password flow has no dead ends and auto-logs in after reset

**Gap:**
- **Dual caregiver/staff accounts** — an identity architecture question outside the scope of this prototype. Worth raising in the Auth0 implementation discussion.
