# Loom Script — Auth Flow Prototypes

Estimated total: ~8–10 min. You can record one Loom for all flows or one per flow — one per flow is easier for the team to review and comment on specific sections.

---

## Intro (30 sec)

> Hey team — I'm going to walk you through the auth flow prototypes we've been working on. These are interactive prototypes, not mockups — you can actually click through them.
>
> Quick context: after the Auth0 migration, we've been hearing from camp staff about caretakers getting confused during login, registration, and password reset. These prototypes address the specific pain points we've identified.
>
> I'll walk through each flow, explain the problem it solves, and show what we're proposing. I'd love your feedback — I'll drop a link in Notion where you can leave comments.

---

## Flow 1: New Caretaker Auth Flow (~2 min)

**Setup — start on the auth index page, click into New Caretaker**

> **The problem:** A new caretaker gets an invite from their camp, clicks through to register, and lands on an Auth0 login screen that looks nothing like the camp they just came from. They don't recognize it, don't trust it, and either drop off or call camp staff asking "where did I end up?"
>
> **What we're proposing:**

*Click "Parent Portal" on the camp website*

> The caretaker starts on the camp's website — this is familiar territory. When they click Parent Portal, they land on a login page that's branded to the camp. Same colors, same logo. There's no jarring transition to a generic Auth0 page.

*Click Continue on email entry*

> They enter their email — the system doesn't find an existing account, so we guide them straight into account creation. No confusing "sign up vs. log in" decision.

*Show the create account screen*

> They set a password right here, same branded experience. Hit Create Account...

*Click Create Account (fill passwords first if needed)*

> ...and now we need them to verify their email. Instead of just saying "check your email" and hoping for the best, we show them exactly what to look for.

*The Gmail popup auto-opens*

> And look — we preview what the email looks like in their inbox. Camp branded, recognizable sender. They click through, verify, and land in their portal.
>
> The key themes here are **multi-step friction** — reducing the number of confusing steps — and **branding & identity** — making sure caretakers always know where they are.

---

## Flow 2: Returning Caretaker Auth Flow (~1.5 min)

**Navigate back, click into Returning Caretaker**

> **The problem:** A caretaker who logged in last summer comes back and the login page looks completely different. They're not sure they're in the right place. The generic Auth0 branding gives them zero confidence they're logging into their camp.
>
> **What we're proposing:**

*Click "Parent Portal" on the camp website*

> Same starting point — camp website, Parent Portal. They land on a branded login page. Immediately they can see this is Camp Tall Pines.

*Click Continue on email entry*

> They enter their email. The system recognizes them — and now the password screen says "Welcome back, Jane." That small touch tells them: yes, we know you, you're in the right place.

*Show the password screen*

> They enter their password, hit Continue, and they're in.
>
> One thing to note: this flow focuses on the happy path. We're not proposing the forgot password experience here — that's a separate flow we'll look at next.
>
> The themes here are **branding & identity** and **account status confusion** — making sure returning caretakers feel recognized, not lost.

---

## Flow 3: Forgot Password Flow (~1.5 min)

**Navigate back, click into Forgot Password**

> **The problem:** Caretakers don't remember their password — or in some cases, never set one after migration. They don't know if they even have an account. The reset emails look unfamiliar, and the multi-step process loses people along the way.
>
> **What we're proposing:**

*Click "Parent Portal," then Continue on email*

> Starts the same — camp branded login, enter email. But this time they can't remember their password.

*Enter a wrong password, click Continue*

> They try a wrong password and get a clear error — not a vague "something went wrong," but a message that tells them what happened and what to do next.

*Click "Forgot password?"*

> They click forgot password. We confirm what email the reset is going to — no guessing.

*Click Continue to send the reset*

> Hit Continue, and now we show them what to expect.

*The Gmail popup auto-opens*

> And again, we show the actual email in their inbox. Camp branded, clear subject line, obvious call to action. They click through, enter a new code, set a new password, and they're back in.
>
> Themes: **multi-step friction** — each step is clear about what's happening and what's next — and **account status confusion** — we never leave them wondering "do I even have an account?"

---

## Flow 4: Guest Account Flow (~2 min)

**Navigate back, click into Guest Account**

> **The problem:** This is a different kind of user entirely. Grandparents, co-caretakers — people who aren't the primary account holder. They receive a guest invite email and have no idea what campminder is. The current messaging doesn't explain what they're signing up for, what access they'll have, or why they need another account. A lot of them just ignore the email.
>
> **What we're proposing:**

*Show the CampInTouch dashboard*

> It starts from the primary caretaker's side. Jane is logged into her dashboard and wants to invite Grandma to see Tommy's camp updates.

*Click Guest Accounts, then submit the invite*

> She goes to Guest Accounts, adds Grandma's email, and can even include a personal note — "Hi Grandma! This is Tommy's new camp, you can see videos, photos, and send him a personal message."

*Show the email popup when it appears*

> Now we switch to Grandma's perspective. She gets an email — and this is key — it's not a generic "create an account" email. It says who invited her, what she'll be able to do, and includes Jane's personal note. That context makes all the difference.

*Click "Create Guest Account" in the email*

> She clicks through, creates a simple account — name, password, done — and lands in a guest dashboard scoped to what she can actually see.
>
> Themes: **broken messages** — fixing the emails and copy so guests actually understand what they're being invited to — and **multi-step friction** — keeping the guest signup as simple as possible.

---

## Flow 5: Campanion Branding Login Confusion (~1 min)

**Navigate back, click into Campanion**

> **The problem:** Caretakers open the Campanion mobile app and see a generic Auth0 screen with no Campanion branding. They don't understand that one login covers all their camps, and the disconnect between the app and the login page creates confusion.
>
> **What we're proposing:**

*Show the Campanion login screen*

> When a caretaker opens Campanion, the login is Campanion-branded. Not Auth0, not a random camp — Campanion. This makes sense because Campanion is the multi-camp app. One login, all their camps.

*Click through the login*

> They enter their email, their password, and they're in. The branding is consistent from app icon to login to dashboard.
>
> The theme here is **branding & identity** — the login should match the app you're logging into.

---

## Wrap-up (30 sec)

> That's all five flows. To recap:
>
> - **New Caretaker** — branded registration that builds trust from step one
> - **Returning Caretaker** — familiar, recognizable login that says "welcome back"
> - **Forgot Password** — clear recovery with branded emails at every step
> - **Guest Account** — contextual invites that explain what campminder is and why Grandma should care
> - **Campanion** — login branding that matches the app
>
> I've also included branded email previews and a few reference screens in the prototype if you want to dig deeper.
>
> Drop your feedback in the Notion doc — I'm looking for gut reactions, things that feel off, and anything that doesn't match what you're hearing from camps. Thanks!
