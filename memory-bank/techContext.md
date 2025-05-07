# Tech Context: BSU SSTCC Website

## 1. Technology Stack

*   **Backend-as-a-Service (BaaS):** Supabase
    *   **Database:** PostgreSQL (managed by Supabase)
    *   **Authentication:** Supabase Auth (for admin panel, potential future student portals)
    *   **Storage:** Supabase Storage (for images, idea submission attachments, other media)
    *   **Serverless Functions:** Supabase Edge Functions (written in TypeScript/JavaScript - Deno runtime)
        *   Purpose: Auto-translation, idea submission processing, notifications (if any).
* **Frontend Framework (Choice to be finalized, options include):**
  * **Next.js (React):** Robust, good for SEO, large ecosystem. **Chosen.**
  * ~~Nuxt.js (Vue.js): Similar to Next.js but for Vue enthusiasts.~~
  * ~~SvelteKit: Newer, known for performance and ease of use.~~
  * *Decision Point:* ~~Select one based on team familiarity and project needs. Next.js is a strong default.~~ Next.js selected.
* **Styling:**
  * **Tailwind CSS:** Utility-first CSS framework for rapid UI development. Highly recommended for its efficiency and modern approach. **Chosen.**
  * ~~CSS-in-JS (e.g., Styled Components, Emotion): Alternative if component-scoped styles are preferred (more common with React if not using Tailwind).~~
  * *Decision Point:* ~~Tailwind CSS is generally preferred for new projects due to its speed and maintainability.~~ Tailwind CSS selected.
*   **Programming Languages:**
    *   **JavaScript/TypeScript:** For both frontend and Supabase Edge Functions (TypeScript is highly recommended for type safety and better developer experience).
*   **Version Control:** Git (repository hosted on GitHub, GitLab, or similar).
* **Auto-Translation Service:**
  * **Google Cloud Translation API**: **Chosen.**
  * ~~DeepL API~~
  * ~~Other similar services.~~
  * *Decision Point:* ~~Choose based on translation quality for Azerbaijani-English, pricing, and ease of integration.~~ Google Cloud Translation API selected.
*   **Animation Libraries (Optional, for enhanced UX):**
    *   **GSAP (GreenSock Animation Platform):** Powerful and flexible for complex animations.
    *   **Framer Motion:** Popular for React-based animations, declarative.
    *   **AOS (Animate On Scroll):** Simple library for scroll-triggered animations.
    *   *Decision Point:* Start simple, potentially with CSS animations/transitions or AOS, and incorporate more complex libraries if needed.
* **Image Carousel Libraries:**
  * **Swiper.js:** Feature-rich, framework-agnostic, touch-friendly. **Chosen.**
  * ~~Other framework-specific options (e.g., nuka-carousel for React).~~
  * *Decision Point:* ~~Swiper.js is a solid choice.~~ Swiper.js selected.
* **Form Handling:**
  * Frontend validation (built-in browser validation + library like ~~React Hook Form,~~ Formik for React; ~~Vuelidate for Vue, etc.~~). **Formik chosen for React (Next.js).**
  * Backend validation (within Supabase Edge Functions or using PostgreSQL constraints/RLS).

## 2. Development Environment

*   **IDE:** VS Code (recommended) or other modern code editor.
*   **Node.js & npm/yarn/pnpm:** For managing frontend dependencies and running development servers.
*   **Supabase CLI:** For local development, managing database migrations, and deploying functions.
*   **Git & Git Client:** For version control.
*   **Deno (for Supabase Edge Functions):** Local development and testing of functions.
*   **Docker (Optional):** For containerizing parts of the environment or for consistent local Supabase setup if preferred over the CLI's integrated services.

## 3. Deployment Process

*   **Frontend Hosting:**
    *   **Vercel:** Ideal for Next.js projects, offers seamless integration, CI/CD, and global CDN.
    *   **Netlify:** Similar to Vercel, good for various static site generators and frontend frameworks.
    *   **Supabase (for static sites):** Supabase now offers static hosting, could be an option for simpler setups.
    *   *Decision Point:* Vercel is highly recommended if Next.js is chosen.
*   **Backend:** Supabase handles its own infrastructure (database, auth, storage, functions are deployed to Supabase platform).
*   **Deployment Steps (Conceptual):**
    1.  Develop features locally, commit to Git.
    2.  Push changes to a remote Git repository (e.g., GitHub).
    3.  CI/CD pipeline (e.g., GitHub Actions, Vercel/Netlify built-in CI/CD) triggers on push/merge to main/production branch.
    4.  **Frontend:** CI/CD builds the frontend application, runs tests, and deploys to the chosen hosting platform (Vercel, Netlify).
    5.  **Supabase Functions:** Deploy functions using the Supabase CLI (can be integrated into CI/CD script).
        *   `supabase functions deploy <function_name>`
    6.  **Supabase Database Migrations:** Managed using Supabase CLI.
        *   Generate migrations locally: `supabase migration new <migration_name>`
        *   Apply migrations to local Supabase: `supabase db reset` (for fresh start) or `supabase migration up`
        *   Apply migrations to linked Supabase project: `supabase db push` (for schema changes directly, or `supabase migration up` after linking and setting up remote migrations if using a more formal migration workflow).
        *   For production, a more controlled migration strategy is needed, often involving `supabase migration apply --remote` or similar commands via CI/CD after thorough testing.

## 4. Performance Considerations

*   **Image Optimization:** Compress images, use modern formats (e.g., WebP), implement responsive images (`<picture>` element or `srcset` attribute).
*   **Code Splitting:** Automatic in Next.js/Nuxt.js/SvelteKit, ensuring only necessary JavaScript is loaded per page.
*   **Lazy Loading:** Lazy load images and components that are off-screen to improve initial page load time.
*   **Caching:** Leverage browser caching and CDN caching (provided by Vercel/Netlify).
*   **Database Query Optimization:** Write efficient SQL queries, use indexes in PostgreSQL where appropriate. Supabase helps with this but complex queries need care.
*   **Serverless Function Performance:** Keep functions lean and optimize cold start times if they become an issue.
*   **Minification:** HTML, CSS, and JavaScript should be minified for production builds (handled by frontend frameworks).

## 5. Technical Debt

*   **Initial Focus:** Prioritize core functionality and a stable MVP.
*   **Auto-Translation Quality:** Auto-translations may not be perfect and might require manual review. This could become a source of ongoing work or necessitate investment in better translation tools/processes.
*   **Scalability of Idea Evaluation:** If the number of idea submissions becomes very large, the manual review process in the admin panel might need to be enhanced with more automation or a more robust workflow.
*   **Code Quality:** Maintain clean code, use linters (ESLint), formatters (Prettier), and conduct code reviews to prevent accumulation of technical debt.
*   **Dependency Management:** Regularly update dependencies to avoid security vulnerabilities and leverage new features, but test thoroughly.
*   **Documentation:** Document code, especially complex logic in serverless functions and critical frontend components.

## 6. Key Database Tables & Fields (More Detailed)

*   **`profiles` (extends `auth.users` via public.profiles table for user-specific, non-auth data if needed beyond admin roles)**
    *   `id` (UUID, references `auth.users.id`, PK)
    *   `full_name` (TEXT)
    *   `role` (TEXT, e.g., 'admin', 'student' - for future)
*   **`idea_submissions`**
    *   `id` (BIGSERIAL, PK)
    *   `created_at` (TIMESTAMPTZ, default now())
    *   `user_id` (UUID, FK to `profiles.id`, optional if public submissions allowed initially)
    *   `full_name` (TEXT, submitted by user)
    *   `bsu_email` (TEXT, submitted by user)
    *   `faculty_department` (TEXT, submitted by user)
    *   `student_id_optional` (TEXT)
    *   `contact_phone_optional` (TEXT)
    *   `idea_title` (TEXT)
    *   `brief_summary` (TEXT, max 200 words)
    *   `problem_statement` (TEXT)
    *   `proposed_solution` (TEXT)
    *   `key_innovations` (TEXT)
    *   `current_stage` (TEXT)
    *   `required_support` (TEXT)
    *   `attachments_path` (TEXT, path in Supabase Storage)
    *   `declaration_confirmed` (BOOLEAN)
    *   `status` (TEXT, default 'Submitted'; e.g., 'Under Review', 'Accepted', 'Rejected', 'In Development')
    *   `internal_notes` (TEXT, for admin evaluators)
*   **`ideas` (or `projects` - for accepted/developed ideas)**
    *   `id` (BIGSERIAL, PK)
    *   `submission_id` (BIGINT, FK to `idea_submissions.id`, optional if idea didn't come from submission)
    *   `title_az` (TEXT)
    *   `title_en` (TEXT)
    *   `description_az` (TEXT)
    *   `description_en` (TEXT)
    *   `team_members_text` (TEXT, or link to a separate team table)
    *   `technologies_used_text` (TEXT)
    *   `status` (TEXT, e.g., 'Concept', 'In Development', 'Completed', 'Showcased')
    *   `cover_image_url` (TEXT)
    *   `gallery_urls` (JSONB, array of image/video URLs)
    *   `competitions_awards_text` (TEXT)
*   **`achievements`**
    *   `id` (BIGSERIAL, PK)
    *   `title_az` (TEXT)
    *   `title_en` (TEXT)
    *   `description_az` (TEXT)
    *   `description_en` (TEXT)
    *   `date_achieved` (DATE)
    *   `image_url` (TEXT)
    *   `type` (TEXT, e.g., 'Medal', 'Award', 'Certificate')
*   **`clubs`**
    *   `id` (BIGSERIAL, PK)
    *   `name_az` (TEXT)
    *   `name_en` (TEXT)
    *   `description_az` (TEXT)
    *   `description_en` (TEXT)
    *   `mentors_text_az` (TEXT)
    *   `mentors_text_en` (TEXT)
    *   `activities_text_az` (TEXT)
    *   `activities_text_en` (TEXT)
    *   `how_to_join_text_az` (TEXT)
    *   `how_to_join_text_en` (TEXT)
    *   `cover_image_url` (TEXT)
    *   `gallery_urls` (JSONB)
*   **`blog_posts`**
    *   `id` (BIGSERIAL, PK)
    *   `title_az` (TEXT)
    *   `title_en` (TEXT)
    *   `content_az` (TEXT, rich text/markdown)
    *   `content_en` (TEXT, rich text/markdown)
    *   `author_id` (UUID, FK to `profiles.id` - admin user who posted)
    *   `created_at` (TIMESTAMPTZ, default now())
    *   `updated_at` (TIMESTAMPTZ)
    *   `slug` (TEXT, unique for URL)
    *   `category_az` (TEXT, optional)
    *   `category_en` (TEXT, optional)
    *   `tags_az` (JSONB, array of strings, optional)
    *   `tags_en` (JSONB, array of strings, optional)
    *   `featured_image_url` (TEXT, optional)

*Note on Bilingual Fields:* Suffixing with `_az` and `_en` is a common pattern. Alternatively, a separate translations table could be used for more complex scenarios, but for two languages, direct fields are often simpler.
