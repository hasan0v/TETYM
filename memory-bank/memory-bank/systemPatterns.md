# System Patterns: BSU SSTCC Website

This document outlines the system architecture and design patterns used in the BSU SSTCC (Student Scientific-Technical Creativity Center) website project, with a focus on the successfully implemented clubs, blog, and about pages with bilingual support.

## System Architecture

### Overall Architecture

The BSU SSTCC website follows a modern frontend architecture using Next.js with the App Router pattern. The system is designed as a client-side rendered application with server components where appropriate, following these architectural principles:

* **Component-Based Architecture**: UI is broken down into reusable components
* **Page-Based Routing**: Next.js App Router defines routes based on file structure
* **Server Components**: Server-rendered React components for improved performance
* **API Layer**: Next.js API routes for data operations
* **Internationalization**: Route-based internationalization with locale prefixes

### High-Level Architecture Diagram

```
┌─────────────────────────────────────┐
│           Client Browser            │
└───────────────────┬─────────────────┘
                    │
                    ▼
┌─────────────────────────────────────┐
│             Next.js App             │
│  ┌─────────┐  ┌─────────────────┐   │
│  │  Pages  │  │  API Routes     │   │
│  │         │◄─┼─────────────────┤   │
│  │         │  │  Components     │   │
│  └─────────┘  └─────────────────┘   │
└───────────────────┬─────────────────┘
                    │
                    ▼
┌─────────────────────────────────────┐
│         Supabase (Planned)          │
│  ┌─────────┐  ┌─────────────────┐   │
│  │ Database│  │ Authentication  │   │
│  │         │  │                 │   │
│  │         │  │ Storage         │   │
│  └─────────┘  └─────────────────┘   │
└─────────────────────────────────────┘
```

## Design Patterns

### Component Patterns

#### 1. Container/Presentational Pattern

Used to separate data fetching and business logic from UI rendering:

* **Container Components**: Handle data fetching, state management, and business logic
* **Presentational Components**: Receive data via props and focus on rendering UI

Example from Clubs page:
```typescript
// Container component
function ClubsPage() {
  const [clubs, setClubs] = useState([]);
  const [filters, setFilters] = useState({});
  
  useEffect(() => {
    // Fetch clubs data with filters
  }, [filters]);
  
  return <ClubsDisplay clubs={clubs} filters={filters} onFilterChange={setFilters} />;
}

// Presentational component
function ClubsDisplay({ clubs, filters, onFilterChange }) {
  return (
    <div>
      <FilterPanel filters={filters} onChange={onFilterChange} />
      <ClubsList clubs={clubs} />
    </div>
  );
}
```

#### 2. HOC (Higher-Order Component) Pattern

Used for cross-cutting concerns like internationalization:

```typescript
function withTranslation(Component) {
  return function WrappedComponent(props) {
    const { locale } = useParams();
    const translations = getTranslations(locale);
    
    return <Component {...props} t={translations} />;
  };
}
```

#### 3. Custom Hook Pattern

Used to encapsulate and reuse stateful logic across components:

```typescript
function useClubData(clubId) {
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchClub() {
      try {
        // Fetch club data
        setClub(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchClub();
  }, [clubId]);
  
  return { club, loading, error };
}
```

### State Management Patterns

1. **Local Component State**: Used for UI state specific to a component
2. **Context API**: Used for shared state across multiple components
3. **URL State**: Used for persistent, shareable state like filters and search parameters

Example of Context API usage for language:
```typescript
const LanguageContext = createContext();

function LanguageProvider({ children }) {
  const [locale, setLocale] = useState('az');
  const translations = getTranslations(locale);
  
  return (
    <LanguageContext.Provider value={{ locale, setLocale, translations }}>
      {children}
    </LanguageContext.Provider>
  );
}
```

### Data Flow Patterns

#### 1. Unidirectional Data Flow

Data flows down through props from parent to child components, while events flow up through callback functions:

```
Parent Component (state, event handlers)
   │
   ├─► Child Component 1 (receives props, sends events)
   │
   └─► Child Component 2 (receives props, sends events)
```

#### 2. Data Fetching Patterns

* **Client-Side Fetching**: Using useEffect for client components
* **Server-Side Rendering**: Using Server Components for data that doesn't need client interactivity
* **Static Generation**: For content that changes infrequently

### Routing Patterns

Next.js App Router with internationalization:

```
app/
  └── [locale]/     # Dynamic route for language
      ├── page.tsx  # Home page
      ├── clubs/
      │   ├── page.tsx       # Clubs listing page
      │   └── [id]/page.tsx  # Individual club page
      ├── blog/
      │   ├── page.tsx       # Blog listing page
      │   └── [id]/page.tsx  # Individual blog post page
      └── about/
          └── page.tsx       # About page
```

## Component Diagrams

### Page Component Structure

#### Clubs Page Structure

```
ClubsPage
  ├── PageHeader
  │   ├── Breadcrumbs
  │   └── PageTitle
  ├── FilterSection
  │   ├── SearchInput
  │   ├── CategoryFilter (Dropdown)
  │   └── SortOptions
  └── ClubsGrid
      └── ClubCard (multiple)
          ├── ClubImage
          ├── ClubTitle
          ├── ClubDescription
          └── ActionButton
```

#### Blog Page Structure

```
BlogPage
  ├── PageHeader
  │   ├── Breadcrumbs
  │   └── PageTitle
  ├── FilterSection
  │   ├── SearchInput
  │   ├── CategoryFilter
  │   └── DateFilter
  └── BlogPostsGrid
      └── BlogPostCard (multiple)
          ├── PostImage
          ├── PostTitle
          ├── PostMeta (date, author)
          ├── PostExcerpt
          └── ReadMoreLink
```

#### About Page Structure

```
AboutPage
  ├── PageHeader
  │   ├── Breadcrumbs
  │   └── PageTitle
  ├── HeroSection
  │   ├── HeroImage
  │   └── MissionStatement
  ├── HistorySection
  │   ├── SectionTitle
  │   └── TimelineComponent
  ├── TeamSection
  │   ├── SectionTitle
  │   └── TeamMembersGrid
  │       └── TeamMemberCard (multiple)
  └── ContactSection
      ├── SectionTitle
      ├── ContactInfo
      └── ContactForm
```

## Data Flow

### Clubs Page Data Flow

1. User enters the clubs page
2. Page fetches clubs data (currently placeholder data, planned to be from Supabase)
3. User applies filters (category, search term)
4. Filter state updates, triggering a re-fetch or filter of existing data
5. Updated list is displayed to the user
6. User clicks on a club card
7. User is navigated to the club detail page with the club ID

### Blog Page Data Flow

1. User enters the blog page
2. Page fetches blog posts data
3. User applies filters (category, date range, search)
4. Filtered blog posts are displayed
5. User clicks on a blog post
6. User is navigated to the blog post detail page
7. Blog post content is rendered with markdown processing

## Integration Points

### Current Integration Points

* **Internationalization**: Integration with custom i18n system via locale route parameter
* **UI Components**: Shared components used across different pages for consistency
* **TypeScript Types**: Shared type definitions for data models

### Planned Integration Points

* **Supabase Database**: For fetching real data instead of placeholders
* **Supabase Auth**: For user authentication and authorization
* **Supabase Storage**: For image and file storage
* **Admin Dashboard**: For content management

## Error Handling Patterns

1. **Graceful Degradation**: Components display fallback UI when data is missing
2. **Error Boundaries**: React error boundaries catch rendering errors
3. **Loading States**: Components display loading indicators during data fetching
4. **Empty States**: Components display helpful messages when no data is available

Example of error handling in a component:
```typescript
function ClubCard({ club }) {
  if (!club) {
    return <EmptyClubCard />;
  }
  
  return (
    <Card>
      <Image 
        src={club.imageUrl} 
        alt={club.name}
        onError={(e) => {
          e.target.src = '/placeholder.svg';
        }}
      />
      <CardContent>{/* Club content */}</CardContent>
    </Card>
  );
}
```

## Technical Debt & Future Considerations

* **Component Standardization**: Need to standardize component props and interfaces
* **State Management**: Consider more robust state management for larger scale
* **API Layer**: Create a standardized API client for data fetching
* **Testing**: Implement comprehensive testing strategy
* **Accessibility**: Enhance components for better accessibility compliance

Last Updated: May 8, 2025