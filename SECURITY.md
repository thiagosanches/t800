# Security Policy

## Supported Versions

We are committed to keeping this project secure. We support the latest version of this project with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Known Vulnerabilities

### node-telegram-bot-api dependency chain

The `node-telegram-bot-api` library (versions 0.64.0+) depends on the deprecated `request` library through `@cypress/request-promise`. The `request` package was deprecated in 2020 and is no longer maintained.

**Current Status:**
- Severity: Moderate (4 vulnerabilities)
- Issue: Server-Side Request Forgery (SSRF) in the `request` library
- Mitigation: We have applied npm overrides to secure transitive dependencies (`form-data`, `tough-cookie`, `qs`)
- Remaining vulnerabilities are in the `request` package itself

**Why we can't fix it completely:**
1. The `node-telegram-bot-api` library is the official Node.js wrapper for Telegram Bot API
2. Downgrading to v0.63.0 would introduce breaking changes
3. The library maintainers are aware of the issue but haven't migrated away from `request` yet
4. Alternative Telegram bot libraries may not have the same feature set or stability

**Mitigation strategies in place:**
- We've upgraded all fixable transitive dependencies using npm overrides
- Reduced vulnerabilities from 8 (including 2 critical) to 4 moderate
- The SSRF vulnerability in `request` requires an attacker to control the URL being requested
- Our bot implementation doesn't expose URL control to end users

**Tracking:**
- Upstream issue: https://github.com/yagop/node-telegram-bot-api/issues/1274
- We monitor for updates and will migrate once a fix is available

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it by:

1. **Do NOT open a public issue**
2. Email the maintainer directly with details
3. Include steps to reproduce if possible
4. Allow up to 48 hours for an initial response

We take security seriously and will work to address valid vulnerabilities promptly.
