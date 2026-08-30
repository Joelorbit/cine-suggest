---
name: security
description: >-
  Security engineering for threat modeling, trust boundaries, authentication, authorization, secrets, uploads, and AI safety.
  Activate when handling untrusted input, identity, permissions, sensitive data, files, tools, or security-sensitive design.
---

# Security: Threats and Controls

## Default workflow

1. Identify assets, actors, trust boundaries, data sensitivity, intended actions, and abuse cases.
2. Trace every untrusted value from ingress to storage, rendering, command execution, logging, and outbound requests.
3. Choose controls at the boundary and again at the action or resource boundary; prefer deny-by-default behavior.
4. Verify the control with a focused test or reproducible check, and document residual risk and operational response.

## Trust-boundary rules

Treat user input, path/query parameters, headers, cookies, uploaded files, browser state, external responses, and LLM output as untrusted. Validate type, format, length, range, encoding, and ownership before use. Escape for the target context rather than relying on a generic “sanitize” step. Never execute raw model output as code or shell input.

| Risk | Required baseline |
| --- | --- |
| Injection | Parameterize SQL; avoid shell execution; use safe template and serialization APIs. |
| XSS | Context-appropriate output encoding, safe HTML policies, and a restrictive CSP. |
| CSRF | SameSite cookies plus anti-CSRF protection for cookie-authenticated state changes. |
| SSRF | Allowlist outbound destinations, block private address ranges, and limit redirects. |
| IDOR/BOLA | Authorize the requested action against the resource on the server for every access. |
| Path traversal | Canonicalize paths, enforce an allowed root, and generate storage names server-side. |
| DoS | Bound body size, file size, pagination, concurrency, regex complexity, and work time. |

## Identity and authorization

Hash passwords with a current password-hashing scheme such as Argon2id or bcrypt; never store plaintext. Use short-lived access credentials, secure HttpOnly cookies where appropriate, and `Secure` plus an intentional `SameSite` policy. Use OAuth `state` and PKCE for public clients. Rate-limit login, reset, token, and other abuse-prone endpoints without creating account-enumeration leaks.

Enforce authorization server-side on every request. Check the action, tenant, resource ownership, and current state at the point of access. Prefer explicit permission policies over scattered role checks. Client-side hiding is presentation only.

## Secrets, files, and privacy

Never commit credentials, private keys, tokens, or production `.env` files. Load secrets through the deployment secret manager and keep `.env.example` blank or fictional. Redact credentials, authorization headers, payment data, and unnecessary PII from logs and prompts. For uploads, validate magic bytes and size, rename to a server-generated identifier, store outside executable public paths, scan when appropriate, and serve through short-lived signed URLs.

## AI and tool safety

Treat prompts, retrieved documents, and model output as data, not authority. Keep system policy separate from retrieved content, validate tool arguments against a strict schema, require confirmation for destructive or external side effects, enforce allowlists and budgets, and log decisions without storing sensitive prompt content unnecessarily.

## Done when

The threat model names assets and abuse cases, controls are placed at the right boundaries, security-sensitive behavior has tests or checks, secrets are absent from the diff and logs, and residual risk has an owner or mitigation plan.
