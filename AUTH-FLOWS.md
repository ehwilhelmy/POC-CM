# Auth Flow Prototypes

Caretaker journey prototypes for user testing. Each flow walks through a real scenario camp staff are dealing with after the Auth0 migration.

---

## Caretaker Journeys

### 1. New Caretaker Auth Flow

**Problem:** New parents get an invite from camp, click through to register, and hit an Auth0 login screen that looks nothing like their camp. They don't recognize it, don't trust it, and drop off — or they call camp staff confused about where they ended up.

**Journey:** Gets invite from camp, visits camp website, registers, creates account, gets verified, lands in portal.

**Proposal focuses on:**
`Multi-Step Friction` `Branding & Identity`

---

### 2. Returning Caretaker Auth Flow

**Problem:** Parents who logged in last summer come back and the login page looks completely different. They're not sure they're in the right place, can't tell if they already have an account, and the generic Auth0 branding gives them no confidence they're logging into their camp.

**Journey:** Returns to camp site, enters email*, enters password, lands in portal.

> \* This flow does not directly propose the forgot password and potential for new system in place.

**Proposal focuses on:**
`Branding & Identity` `Account Status Confusion`

---

### 3. Forgot Password Flow

**Problem:** Parents don't remember their password — or never set one after migration. They don't know if they even have an account, the reset emails look unfamiliar, and the multi-step process (request reset → check email → enter code → new password) loses people along the way.

**Journey:** Can't remember password, requests reset, receives branded email, enters code, sets new password, back to login.

**Proposal focuses on:**
`Multi-Step Friction` `Account Status Confusion`

---

### 4. Guest Account Flow

**Problem:** Grandparents and co-parents receive a guest invite email but have no idea what campminder is. The messaging doesn't explain what they're signing up for, what access they'll have, or why they need yet another account. Many ignore the email entirely.

**Journey:** Primary caretaker invites a guest (grandparent, co-parent) from their dashboard. Guest receives email, creates account, lands in limited portal.

**Proposal focuses on:**
`Broken Messages` `Multi-Step Friction`

---

### 5. Campanion App Flow

**Problem:** Parents open the Campanion mobile app and see a generic Auth0 screen with no Campanion branding. They don't understand that one login covers all their camps, and the disconnect between the app and the login page creates confusion.

**Journey:** Parent opens the Campanion mobile app and logs in. One login, all their camps — Campanion branding gives multi-camp context.

**Proposal focuses on:**
`Branding & Identity`

---

## Reference Tools

### Branded Emails

Preview camp-branded transactional emails: verification, password reset, invitation, and guest invite.

### Account Lookup

Camp staff tool to search parent email and see account status.

### Expired Link

What caretakers see when a verification or reset link has expired. Clear recovery, no dead ends.
