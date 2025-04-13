```markdown
# MeetMate Client

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

To start the development server, run:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open http://localhost:3000 in your browser to view the application.

## Project Structure

The repository is organized as follows:

```
.gitignore
eslint.config.mjs
next-env.d.ts
next.config.ts
package.json
postcss.config.mjs
README.md
tailwind.config.ts
tsconfig.json
.next/
app/
public/
utils/
```

## Key Directories

- `app/`: Contains the main application logic, including pages, layouts, and components.
- `auth/`: Handles authentication-related pages like login, signup, and password reset.
- `hooks/`: Custom React hooks for managing state and logic.
- `ui/`: Reusable UI components.
- `public/`: Static assets like images.
- `utils/`: Utility functions shared across the application.

## Features

- **Authentication**: Includes login, signup, and password reset flows.
- **State Management**: Uses zustand for lightweight state management.
- **API Integration**: Handles API calls for user authentication and data fetching.
- **Responsive Design**: Built with Tailwind CSS for a modern and responsive UI.

## Authentication Flow

The authentication flow is managed through the modals such as signup, login, and password reset. The authentication state is managed using Zustand, a small, fast state-management solution. The API calls are made using the `fetch` API.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code quality issues.

## Dependencies

- **Next.js**: Framework for server-rendered React applications.
- **React**: Library for building user interfaces.
- **Zustand**: State management library.
- **Axios**: HTTP client for API requests.
- **Tailwind CSS**: Utility-first CSS framework.

## Deployment

The easiest way to deploy this application is via Vercel. Follow the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License.