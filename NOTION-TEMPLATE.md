# Auth Flow Prototypes — Internal Review

> We've built interactive prototypes addressing the top caregiver pain points after the Auth0 migration. Please review the flows below and leave your feedback — gut reactions, things that feel off, and anything that doesn't match what you're hearing from camps.

**Live Prototype:** [link to GitHub Pages]
**Figma File:** [link to Figma]

---

## How to Review

1. Watch the Loom walkthrough for each flow (~1–2 min each)
2. Click through the live prototype yourself if you want to explore
3. Leave feedback in the table at the bottom — or comment directly on this page

---

## Flow 1: New Caregiver Auth Flow

| | |
|---|---|
| **Problem** | New caregivers get an invite from camp, click through to register, and hit an Auth0 login screen that looks nothing like their camp. They don't recognize it, don't trust it, and drop off — or call camp staff confused about where they ended up. |
| **Proposed Journey** | Gets invite from camp → visits camp website → registers → creates account → gets verified → lands in portal. |
| **Themes** | `Multi-Step Friction` `Branding & Identity` |
| **Loom** | [link] |
| **Figma** | [link to Figma frame] |
| **Prototype** | [link to flow] |

---

## Flow 2: Returning Caregiver Auth Flow

| | |
|---|---|
| **Problem** | Caregivers who logged in last summer come back and the login page looks completely different. They're not sure they're in the right place, can't tell if they already have an account, and the generic Auth0 branding gives them no confidence they're logging into their camp. |
| **Proposed Journey** | Returns to camp site → enters email* → enters password → lands in portal. |
| **Themes** | `Branding & Identity` `Account Status Confusion` |
| **Loom** | [link] |
| **Figma** | [link to Figma frame] |
| **Prototype** | [link to flow] |

> *\* This flow does not directly propose the forgot password and potential for new system in place.*

---

## Flow 3: Forgot Password Flow

| | |
|---|---|
| **Problem** | Caregivers don't remember their password — or never set one after migration. They don't know if they even have an account, the reset emails look unfamiliar, and the multi-step process loses people along the way. |
| **Proposed Journey** | Can't remember password → requests reset → receives branded email → enters code → sets new password → back to login. |
| **Themes** | `Multi-Step Friction` `Account Status Confusion` |
| **Loom** | [link] |
| **Figma** | [link to Figma frame] |
| **Prototype** | [link to flow] |

---

## Flow 4: Guest Account Flow

| | |
|---|---|
| **Problem** | Grandparents and co-caregivers receive a guest invite email but have no idea what campminder is. The messaging doesn't explain what they're signing up for, what access they'll have, or why they need yet another account. Many ignore the email entirely. |
| **Proposed Journey** | Primary caregiver invites a guest from their dashboard → guest receives email with personal note → creates account → lands in limited portal. |
| **Themes** | `Broken Messages` `Multi-Step Friction` |
| **Loom** | [link] |
| **Figma** | [link to Figma frame] |
| **Prototype** | [link to flow] |

---

## Flow 5: Campanion Branding Login Confusion

| | |
|---|---|
| **Problem** | Caregivers open the Campanion mobile app and see a generic Auth0 screen with no Campanion branding. They don't understand that one login covers all their camps, and the disconnect between the app and the login page creates confusion. |
| **Proposed Journey** | Caregiver opens the Campanion mobile app → logs in → one login, all their camps — Campanion branding gives multi-camp context. |
| **Themes** | `Branding & Identity` |
| **Loom** | [link] |
| **Figma** | [link to Figma frame] |
| **Prototype** | [link to flow] |

---

## Reference Screens

These are supporting screens included in the prototype for context:

| Screen | Description | Link |
|--------|-------------|------|
| Branded Emails | Verification, password reset, invitation, and guest invite emails in a Gmail inbox mockup | [link] |
| Account Lookup | Camp staff tool to search caregiver email and see account status | [link] |
| Expired Link | What caregivers see when a verification or reset link has expired | [link] |

---

## Feedback

Please add your name, which flow(s) you reviewed, and your thoughts:

| Name | Flow(s) | What feels right | What feels off | Questions / Ideas |
|------|---------|-----------------|----------------|-------------------|
| | | | | |
| | | | | |
| | | | | |
| | | | | |

### Key questions we'd love input on:

1. **Branding** — Does the camp-branded login feel trustworthy? Would this reduce the "where am I?" calls from caregivers?
2. **Guest flow** — Does the personal note from the primary caregiver make the guest invite feel less like spam?
3. **Forgot password** — Is the branded email preview (showing what to look for in your inbox) helpful or overkill?
4. **Campanion** — Does Campanion-branded login make the multi-camp experience clearer?
5. **Anything missing?** — Are there scenarios or edge cases we're not covering that camps are asking about?
