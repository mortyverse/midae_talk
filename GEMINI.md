# GEMINI.md: AI-Powered Project Context

This file provides essential context about the "midae_talk" project for AI-powered development assistance.

## 1. Project Overview

**Project Name:** 미대톡 (Midae Talk)

**Core Purpose:** "Midae Talk" is a web platform designed to solve a key problem for art school entrance exam students: the lack of diverse, objective feedback. It connects students with verified mentors (current art school students, instructors, etc.) to get online feedback on their artwork.

**MVP Hypothesis:** The initial version (MVP) aims to validate if students have a need to share their work and receive text-based feedback from third-party mentors.

**Target Audience:**
*   **Students:** Art students preparing for university entrance exams who need objective and varied feedback on their work.
*   **Mentors:** Current art school students or professional instructors who want to share their expertise.

**Core Technologies:**
*   **Frontend:** Next.js (with App Router)
*   **Backend & DB:** Supabase (handling Authentication, Database, and Storage)
*   **Styling:** Tailwind CSS
*   **Language:** TypeScript

## 2. Building and Running the Project

The project's scripts are defined in `package.json`.

*   **To run the development server:**
    ```bash
    npm run dev
    ```
    This command starts the Next.js development server with Turbopack. Open [http://localhost:3000](http://localhost:3000) to view the application.

*   **To build the project for production:**
    ```bash
    npm run build
    ```
    This command creates an optimized production build of the application.

*   **To start the production server:**
    ```bash
    npm run start
    ```
    This command starts the application in production mode. It should be run after building the project.

## 3. Development Conventions & Key Files

This project follows standard Next.js 14+ conventions.

*   **Project Structure:** The application logic is centered in the `app/` directory, following the Next.js App Router paradigm.
    *   `app/layout.tsx`: The root layout of the application.
    *   `app/page.tsx`: The main entry point and homepage.

*   **Product Requirements:** The definitive guide for features and user flows is the Product Requirements Document.
    *   `docs/PRD.md`: Contains the detailed specifications for the MVP, including user roles (Student, Mentor), core features (role-based accounts, artwork uploads, gallery, text feedback), and the post-MVP roadmap. **All development should align with this document.**

*   **Backend Integration:** All backend functionality (authentication, data storage, file uploads) is handled by Supabase.
    *   **Authentication:** Uses Supabase Auth. User roles ('학생', '멘토') are to be managed within user metadata.
    *   **Database:** Uses Supabase Postgres for storing data like posts and feedback.
    *   **Storage:** Uses Supabase Storage for user-uploaded images (artworks, mentor verification documents).

*   **Configuration:**
    *   `next.config.ts`: Configuration for the Next.js framework.
    *   `tsconfig.json`: TypeScript compiler options, including path aliases (`@/*`).

## 4. AI Coding Rules & Principles

To ensure consistency and quality, all AI-generated code will adhere to the principles outlined in the `.cursor/rules` directory, which have been summarized and integrated here.

### 4.1. General World-Class Coding Practices

This is the baseline standard for all code, regardless of language or framework.

*   **Clarity & Readability:** Prioritize clear, descriptive names and consistent formatting. Write simple, understandable code. Comments should explain the *why*, not the *what*.
*   **Simplicity (KISS, DRY, YAGNI):** Keep solutions simple. Don't repeat code. Don't build features that aren't needed now.
*   **Robustness:** Handle all errors gracefully. Validate all external inputs at the system's boundaries.
*   **Security:** Prevent injection attacks, manage secrets securely (never hardcode them), and keep dependencies updated.
*   **Testability:** Write comprehensive unit, integration, and E2E tests. Design code to be easily testable.
*   **Maintainability:** Refactor code continuously to improve its design and pay down technical debt. Externalize all configuration.

### 4.2. Next.js & TypeScript Specific Rules

These rules are specific to building this Next.js application.

*   **App Router First:** All new development must use the `app/` directory and its conventions (`page.tsx`, `layout.tsx`, etc.). **Strongly prefer colocating feature-specific code (components, hooks, actions) in private folders (e.g., `app/feature/_components`)**.
*   **Server Components by Default:** Maximize the use of React Server Components (RSCs) for performance, security, and direct data access.
*   **`'use client'` as a Boundary:** Only use Client Components when absolutely necessary for interactivity (hooks, event listeners). Isolate them as "islands" deep in the component tree.
*   **Server Actions for Mutations:** **Prioritize Server Actions for all data mutations** (e.g., form submissions). This is the primary way to handle data changes initiated from the client.
*   **Data Fetching:** Perform primary data fetching in Server Components using `async/await` with the extended `fetch` API.
*   **Performance:** Mandate the use of `next/image`, `next/font`, and `next/dynamic` for optimizations.
*   **Styling:** Use Tailwind CSS consistently.
*   **Security:** Enforce rigorous server-side validation for all inputs from the client (e.g., in Server Actions, Route Handlers), preferably with a library like Zod.