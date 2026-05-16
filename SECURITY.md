# Security Policy

## Scope

Finance App is a **client-side only** application. All user data (XP, progress, lesson history) is stored exclusively in the browser's LocalStorage. There is no backend, no user accounts, and no data transmitted to any server.

The attack surface is therefore limited to:
- The Next.js/React rendering pipeline
- Third-party npm dependencies
- Browser storage access

## Reporting a Vulnerability

If you discover a security vulnerability, please use [GitHub's private vulnerability reporting](https://github.com/MaximeFARRE/finance-app/security/advisories/new) rather than opening a public issue.

Please include:
- A description of the vulnerability
- Steps to reproduce
- Potential impact

You can expect an acknowledgement within 72 hours.

## Supported Versions

Only the latest commit on `main` is actively maintained.
