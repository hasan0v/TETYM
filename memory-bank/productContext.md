# Product Context: BSU SSTCC Website

## 1. User Personas

*   **Innovative BSU Student (Primary Target):**
    *   **Needs:** A platform to showcase their ideas, get support (mentorship, resources), find collaborators, learn about innovation, get recognition.
    *   **Goals:** Submit ideas for evaluation, get projects funded/supported, win competitions, join relevant clubs, connect with like-minded peers and faculty.
    *   **Pain Points:** Lack of a clear channel to present ideas, difficulty finding resources or mentorship, unawareness of available support systems.
*   **Prospective BSU Student:**
    *   **Needs:** Information about the university's focus on innovation, opportunities for student development beyond academics.
    *   **Goals:** Choose a university that supports student creativity and provides practical experience.
    *   **Pain Points:** Difficulty assessing a university's commitment to student innovation.
*   **BSU Faculty and Staff:**
    *   **Needs:** A platform to see student achievements, identify promising students/projects for mentorship or collaboration, promote their department's involvement in innovation.
    *   **Goals:** Support student innovation, contribute to the Center's success, foster a culture of research and development.
*   **Potential Industry Partner/Sponsor:**
    *   **Needs:** Discover innovative projects and talented students for potential recruitment, investment, or collaboration.
    *   **Goals:** Identify emerging technologies and talent, contribute to local innovation ecosystem, enhance corporate social responsibility.
*   **Other Universities and Research Institutions:**
    *   **Needs:** Learn about BSU's innovation activities, explore potential collaborations.
    *   **Goals:** Benchmark against other institutions, find partners for joint research or events.
*   **General Public:**
    *   **Needs:** Information about scientific and technological advancements happening at BSU.
    *   **Goals:** Stay informed about local innovation.

## 2. Feature List & Priorities

**High Priority (Core Functionality):**

*   **Bilingual Content (AZ/EN):** Essential for accessibility and reach.
*   **Automatic Translation (AZ to EN):** Streamlines content management.
*   **Supabase Backend:** Foundation for all dynamic features.
*   **Dedicated Idea Submission Section & Form:** Key objective of the site.
    *   Detailed form fields as specified.
    *   File upload capability.
    *   Confidentiality note and submission guidelines.
*   **Ideas (Projects) Listing & Individual Pages:** Showcase for student work.
    *   Filtering and search.
    *   Detailed information on individual idea pages.
*   **Achievements Listing:** Highlight successes.
*   **Clubs Listing & Individual Pages:** Promote student communities.
*   **Blog Listing & Individual Pages:** Share news and insights.
*   **Homepage (with all specified sections):** Engaging entry point.
    *   Hero section with CTA for idea submission.
    *   "Have an Idea?" call-out block.
*   **About Us Page:** Information about the Center.
*   **Admin Panel:**
    *   Secure Login.
    *   Content Management (CRUD) for: Ideas/Projects (with status), Achievements, Blog Posts, Clubs.
    *   Idea Submissions Management: View, update status, internal notes, contact submitters.
    *   Translation Management (Review/edit EN).
*   **Responsive Design:** Accessibility across devices.
*   **Language Switcher (AZ/EN):** User-friendly navigation.

**Medium Priority:**

*   **Our Team (Optional on About Us):** Can be added later if content is ready.
*   **Facilities (on About Us):** Gallery or description.
*   **SEO Friendly (Basic):** Initial setup, can be enhanced.
*   **Image Carousels:** For visual appeal on various pages.
*   **Fast Page Transitions & Animations:** Enhances UX, but core functionality is first.
*   **Futuristic & Modern Design (Icons, UI):** Integral to the vision, iterative implementation.

**Low Priority (Future Considerations / Phase 2):**

*   Student/Member Portals with idea tracking.
*   Event Calendar.
*   Interactive Timelines.
*   Forums/Discussion Boards.
*   Advanced SEO optimization.
*   Advanced animation features if not covered initially.

## 3. User Stories

*   **As an Innovative BSU Student, I want to:**
    *   easily find where to submit my project idea so that I can get support from the SSTCC.
    *   clearly understand the evaluation process for submitted ideas so I know what to expect.
    *   showcase my completed projects and achievements to gain recognition and attract collaborators.
    *   find information about different SSTCC clubs so I can join one relevant to my interests.
    *   read blog posts about innovation and Center activities to stay informed.
*   **As an SSTCC Admin, I want to:**
    *   manage all website content (ideas, achievements, blog, clubs) from a secure panel so I can keep the site up-to-date.
    *   review and manage submitted student ideas, update their status, and communicate with submitters so we can efficiently process applications.
    *   review and edit auto-translated English content to ensure accuracy and quality.
*   **As a Prospective Student, I want to:**
    *   see examples of student innovations and achievements so I can gauge the university's support for student creativity.
*   **As an Industry Partner, I want to:**
    *   browse student projects and ideas to identify potential investment or recruitment opportunities.
*   **As a BSU Faculty Member, I want to:**
    *   see the innovative projects my students are working on and find opportunities to mentor them.

## 4. Competitive Analysis (High-Level)

*   **Other University Innovation Centers:** Many universities have similar centers. The BSU SSTCC site needs to differentiate through its futuristic design, strong focus on *student-led* idea submission and support, and bilingual accessibility.
*   **Local Tech Incubators/Accelerators:** May offer similar support but might not be student-focused or integrated with university resources.
*   **Online Idea Platforms (e.g., Kickstarter, Indiegogo - for concept, not direct competition):** Showcase how ideas are presented and gain traction, but SSTCC is about internal support and development.

**Key Differentiators for SSTCC Website:**
*   Directly linked to BSU resources and faculty.
*   Emphasis on bilingualism (Azerbaijani focus).
*   Clear pathway from idea submission to tangible support (mentorship, labs).
*   Futuristic and modern aesthetic tailored to a young, tech-savvy audience.

## 5. Product Roadmap

*   **Phase 1: MVP Launch (Core Features)**
    *   Homepage with key sections (Hero, About snippet, "Have an Idea?" block, Featured Ideas, Recent Achievements, Clubs Overview, Latest Blog).
    *   About Us (History, Mission).
    *   Ideas (Projects) - Listing and basic individual pages.
    *   Achievements - Listing.
    *   Clubs - Listing and basic individual pages.
    *   Blog - Listing and individual post pages (AZ primary, EN auto-translated).
    *   **Submit Your Idea & Join Us Page:**
        *   Full idea submission form and detailed process explanation.
        *   Basic "Join Us" content linking to clubs.
    *   Admin Panel:
        *   CRUD for Ideas (with status), Achievements, Blog, Clubs.
        *   Idea submission viewing and status update.
        *   Basic translation review.
    *   Bilingual functionality (AZ/EN) with language switcher.
    *   Responsive Design.
    *   Supabase backend setup (DB, Auth, basic Storage).
*   **Phase 1.X (Post-MVP Enhancements)**
    *   Full implementation of "Our Team" and "Facilities" on About Us.
    *   Enhanced individual idea/club pages (e.g., galleries, team members).
    *   Image carousels.
    *   Basic animations and page transitions.
    *   Serverless functions for auto-translation and notifications.
    *   Refined Admin Panel features (e.g., internal notes for evaluators, contact mechanism).
*   **Phase 2 (Future Considerations from Plan)**
    *   Student/Member Portals with idea tracking.
    *   Event Calendar.
    *   Interactive Timelines.
    *   Forums/Discussion Boards.
    *   Advanced SEO.
    *   More sophisticated animations.

This roadmap aligns with the "Timeline Overview" in the Project Brief and the "Future Considerations" in the main website plan.
