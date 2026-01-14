# Project Structure

This project has been restructured to follow React best practices and modern development standards.

## Folder Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Generic UI components (buttons, loaders, etc.)
│   ├── Layout.tsx       # Main layout component with navigation
│   ├── ProjectCard.tsx  # Individual project card component
│   ├── FileSystemNode.tsx # File/folder tree node component
│   └── index.ts         # Barrel exports for components
├── pages/               # Page-level components
│   ├── Home.tsx         # Home page
│   ├── Projects.tsx     # Projects listing page
│   ├── RepoDetails.tsx  # Individual repository details
│   ├── FileExplorer.tsx # File browser page
│   ├── NotFound.tsx     # 404 error page
│   └── index.ts         # Barrel exports for pages
├── hooks/               # Custom React hooks
│   ├── useGitHubRepos.ts # Hook for fetching GitHub repositories
│   └── index.ts         # Barrel exports for hooks
├── utils/               # Utility functions
│   ├── fileUtils.ts     # File system related utilities
│   └── index.ts         # Barrel exports for utilities
├── types/               # TypeScript type definitions
│   └── index.ts         # Type definitions
├── constants/           # Application constants
│   └── index.ts         # Constants like API URLs, cache settings
├── styles/              # CSS files
│   ├── index.css        # Global styles
│   └── styles.css       # Component-specific styles
├── assets/              # Static assets (images, icons, etc.)
│   └── profile-photo.jpg
├── App.tsx              # Main App component
├── main.tsx             # Application entry point
└── vite-env.d.ts        # Vite environment types
```

## Key Improvements

### 1. Separation of Concerns

-   **Components**: Reusable UI elements that can be used across different pages
-   **Pages**: Route-level components that represent different views
-   **Hooks**: Custom logic that can be shared between components
-   **Utils**: Pure functions for data manipulation and API calls
-   **Types**: Centralized type definitions for better type safety

### 2. Better Import Organization

-   Barrel exports (`index.ts` files) allow for cleaner imports
-   Instead of `import Component from './path/to/Component'`
-   Use `import { Component } from './components'`

### 3. Custom Hooks

-   `useGitHubRepos`: Encapsulates the logic for fetching and caching GitHub repositories
-   Promotes reusability and easier testing

### 4. Constants and Configuration

-   Centralized configuration values (API URLs, cache expiration times)
-   Makes the application easier to maintain and configure

### 5. Utility Functions

-   File system operations extracted to utility functions
-   Promotes code reuse and easier testing

## Usage Examples

### Importing Components

```typescript
// Clean barrel imports
import { Layout, ProjectCard } from "./components";
import { Home, Projects } from "./pages";
import { useGitHubRepos } from "./hooks";
```

### Using Custom Hooks

```typescript
const MyComponent = () => {
    const { repos, loading, error } = useGitHubRepos();

    if (loading) return <LoadingAnimation />;
    if (error) return <div>Error: {error}</div>;

    return <div>{/* render repos */}</div>;
};
```

### Using Utilities

```typescript
import { loadFileStructure, fetchFolderContents } from "./utils";

const structure = await loadFileStructure(repoName);
```

This structure makes the codebase more maintainable, testable, and follows React community best practices.
