# Auth0 Universal Login Page Templates

> Source: https://auth0.com/docs/customize/login-pages/universal-login/customize-templates

## Overview

Liquid templates that wrap the Auth0 authentication widget. This is how you inject camp logo, colors, and background around the login form. **Requires a custom domain.**

## How It Works

Templates control the **page surrounding** the Auth0 widget (login form). The widget itself is rendered by Auth0 — you control everything around it: background, header, footer, layout.

## Required Tags

Every template must include:
- `{%- auth0:head -%}` — Required rendering scripts (in `<head>`)
- `{%- auth0:widget -%}` — The authentication form (in `<body>`)

## Minimal Template

```liquid
<!DOCTYPE html>
{% assign resolved_dir = dir | default: "auto" %}
<html lang="{{locale}}" dir="{{resolved_dir}}">
  <head>
    {%- auth0:head -%}
  </head>
  <body class="_widget-auto-layout">
    {%- auth0:widget -%}
  </body>
</html>
```

## Template Variables (for camp branding)

### Organization Data (per-camp branding)
- `organization.display_name` — Camp name
- `organization.branding.logo_url` — Camp logo
- `organization.branding.colors.primary` — Camp accent color
- `organization.branding.colors.page_background` — Page background color/image
- `organization.metadata` — Custom data (could store camp-specific info)

### Application Context
- `application.name` — App name (CampInTouch, Campanion)
- `application.logo_url` — App logo
- `application.metadata` — Custom app data

### Branding (tenant-level fallback)
- `branding.logo_url` — Default logo
- `branding.colors.primary` — Default primary color
- `branding.colors.page_background` — Default background

### Page Context
- `prompt.name` — Current auth step (login, signup, mfa, etc.)
- `prompt.screen.name` — Specific screen within the prompt
- `prompt.screen.texts` — Localized text strings

## Camp-Branded Template Concept

```liquid
<!DOCTYPE html>
<html lang="{{locale}}">
  <head>
    {%- auth0:head -%}
    <style>
      body {
        background-color: {{ organization.branding.colors.page_background | default: '#f2f2f2' }};
        /* Could also use a background image */
      }
      .camp-header {
        background-color: {{ organization.branding.colors.primary | default: '#2d6a4f' }};
      }
    </style>
  </head>
  <body class="_widget-auto-layout">
    <div class="camp-header">
      <img src="{{ organization.branding.logo_url }}" alt="{{ organization.display_name }}" />
      <span>{{ organization.display_name }}</span>
    </div>
    {%- auth0:widget -%}
    <footer>Powered by CampMinder</footer>
  </body>
</html>
```

## Important Limitations

- CSS class names on the widget change with each Auth0 build — don't target them
- HTML structure of the widget may change — don't depend on DOM structure
- Updates are done via Management API v2, not the dashboard
- Custom domain is mandatory

## Relevance to Prototype

The `AuthLayout` component in the prototype mirrors this template pattern:
- Camp branding header (logo, name, accent color) = `organization.branding.*`
- Auth widget content area = `{%- auth0:widget -%}`
- "Powered by CampMinder" footer = template footer
- Per-camp colors/logos = Auth0 Organizations feature
