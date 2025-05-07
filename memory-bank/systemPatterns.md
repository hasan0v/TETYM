# System Patterns: BSU SSTCC Website

## 1. System Architecture

```mermaid
graph TD
    User[User Browser] --> |HTTPS| Frontend[Frontend (Next.js/Nuxt.js/SvelteKit)]
    Frontend --> |API Calls| Supabase[Supabase Backend]
    Supabase --> |Database Access| PostgresDB[(PostgreSQL Database)]
    Supabase --> |File Storage| Storage[(Supabase Storage)]
    Supabase --> |Auth Services| Auth[(Supabase Auth)]
    Supabase --> |Serverless Functions| Functions[Supabase Edge Functions]
    Functions --> |External API| AutoTranslate[Auto-Translation Service API]
    Functions --> |Notifications| EmailService[Email Notification Service (Optional)]

    Admin[Admin User Browser] --> |HTTPS| FrontendAdmin[Frontend Admin Panel (Part of Main App)]
    FrontendAdmin --> |API Calls| Supabase

    ContentEditor[Content Editor] --> |Via Admin Panel| Supabase
```

**Explanation:**

*   **User Browser:** Client accessing the website.
*   **Frontend (Next.js/Nuxt.js/SvelteKit):** Delivers the user interface. Handles routing, UI rendering, and client-side logic. Interacts with Supabase for data and services.
*   **Supabase Backend:** The core BaaS platform providing:
    *   **PostgreSQL Database:** Stores all application data (ideas, projects, users, achievements, clubs, blog posts, idea submissions).
    *   **Supabase Storage:** Stores user-uploaded files (e.g., idea attachments, images for blog/projects).
    *   **Supabase Auth:** Manages user authentication (for admins, and potentially for student portals in Phase 2).
    *   **Supabase Edge Functions:** Serverless functions for backend logic:
        *   **Auto-Translation:** Triggered when new Azerbaijani content is created (e.g., blog post, idea description). Calls an external translation API.
        *   **Idea Submission Handling:** Processes submitted idea forms, validates data, stores it in the database, and potentially triggers notifications.
        *   **Notifications (Optional):** Sending email notifications (e.g., to admins on new idea submission, to students about their submission status).
*   **Auto-Translation Service API:** An external service (e.g., Google Translate API, DeepL API) used by a Supabase function to translate text.
*   **Email Notification Service (Optional):** An external service (e.g., SendGrid, Supabase built-in email) if email notifications are implemented.
*   **Admin User Browser:** Client used by administrators to access the Admin Panel.
*   **Frontend Admin Panel:** A dedicated section of the frontend application, accessible after admin login, for managing website content and idea submissions.
*   **Content Editor:** A role, typically an admin, who creates and manages content via the Admin Panel.

## 2. Component Diagrams (High-Level)

*   **Content Display Components:**
    *   `IdeaCard`, `ProjectCard`, `ClubCard`, `BlogPostPreview`
    *   `IdeaDetailView`, `ClubDetailView`, `BlogPostView`
    *   `CarouselComponent`
*   **Navigation Components:**
    *   `Navbar`, `Footer`, `LanguageSwitcher`
*   **Form Components:**
    *   `IdeaSubmissionForm`
    *   `AdminLoginForm`
    *   `AdminContentCRUDForm` (generic or specific for each content type)
*   **Layout Components:**
    *   `MainLayout`, `AdminLayout`
*   **Utility Components:**
    *   `IconComponent` (for futuristic SVGs)
    *   `AnimatedSection` (for scroll/hover effects)

## 3. Design Patterns Used

*   **Model-View-Controller (MVC) / Model-View-ViewModel (MVVM):** Implicit in modern frontend frameworks (Next.js, Nuxt.js, SvelteKit) for structuring the application.
*   **Repository Pattern (Conceptual):** Supabase client libraries act as a repository layer, abstracting direct database interactions.
*   **Serverless Functions:** For backend logic, promoting scalability and separation of concerns.
*   **Observer Pattern (Conceptual):** For state management within the frontend (e.g., React Context, Vuex, Svelte Stores) to react to data changes.
*   **Singleton Pattern (Conceptual):** Supabase client initialization can be seen as a singleton instance used throughout the app.
*   **Facade Pattern:** Supabase itself acts as a facade, simplifying interactions with various backend services (DB, Auth, Storage).

## 4. Integration Points

*   **Frontend <-> Supabase:** Primary integration via Supabase JS client library for all data operations, authentication, file storage, and function calls.
*   **Supabase Edge Function <-> Auto-Translation API:** HTTP requests from a serverless function to the chosen translation service.
*   **Supabase Edge Function <-> Email Service (Optional):** If notifications are implemented, integration with an email sending service API.
*   **Admin Panel <-> Supabase:** Same as Frontend <-> Supabase, but with authenticated requests for privileged operations.

## 5. Data Flow

*   **User Viewing Content:**
    1.  User requests a page (e.g., Ideas List).
    2.  Frontend framework routes the request.
    3.  Frontend component fetches data from Supabase (e.g., list of ideas).
    4.  Supabase returns data from PostgreSQL.
    5.  Frontend renders the page with the data.
*   **Student Submitting an Idea:**
    1.  Student fills out the `IdeaSubmissionForm`.
    2.  Frontend performs client-side validation.
    3.  On submit, frontend sends form data (including any uploaded files to Supabase Storage first, then links) to a Supabase Edge Function or directly to the database via RPC (if secure and appropriate).
    4.  Edge Function (if used) performs server-side validation.
    5.  Data is inserted into the `idea_submissions` table in PostgreSQL.
    6.  (Optional) Edge Function triggers a notification to admins.
    7.  Frontend displays a success/failure message.
*   **Admin Creating a Blog Post (with Auto-Translation):**
    1.  Admin fills out the blog post form in the Admin Panel (Azerbaijani content).
    2.  Frontend sends data to Supabase (e.g., to a specific table or calls an Edge Function).
    3.  Azerbaijani content is saved to the `blog_posts` table.
    4.  A Supabase Edge Function (triggered by the new post or called explicitly) takes the Azerbaijani text.
    5.  The Edge Function calls the external Auto-Translation API.
    6.  The translated English text is received.
    7.  The Edge Function updates the `blog_posts` table with the English translation.
    8.  Admin can later review/edit the English translation via the Admin Panel.

## 6. Key Database Tables (Conceptual - details in Tech Context)

*   `users` (for Supabase Auth, primarily admins initially)
*   `ideas` (or `projects`)
*   `idea_submissions`
*   `achievements`
*   `clubs`
*   `blog_posts`
*   `team_members` (Optional)
*   `facilities_info` (Optional)
*   `media_gallery` (for images/videos linked to ideas, clubs, etc.)
