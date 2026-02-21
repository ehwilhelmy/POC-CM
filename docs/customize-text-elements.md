# Auth0 Customize Text Elements

> Source: https://auth0.com/docs/customize/login-pages/universal-login/customize-text-elements

## Overview

Every piece of text on every Auth0 screen can be customized — titles, descriptions, button labels, error messages, placeholders. This is how we make Auth0 screens feel like a CampMinder experience.

## Configuration Methods

### Dashboard
**Branding > Universal Login > Advanced Options > Custom Text**
- Select prompt → select screen → edit text → preview → save

### Management API
- `GET /api/v2/prompts/{prompt}/custom-text/{language}` — read current text
- `PUT /api/v2/prompts/{prompt}/custom-text/{language}` — update text
- Requires `read:prompts` and `update:prompts` scopes
- Submitting `{}` deletes all customizations for that prompt

**Important:** The API replaces ALL text for a prompt in one call. Include all screens.

## Prompts & Screens Reference

### Login Prompts (Identifier First)

| Prompt | Screen | Purpose |
|--------|--------|---------|
| `login-id` | `login-id` | Email entry (first screen) |
| `login-password` | `login-password` | Password entry (returning user) |
| `signup-password` | `signup-password` | Create account (new user) |

### Other Key Prompts

| Prompt | Screen(s) | Purpose |
|--------|-----------|---------|
| `login` | `login` | Traditional login (email + password together) |
| `signup` | `signup` | Traditional signup |
| `reset-password` | `reset-password-email`, `reset-password-request`, `reset-password-success` | Password reset flow |
| `email-verification` | `email-verification-result` | Email verification status |
| `email-otp-challenge` | `email-otp-challenge` | Email OTP code entry |
| `mfa` | Various | Multi-factor auth screens |
| `consent` | `consent` | Authorization consent |
| `logout` | `logout` | Logout confirmation |
| `invitation` | `invitation` | Account invitation |
| `brute-force-protection` | `unblock` | Account locked/unblock |

### Customizable Text Keys Per Screen

Each screen has keys like:
- `pageTitle` — Main heading
- `description` — Subtitle/helper text
- `buttonText` — Primary action button
- `placeholder` — Input placeholder text
- Error messages for various failure states

### Example: login-id screen

```json
{
  "login-id": {
    "pageTitle": "Welcome to ${organization.display_name}",
    "description": "Enter your email to sign in or create an account.",
    "buttonText": "Continue",
    "emailPlaceholder": "yourname@email.com"
  }
}
```

### Example: signup-password screen

```json
{
  "signup-password": {
    "pageTitle": "Create your account",
    "description": "Set up your account to access ${organization.display_name}.",
    "buttonText": "Create Account"
  }
}
```

## Relevance to Prototype

Every heading, subtitle, and button label in the prototype auth screens should map to a specific Auth0 text key. This ensures:
1. Engineering knows exactly which text keys to customize
2. The prototype copy is directly implementable
3. Camp staff feedback on wording translates to specific API calls
