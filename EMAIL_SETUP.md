# Email Setup

This document covers domain verification, deliverability configuration, and email best practices for Moonlight Web Designs.

---

## Resend — domain verification

All transactional emails are sent via [Resend](https://resend.com). Before sending from a custom domain, verify `moonlightwebdesigns.com` in the Resend dashboard.

### Steps

1. Log in to [resend.com](https://resend.com) and open **Domains**.
2. Click **Add Domain** and enter `moonlightwebdesigns.com`.
3. Resend will show DNS records to add. Add them to your DNS provider (Vercel DNS, Cloudflare, etc.).
4. Click **Verify** — DNS propagation can take up to 48 hours.

---

## DNS records (SPF, DKIM, DMARC)

Add these records to your DNS provider. Resend will show the exact values after you add your domain.

### SPF

```
Type:  TXT
Name:  @
Value: v=spf1 include:amazonses.com ~all
```

Resend routes through Amazon SES. The `include:amazonses.com` authorises Resend to send on behalf of your domain.

### DKIM

Resend provides two CNAME records for DKIM. They look like:

```
Type:  CNAME
Name:  resend._domainkey
Value: resend._domainkey.amazonses.com

Type:  CNAME
Name:  (second DKIM selector)
Value: (provided by Resend)
```

Add both CNAME records exactly as shown in the Resend dashboard.

### DMARC

```
Type:  TXT
Name:  _dmarc
Value: v=DMARC1; p=none; rua=mailto:contact.eterlab@gmail.com
```

Start with `p=none` (report only) while verifying deliverability. Upgrade to `p=quarantine` once emails are confirmed to reach inboxes correctly.

---

## Sender addresses

| Purpose | Address | Set via |
|---|---|---|
| Transactional (client-facing) | `hello@moonlightwebdesigns.com` | `MOONLIGHT_FROM_EMAIL` env var |
| Internal admin notifications | `contact.eterlab@gmail.com` | `MOONLIGHT_ADMIN_EMAIL` env var |

### Recommended: use hello@moonlightwebdesigns.com as the from address

Update `MOONLIGHT_FROM_EMAIL` in Vercel to `hello@moonlightwebdesigns.com` once the domain is verified in Resend. This gives clients a professional, branded sender and enables reply-to functionality.

Until the domain is verified, Resend requires the from address to use their verified domain (e.g. `onboarding@resend.dev` for free plans). Set `MOONLIGHT_FROM_EMAIL` to your Resend-provided address during testing.

---

## Email types sent

| Email | Trigger | Recipient |
|---|---|---|
| Subscription active | `BILLING.SUBSCRIPTION.ACTIVATED` webhook | Client |
| New subscription (internal) | Same webhook | Admin |
| Cancellation alert | `BILLING.SUBSCRIPTION.CANCELLED` webhook | Admin |
| Suspension/expiry alert | Suspension/expiry webhooks | Admin |
| Payment denied/refunded | Payment webhooks | Admin |
| Portal login link | Client requests magic link at `/portal` | Client |

---

## Testing deliverability

Before sending to real clients:

1. **Test with Gmail** — Send to a Gmail address and check the inbox (not spam) and check the email headers (`View original`) to confirm SPF/DKIM/DMARC pass.
2. **Test with mail-tester.com** — Send a test email to the address provided and check the score.
3. **Check Resend logs** — Resend provides delivery logs showing bounces, spam complaints, and open rates.

### Common deliverability issues

- **Missing DKIM/SPF** — Most common cause of spam classification. Verify DNS records are live before sending at volume.
- **Spammy copy** — Avoid all-caps, excessive exclamation marks, "FREE!", etc. The portal login email is clean and transactional, which helps.
- **Cold domain** — New domains with no sending history may be filtered initially. Start with low volume (a few emails per day) and ramp up.
- **Unsubscribe link** — Transactional emails (receipts, login links) do not require an unsubscribe link. Marketing emails do.

---

## Text/plain fallback

All emails sent via `src/lib/email.ts` include both an HTML and a plain-text version (`text` field). This ensures delivery in environments that don't support HTML and improves spam scores.

---

## Reply-to

Magic link emails and welcome emails are sent from `hello@moonlightwebdesigns.com`. Clients can reply directly to that address for support. Ensure `hello@moonlightwebdesigns.com` is monitored.

---

## Environment variables

| Variable | Purpose | Default |
|---|---|---|
| `RESEND_API_KEY` | Resend API key | — (required; emails skipped if absent) |
| `MOONLIGHT_FROM_EMAIL` | Sender address for client emails | `noreply@moonlightwebdesigns.com` |
| `MOONLIGHT_ADMIN_EMAIL` | Recipient for internal admin alerts | `contact.eterlab@gmail.com` |
