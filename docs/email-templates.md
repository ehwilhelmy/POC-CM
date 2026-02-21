# Auth0 Email Templates

> Source: https://auth0.com/docs/customize/email/email-templates

## Overview

Auth0 transactional emails are fully customizable with HTML + Liquid templating. Customization requires an **external SMTP provider** (not Auth0's built-in).

## Available Email Templates

| Template | Trigger | Key Content |
|----------|---------|-------------|
| **Verification Link** | First signup/login | Email verification link |
| **Verification Code** | Code-based verification | 6-digit authentication code |
| **Welcome** | Email verified or signup complete | Welcome message |
| **Change Password Link** | User-initiated reset | Password reset link |
| **Change Password Code** | User-initiated reset | Reset code |
| **Blocked Account** | Brute-force protection triggered | Account re-enablement link |
| **Password Breach Alert** | Compromised password detected | Warning notice |
| **MFA Enrollment** | Admin sends Guardian invite | MFA setup link |
| **MFA Verification Code** | Email-based MFA | Verification code |
| **Passwordless OTP** | Passwordless email login | One-time passcode |
| **User Invitation** | Organization/app invite | Join/accept link |

## Liquid Template Variables

### Common Variables (most templates)
- `{{ user.email }}` — User's email
- `{{ user.name }}` — User's display name
- `{{ user.given_name }}` — First name
- `{{ user.family_name }}` — Last name
- `{{ application.name }}` — App name (CampInTouch)
- `{{ organization.display_name }}` — Camp name
- `{{ organization.branding.logo_url }}` — Camp logo
- `{{ url }}` — Action URL (verify link, reset link, etc.)
- `{{ code }}` — Verification/reset code

### Conditional Logic
```liquid
{% if organization %}
  Welcome to {{ organization.display_name }}!
{% else %}
  Welcome to CampMinder!
{% endif %}
```

## Camp-Branded Email Concept

```html
<div style="max-width: 500px; margin: 0 auto; font-family: sans-serif;">
  <!-- Camp header -->
  <div style="background-color: {{ organization.branding.colors.primary }}; padding: 20px; text-align: center;">
    <img src="{{ organization.branding.logo_url }}" alt="{{ organization.display_name }}" height="40" />
  </div>

  <!-- Content -->
  <div style="padding: 32px 24px;">
    <h1>Verify your email for {{ organization.display_name }}</h1>
    <p>Hi {{ user.given_name | default: "there" }},</p>
    <p>Thanks for creating your account with {{ organization.display_name }} on CampMinder.</p>
    <a href="{{ url }}" style="background: {{ organization.branding.colors.primary }}; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block;">
      Verify Email
    </a>
  </div>

  <!-- Footer -->
  <div style="padding: 16px 24px; border-top: 1px solid #eee; color: #999; font-size: 12px;">
    Powered by CampMinder
  </div>
</div>
```

## Important Limitations

- Customization requires external SMTP (not Auth0's built-in provider)
- One template per email type (use Liquid conditionals for variations)
- HTML only — no plain text
- From address cannot be `@auth0.com`
- MFA enrollment template lacks `connection.name`

## Relevance to Prototype

The `EmailPreviewFlow` in the prototype shows what branded emails should look like:
- Camp name/logo in header = `{{ organization.display_name }}` + `{{ organization.branding.logo_url }}`
- Camp accent color = `{{ organization.branding.colors.primary }}`
- "From: Camp Tall Pines via CampMinder" = achievable via SMTP sender config
- Clear CTA buttons with camp color = standard Liquid template
