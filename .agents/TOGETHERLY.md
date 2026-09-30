# TOGETHERLY — PORTFOLIO PRODUCT PAGE IMPLEMENTATION

## 1. PURPOSE

This document defines how Togetherly should be added to the existing website.

Before implementation:

1. Inspect the existing website/project completely.
2. Understand its current stack, routing, components, typography, responsive system and design language.
3. Preserve all existing working pages and functionality.
4. Do NOT redesign the existing portfolio.
5. Implement Togetherly as a new branded product/business experience inside the existing codebase.

The goal is to create a professional public presence for Togetherly and its first digital product:

**Togetherly — Couples Money Planner**

This page will initially be used to:

- present the Togetherly brand
- present the Couples Money Planner
- show the real product visually
- explain its features
- provide access to a safe demo/preview
- give Lemon Squeezy a legitimate product page to review
- later connect the Buy button to Lemon Squeezy checkout
- eventually support SEO and additional Togetherly products

Do NOT implement fake payment processing.

---

# 2. BRAND

Brand name:

# Togetherly

Brand idea:

**Money made simpler, life more together.**

Togetherly creates simple financial planning systems for couples.

The brand should feel:

- warm
- premium
- trustworthy
- modern
- calm
- relationship-oriented
- financially responsible
- approachable

It should NOT feel:

- corporate banking
- crypto
- fintech trading
- childish
- overly feminine
- generic SaaS
- wedding-only
- spreadsheet-template marketplace

Togetherly should be able to expand later into:

- Couples Money Planner
- Shared Expense Planner
- Bill Splitter
- Savings Planner
- House Deposit Planner
- Wedding Budget Planner
- Moving-In Money Planner
- Debt Payoff Planner
- Annual Couples Money Review
- calculators
- financial planning tools
- potentially a software product later

Therefore, do NOT make the brand identity dependent on one spreadsheet.

---

# 3. LOGO

Use the provided Togetherly logo assets from the project.

The logo symbol represents:

- two people
- partnership
- a heart
- growth/leaves
- building something together

Do NOT recreate or replace the approved logo.

Support appropriate logo variants depending on background:

- green + peach version
- white + peach version
- icon-only version where appropriate

Maintain sufficient whitespace around the logo.

---

# 4. BRAND COLORS

Use these colors as the starting Togetherly brand system:

```ts
const togetherlyTheme = {
  cream: "#F7F0E4",
  forest: "#174F4A",
  teal: "#2C7A73",
  peach: "#F29B7F",
  peachLight: "#F6C2B0",
  sage: "#91B7A0",
  text: "#243B38",
  muted: "#6F7F7C",
  white: "#FFFFFF",
};