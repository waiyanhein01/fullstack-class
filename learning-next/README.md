# Learning Next.js

## Special files

- page.tsx
- layout.tsx
- template.tsx
- not-found.tsx
- loading.tsx

### Routing

- Nested Routes
- Dynamic Routes
- Nested Dynamic Routes
- Catch all Segments
- not-found

### File-colocation

This is mean a folder have own page.tsx if you create other name this folder won't be run like (`product.tsx` instand of `page.tsx`).

### Private Folder

This is use for split code, ui logic and other component what you want. This folder is like that (\_lib or \_folder name)

### Route Groups

This is for group of routes (eg. (auth) and (dashboard)) if you don't want header and footer in auth routes you can create a routes with groups. Every single group must have `layout.tsx` and `page.tsx` if you want to cusomize layout of ui

### Layout

- Nested Layout
- Multiple RootLayout

### Metadata

- Routing Metadata
- Title Metadata

### Navigation

- Link Component
- Active Links

### Params and SearchParams

For giving a URL,

`params` is a promise that resolves to an object containg the dynamic routes parameters(like id)

`searchParams` is a promise that resolves to an object containg the query parameters(like filters and sorting)

`async/await` can not read in "use client" so if you want to do like async process you can use `use()` hook

#### Noted : While `page.tsx` has access to both params and searchParams, `layout.tsx` only has access to params

### Navigating Progammatically

`useRouter()`

### Templates

Templates are similar to layouts in that they are also UI shared between multiple pages in your app

Whenever a user navigates between routes sharing a template, you get a completely fresh start

- a new template component instance is mounted
- DOM elements are recreated
- state is cleared
- effects are re-synchronized

Create a template by exporting a default React component from a `template.js` or `template.tsx` file

Like layouts, Templates need to accept a children prop to render the nested route segments

### Loading

#### `loading.tsx`

- This file helps us create loading states that users see while waiting for content to load in a specific route segment

#### `loading.tsx` benefits

- It gives users immediate feedback when they navigate somewhere new.This makes your app fell snappy and responsive, and users know their click actually did something.
- Next.js keeps shared layouts interactive while new content loads. Users can still use things like navigation menus or sidebars even if the main content isn't ready yet.

### Parallel Routes

#### Parallel routes use case

- Dashboards with multiple sections
- Split-view interfaces
- Multi-pane layouts
- Complex admin interfaces

#### Parallel routes benefits

- Parallel routes are greate for splitting a layout into manageable slots(especially when different teams work on different parts)
- Independent route handling
- Sub-navigation

#### Independent route handling

- Each slot in your layout, such as users, revenue and notifications, can handle its own loading and error states
- This granular control is particularly useful in scenarios where different sections of the page load at varying speeds or encounter unique errors

#### Sub-navigation in routes

- Each slot can essentialy function as a mini-application, complete with its own navigation and state management
- Users can interact with each section separately, applying filters, sorting data, or navigating through pages without affecting other parts

### Unmatched Routes

#### Navigaition from the UI

- When navigating through the UI (like clicking links), Next.js keeps showing whatever was in the unmatched slots before

#### Page reload

- Next.js looks for a `default.tsx` file in each unmatched slot.
- This file is critical as it servers as a fallback to render content when the framework cannot retrieve a slot's active state form the current URL
- Without the file, you'll get a 404 error

### Conditional Routes

- Imagine you want to show different content based on whether a user is logged in or not
- You might want to display a dashboard for authenticated users but show a login page for those who aren't
- Conditional routes allow us to achieve this while maintaining completely separate code on the same URL
