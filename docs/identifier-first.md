# Auth0 Identifier First Authentication

> Source: https://auth0.com/docs/authenticate/login/auth0-universal-login/identifier-first

## Overview

A two-step authentication approach where users first provide their identifier (email), then their authentication method. This mirrors experiences like Google's login flow.

## How It Works

This method works exclusively with the **New Universal Login Experience**. Key flow:

1. User enters their **email address** on the first screen (`login-id` prompt)
2. Auth0 checks if the email matches a known account
3. **If recognized** → show password screen (`login-password` prompt)
4. **If not recognized** → show signup screen (`signup-password` prompt)
5. Enterprise domain matches can trigger IdP redirects (Home Realm Discovery)

## Auth0 Prompts Involved

| Prompt | Screen | When Shown |
|--------|--------|------------|
| `login-id` | Email entry | Always first — user enters email |
| `login-password` | Password entry | Email recognized as existing account |
| `signup-password` | Create account | Email not found — new user |
| `reset-password` | Password reset | User clicks "Forgot password" |

## Configuration

Access via **Dashboard > Authentication > Authentication Profile**, then select from:

1. **Identifier + Password** — Both fields on one screen (traditional)
2. **Identifier First** — Email first, then routes to password or signup
3. **Identifier First + Biometrics** — Adds WebAuthn/passkey support

## Key Constraint

Auth0's Identifier First flow does **not** do an account lookup and then branch to "new" vs. "returning" on the same screen. The default behavior is:

- Enter email → if recognized → show password screen
- Enter email → if not recognized → show signup screen

This is a **config toggle**, not custom code.

## Home Realm Discovery

For enterprise SSO routing:
1. Navigate to Dashboard > Authentication > Enterprise
2. Select your connection
3. Configure up to 1000 domains
4. User's email domain automatically routes to the correct IdP

## Relevance to CampMinder Prototype

The prototype's "email-first unified entry" maps directly to Auth0's Identifier First:
- **Email entry screen** = `login-id` prompt
- **Returning parent (password)** = `login-password` prompt
- **New parent (create account)** = `signup-password` prompt
- **Forgot password** = `reset-password` prompt

This means the email-first pattern is **natively supported** — it's a configuration change, not custom development.
