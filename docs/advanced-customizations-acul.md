# Auth0 Advanced Customizations (ACUL)

> Source: https://auth0.com/docs/customize/login-pages/advanced-customizations

## Overview

ACUL lets you build **fully custom login screens** in React (or Vue, Angular, etc.) that replace Auth0's default UI entirely. This is the nuclear option — maximum control, maximum lift.

## When to Use ACUL (vs. Templates)

Use ACUL if you need:
- **Multi-branding** — different brands within one Auth0 tenant
- **Complex UI** — beyond what Liquid templates + text customization support
- **Analytics integration** — Heap, Mixpanel, A/B testing on auth screens
- **Localization** — languages Auth0 doesn't support natively
- **Custom logic** — complex conditional UI flows

Use **Page Templates + Text Customization** if:
- You need camp branding (logo, colors, background)
- You need custom copy on screens
- The standard Auth0 widget layout works for you

## Architecture

### Build Time
1. Develop custom screens using ACUL SDK + your framework (React)
2. CI/CD compiles to static JS + CSS assets
3. Upload to your private CDN

### Runtime
1. User hits Auth0 login page
2. Browser loads minimal host page from Auth0
3. Host page references your CDN-hosted JS/CSS (with SRI hashes)
4. Your custom UI renders and handles the auth flow

## Requirements
- Auth0 dev tenant with Universal Login enabled
- Custom domain configured
- CDN with CI/CD pipeline
- First Party Application in Auth0

## Supported Prompts (screens you can customize)

Based on Auth0 docs, ACUL supports custom screens for:
- `login-id` — Email/identifier entry
- `login-password` — Password entry
- `signup` / `signup-password` — Account creation
- `reset-password` — Password reset
- `mfa` — Multi-factor authentication
- `consent` — Authorization consent
- And others

## Relevance to Prototype

ACUL is relevant if:
- Page Templates aren't enough for the camp-branded experience
- We want pixel-perfect control over every screen
- We need the auth screens to feel truly custom (not just themed Auth0)

However, it's a **significantly heavier engineering lift**. The recommendation:
1. **Start with Page Templates + Text Customization** (covers 80% of needs)
2. **Evaluate ACUL** only if template limitations block the experience

The prototype should demonstrate what the **ideal** experience looks like. Engineering can then determine whether templates or ACUL is needed to achieve it.
