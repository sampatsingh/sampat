# Contributing to Portfolio

First off, thanks for taking the time to contribute! This document describes the engineering standards and workflows for maintaining this codebase.

## 🏗️ Architecture Philosophy

This project adheres to strict architectural principles:

- **Mobile-First**: All CSS begins with mobile styles. `@media (min-width)` queries are used *exclusively* to add complexity for larger screens.
- **Zero-Dependency**: We avoid libraries (Bootstrap, jQuery) unless absolutely necessary.
- **Semantic HTML**: Use correct tags (`<nav>`, `<article>`, `<section>`) for maximum accessibility.

## 💻 Coding Standards

### HTML

- Use 2 spaces for indentation.
- Ensure all images have `alt` text.
- Use `aria-label` for icon-only buttons.
- IDs should be kebab-case (`my-section-id`).

### CSS

- **Variables First**: Never hardcode colors or spacing. Use `var(--color-...)` and `var(--spacing-...)`.
- **Class Naming**: Use BEM-ish convention (e.g., `.card`, `.card-header`, `.card-icon`).
- **Organization**: Group CSS by component (Header, Hero, Footer).
- **Z-Index**: Manage z-indices carefully to avoid stacking context wars.

### JavaScript

- Use modern ES6+ syntax (`const`, `let`, Arrow Functions).
- Avoid global variables.
- Comment complex logic.
- Use `querySelector` over `getElementById` unless performance is critical.

## 🔄 Git Workflow

We follow the **Conventional Commits** specification:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance

## 🧪 Testing

Before submitting a PR:

1. Validate HTML via W3C Validator.
2. Check responsiveness on Mobile (375px), Tablet (768px), and Desktop (1440px).
3. Verify Dark Mode contrast and visibility.
4. Ensure no console errors exist.

## 🚀 Deployment

The `main` branch is automatically deployed to production. Ensure your PR is tested thoroughly before merging.
