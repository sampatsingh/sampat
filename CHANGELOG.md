# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-15

### Added

- **Dark Mode System**: Native implementation with Local Storage persistence and system preference detection.
- **Vector Iconography**: Integrated [Remix Icon](https://remixicon.com/) for UI elements and [Devicon](https://devicon.dev/) for tech stack branding.
- **Animations**: Added `reveal-on-scroll` observer and spring-physics hover effects.
- **SEO Enhancements**: Added JSON-LD Structured Data, OpenGraph meta tags, Twitter Cards, `sitemap.xml`, and `robots.txt` optimized for `sampat.vercel.app`.
- **Professional Documentation**: Created `README.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, and `LICENSE` (MIT).
- **Fluid Typography**: Implemented `clamp()` based font scaling for seamless resizing.

### Changed

- **Architecture**: Refactored entire CSS codebase to a **Mobile-First** approach.
- **Footer**: Restructured into "Explore" and "Connect" columns with modern circular aesthetics.
- **Header**: Updated navigation for better touch targets and glassmorphism effect.
- **Projects**: Replaced emoji icons with professional vector icons (`ri-*`).

### Fixed

- **Mobile Menu**: Resolved white background issue in Dark Mode; menu now adapts to theme.
- **Contrast**: Improved text readability in Dark Mode for footer and inputs.
- **Layout**: Fixed grid collapse issues on Tablet viewports.

## [0.1.0] - 2025-12-25

### Added Initial Implementation

- Core project structure.
- Basic HTML/CSS layout.
- Core content sections (About, Projects, Contact).
