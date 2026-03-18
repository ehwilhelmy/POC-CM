# Auth Flow Prototypes — Design Kickoff

> Screen-by-screen walkthrough of each new design flow. Each screen has editable copy — update labels, messaging, and annotations directly.

**Live Prototype:** https://campminder-prototype.vercel.app
**Design Kickoff:** https://campminder-prototype.vercel.app/#/prototypes/auth0/design-kickoff

---

## Flow: New Account

**Prototype:** https://campminder-prototype.vercel.app/#/auth/new-parent

### 1. Camp Homepage

![](screenshots/new-account-step-01.png)

| Type | Copy |
|------|------|
| Screen | Camp homepage (not in scope) |
| Owner | Camp |

---

### 2. Welcome Screen

![](screenshots/new-account-step-02.png)

| Type | Copy |
|------|------|
| Title | Welcome |
| Subtext | Enter your email to get started. |
| Input label | Email address * |
| Placeholder | yourname@email.com |
| Button | Continue |
| Owner | Your team |

---

### 3. Create Account

![](screenshots/new-account-step-03.png)

| Type | Copy |
|------|------|
| Title | Create your [Camp Name] account |
| Notice | We didn't find an account for [email]. Fill in the details below to get started with [Camp Name]. |
| Input label | First name |
| Input label | Last name |
| Input label | Email |
| Input label | Password |
| Placeholder | Create a password |
| Input label | Confirm password |
| Placeholder | Re-enter your password |
| Button | Create Account |
| Link | Try another email |
| Owner | Your team |

---

### 4. Verify Email

![](screenshots/new-account-step-04.png)

| Type | Copy |
|------|------|
| Title | Verify your email |
| Subtext | We've sent a verification code to: [email] |
| Input label | Enter the 6-digit code * |
| Placeholder | 000000 |
| Button | Verify & Continue |
| Button (alt) | Check your email |
| Link | Didn't receive a code? Resend |
| Owner | Your team |

---

### 5. Auto Sign-in

![](screenshots/new-account-step-05.png)

| Type | Copy |
|------|------|
| Subtext | Setting up your account... |
| Owner | Your team |

---

### 6. Portal / Dashboard

![](screenshots/new-account-step-06.png)

| Type | Copy |
|------|------|
| Screen | CampInTouch portal (not in scope) |
| Owner | CIT team |

---

### Notes — New Account

- **Dynamic messaging:** Camp name and email are injected dynamically (e.g., "Create your Camp Tall Pines account", "We didn't find an account for erica@gmail.com"). Need to confirm how Auth0 templates handle this.
- **Password strength:** Validation already exists in Auth0. Team may only need to restyle the existing Auth0 screen rather than rebuild. Assess: configure Auth0 Universal Login vs. custom screen?
- **Email templates not in scope:** Verification email templates are not in scope for this phase. The Auth0 screens that reference emails (code entry, messaging) are in scope — just not the emails themselves.

---
---

## Flow: Returning Login

**Prototype:** https://campminder-prototype.vercel.app/#/auth/returning-parent

### 1. Camp Homepage

![](screenshots/returning-step-01.png)

| Type | Copy |
|------|------|
| Screen | Camp homepage (not in scope) |
| Owner | Camp |

---

### 2. Welcome Screen

![](screenshots/returning-step-02.png)

| Type | Copy |
|------|------|
| Title | Welcome |
| Subtext | Enter your email to get started. |
| Input label | Email address * |
| Placeholder | yourname@email.com |
| Button | Continue |
| Owner | Your team |

---

### 3. Password Entry

![](screenshots/returning-step-03.png)

| Type | Copy |
|------|------|
| Title | Welcome back, [name] |
| Subtext | Enter password for [email] |
| Input label | Password |
| Placeholder | Enter your password |
| Button | Continue |
| Link | Forgot password? |
| Owner | Your team |

---

### 4. Auto Sign-in

![](screenshots/returning-step-04.png)

| Type | Copy |
|------|------|
| Subtext | Signing you in... |
| Owner | Your team |

---

### 5. Portal / Dashboard

![](screenshots/returning-step-05.png)

| Type | Copy |
|------|------|
| Screen | CampInTouch portal (not in scope) |
| Owner | CIT team |

---

### Notes — Returning Login

- **Identifier-first routing:** The email lookup determines if the account exists and routes to password. Same entry point as all flows — branching logic is the key piece.
- **Personalized greeting:** "Welcome back, [name]" requires the email lookup to return the user's first name. Confirm Auth0 API returns this on identifier check.

---
---

## Flow: Forgot Password

**Prototype:** https://campminder-prototype.vercel.app/#/auth/forgot-password

### 1. Camp Homepage

![](screenshots/forgot-password-step-01.png)

| Type | Copy |
|------|------|
| Screen | Camp homepage (not in scope) |
| Owner | Camp |

---

### 2. Welcome Screen

![](screenshots/forgot-password-step-02.png)

| Type | Copy |
|------|------|
| Title | Welcome |
| Subtext | Enter your email to get started. |
| Input label | Email address * |
| Placeholder | yourname@email.com |
| Button | Continue |
| Owner | Your team |

---

### 3. Password Entry

![](screenshots/forgot-password-step-03.png)

| Type | Copy |
|------|------|
| Title | Welcome back, [name] |
| Subtext | Enter password for [email] |
| Input label | Password |
| Placeholder | Enter your password |
| Button | Continue |
| Link | Forgot password? |
| Owner | Your team |

---

### 4. Password Error

![](screenshots/forgot-password-step-04.png)

| Type | Copy |
|------|------|
| Title | Welcome back, [name] |
| Subtext | Enter password for [email] |
| Input label | Password |
| Error | The email or password for this account is incorrect |
| Button | Continue |
| Link | Forgot password? |
| Owner | Your team |

---

### 5. Reset Request

![](screenshots/forgot-password-step-05.png)

| Type | Copy |
|------|------|
| Title | Reset your password |
| Subtext | Enter your email address and we'll send you a code to create a new password. |
| Input label | Email address * |
| Placeholder | yourname@email.com |
| Button | Continue |
| Owner | Your team |

---

### 6. Check Email / Enter Code

![](screenshots/forgot-password-step-06.png)

| Type | Copy |
|------|------|
| Title | Check your email |
| Subtext | We sent a 6-digit code to [email] |
| Input label | Enter the 6-digit code * |
| Placeholder | 000000 |
| Button | Continue |
| Button (alt) | Check your email |
| Link | Didn't receive a code? Resend |
| Owner | Your team |

---

### 7. Create New Password

![](screenshots/forgot-password-step-07.png)

| Type | Copy |
|------|------|
| Title | Create new password |
| Banner | Resetting your password will update it for all camps connected to your account. Learn more |
| Input label | New password |
| Placeholder | Enter new password |
| Input label | Confirm new password |
| Placeholder | Re-enter your new password |
| Button | Update Password |
| Owner | Your team |

---

### 8. Success

![](screenshots/forgot-password-step-08.png)

| Type | Copy |
|------|------|
| Title | Password Changed! |
| Subtext | Your new password is set. Use it to sign in to any camp connected to your account. |
| Button | Go to My Account |
| Owner | Your team |

---

### 9. Portal / Dashboard

![](screenshots/forgot-password-step-09.png)

| Type | Copy |
|------|------|
| Screen | CampInTouch portal (not in scope) |
| Owner | CIT team |

---

### Notes — Forgot Password

- **Email templates not in scope:** Reset email templates are not in scope for this phase. Auth0 screens that reference emails are in scope — just not the emails themselves.
- **Multi-camp messaging:** "Resetting your password will update it for all camps connected to your account" — lives on the Create new password screen. Important for multi-camp caregivers. Doesn't exist in current experience.
- **Auto-login after reset:** Current flow dumps caregiver at a dead end after password change. New design auto-logs them in. Confirm Auth0 supports session creation after password reset.

---
---

## Flow: Claim Account

**Prototype:** https://campminder-prototype.vercel.app/#/auth/claim-account

### 1. Camp Homepage

![](screenshots/claim-account-step-01.png)

| Type | Copy |
|------|------|
| Screen | Camp homepage (not in scope) |
| Owner | Camp |

---

### 2. Welcome Screen

![](screenshots/claim-account-step-02.png)

| Type | Copy |
|------|------|
| Title | Welcome |
| Subtext | Enter your email to get started. |
| Input label | Email address * |
| Placeholder | yourname@email.com |
| Button | Continue |
| Owner | Your team |

---

### 3. Set Password

![](screenshots/claim-account-step-03.png)

| Type | Copy |
|------|------|
| Title | Set up your password |
| Notice | Great news! [Camp Name] has already set up your account for [email]. Create a password to activate it. |
| Input label | Password |
| Placeholder | Create a password |
| Input label | Confirm password |
| Placeholder | Re-enter your password |
| Button | Set Password |
| Link | Try another email |
| Owner | Your team |

---

### 4. Verify Email

![](screenshots/claim-account-step-04.png)

| Type | Copy |
|------|------|
| Title | Verify your email |
| Subtext | We've sent a verification code to: [email] |
| Input label | Enter the 6-digit code * |
| Placeholder | 000000 |
| Button | Verify & Continue |
| Button (alt) | Check your email |
| Link | Didn't receive a code? Resend |
| Owner | Your team |

---

### 5. Auto Sign-in

![](screenshots/claim-account-step-05.png)

| Type | Copy |
|------|------|
| Subtext | Activating your account... |
| Owner | Your team |

---

### 6. Portal / Dashboard

![](screenshots/claim-account-step-06.png)

| Type | Copy |
|------|------|
| Screen | CampInTouch portal (not in scope) |
| Owner | CIT team |

---

### Notes — Claim Account

- **Pre-created account detection:** Auth0 needs to detect that this email has a pre-created account with no password set and route to the "Set up your password" screen instead of signup or login.
- **No name fields needed:** Camp already provided name and camper info when pre-creating the account. Caregiver only sets a password — simpler flow than new account.
