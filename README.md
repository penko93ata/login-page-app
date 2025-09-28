This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
# install dependencies
npm install

# Add .env file with SESSION_SECRET variable

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Dummy user credentials to use for login

```
admin@example.com: Admin123!
user@example.com: Password1@
test@test.com: TestUser9#
```

## Security Considerations

- **Input Validation & Sanitization**: Zod is used to validate/sanitize user input with comprehensive schema validation
- **Session Management**: User sessions are stored in encrypted JWT cookies using the `SESSION_SECRET` environment variable
- **Password Security**:
  - Passwords are hashed using bcryptjs with salt rounds of 12
  - Strong password requirements enforced (9+ chars, uppercase, number, special character)
  - Passwords are never returned in API responses (stripped from user objects)
- **Authentication & Authorization**:
  - Route protection via Next.js middleware for protected/public routes
  - Automatic redirect logic based on authentication status
  - Session validation on every protected route access
- **Cookie Security**:
  - HttpOnly cookies prevent XSS attacks
  - Secure flag ensures cookies only sent over HTTPS
  - Automatic session cleanup and expiration (7 days)
- **Reset Password Flow Security**:
  - Time-limited reset access tokens (5 minutes expiration)
  - Separate token validation for reset password page access
  - Automatic cleanup of reset tokens after successful login
- **Environment Variable Validation**:
  - Type-safe environment variable validation using @t3-oss/env-nextjs
  - Required security variables validated at build time
- **Server-Side Security**:
  - "server-only" imports ensure sensitive code doesn't leak to client
  - JWT tokens use HS256 algorithm with proper key encoding
  - Error handling prevents information leakage (generic error messages)
- **Case-Insensitive Email Handling**: Email lookups are case-insensitive to prevent enumeration attacks
