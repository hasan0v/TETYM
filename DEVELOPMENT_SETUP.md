# Development Environment Setup

This document outlines the steps to set up the development environment for the BSU SSTCC Website project.

## Prerequisites

Ensure you have the following software installed on your system:

* **Node.js**: [Specify version, e.g., LTS version (v20.x or later recommended)](https://nodejs.org/)
* **npm** (usually comes with Node.js) or **Yarn**: [Specify version if necessary]
* **Git**: [Link to Git SCM](https://git-scm.com/)
* **Supabase CLI**: [Link to Supabase CLI installation instructions](https://supabase.com/docs/guides/cli)
* **IDE**: Your preferred code editor (e.g., VS Code, WebStorm).

## 1. Clone the Repository

Clone the project repository from GitHub:

```bash
git clone https://github.com/hasanov/TETYM.git
cd TETYM
```

## 2. Install Dependencies

Navigate to the Next.js application directory (`app`) and install project dependencies:

```bash
cd app
# Using npm
npm install

# Or using Yarn
# yarn install
```

## 3. Supabase Setup

### 3.1. Log in to Supabase CLI

If you haven't already, log in to the Supabase CLI (run this from the root `TETYM` directory or ensure Supabase CLI is in your PATH):

```bash
supabase login
```

Follow the prompts to authenticate.

### 3.2. Link to Supabase Project

Link your local repository to the Supabase project (run this from the root `TETYM` directory). You will need the project reference ID (`dbynywhxdfleqvqbasdk`).

```bash
supabase link --project-ref dbynywhxdfleqvqbasdk
```

Enter the database password when prompted. This was set when you created the Supabase project.

### 3.3. (Optional) Local Supabase Development

If you plan to develop with a local Supabase instance (run this from the root `TETYM` directory):

```bash
# Start the local Supabase services
supabase start
```

This will spin up local Supabase services (Postgres, GoTrue, Storage, etc.) using Docker. Ensure Docker is running.

When you first start, you might need to apply migrations if they exist:

```bash
supabase db push # If using local development and migrations are managed by the CLI
```

Or, if you are pulling changes that include new migrations:

```bash
supabase db reset # Resets local database and applies all migrations
```

**Note**: The `supabase/config.toml` in the root `TETYM` directory should already be configured.

## 4. Environment Variables

Create a `.env.local` file in the root of the Next.js application directory (`TETYM/app/.env.local`). This file will store your environment-specific variables and should not be committed to Git.

Add the following variables:

```env
# Next.js public variables (available on the client-side)
NEXT_PUBLIC_SUPABASE_URL=https://dbynywhxdfleqvqbasdk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRieW55d2h4ZGZsZXF2cWJhc2RrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NjYxMzgsImV4cCI6MjA2MTU0MjEzOH0.L9XCG7Y59mUpUVsIcs5fBqykz9WuKRXIlMEFyLbwARY

# Server-side variables (only available on the server-side)
# SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRieW55d2h4ZGZsZXF2cWJhc2RrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTk2NjEzOCwiZXhwIjoyMDYxNTQyMTM4fQ.Hcx-PVQhS6EbFj3s4vOlfOO9XY9CULZVjoDBjvzLVC4 # Obtain from Supabase Dashboard > Project Settings > API if needed for admin tasks
GOOGLE_TRANSLATE_API_KEY=AIzaSyDP0dJtVw75BYemQZso1EmmECao3PArohs # Obtain from Google Cloud Console

# Add any other necessary environment variables here
```

**Important Security Note**:

* `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are safe to expose on the client-side as they are designed for it, protected by Row Level Security (RLS) in Supabase.
* `SUPABASE_SERVICE_ROLE_KEY` (if used) and `GOOGLE_TRANSLATE_API_KEY` **must** be kept secret and should only be used in server-side code. Do not prefix them with `NEXT_PUBLIC_`.

## 5. Running the Development Server

Ensure you are in the Next.js application directory (`TETYM/app`). Once dependencies are installed and environment variables are set, you can start the Next.js development server:

```bash
cd app # If not already in this directory
# Using npm
npm run dev

# Or using Yarn
# yarn dev
```

The application should typically be available at `http://localhost:3000`.

## 6. Linting and Formatting

This project may use ESLint for linting and Prettier for code formatting. Configure your IDE to use these tools for a consistent codebase. These commands are typically run from the `TETYM/app` directory.

```bash
# To run linter (if configured in package.json)
# npm run lint

# To run formatter (if configured in package.json)
# npm run format
```

## 7. Further Supabase CLI commands

These commands are typically run from the root `TETYM` directory.

* `supabase status`: Check the status of local Supabase services.
* `supabase stop`: Stop local Supabase services.
* `supabase functions deploy <function_name>`: Deploy a specific edge function.
* `supabase db diff -f <migration_name>`: Create a new migration file based on local schema changes (when not using Supabase Studio directly for schema changes).
* `supabase migration up`: Apply a specific migration.

Refer to the [Supabase CLI documentation](https://supabase.com/docs/guides/cli) for more commands.
