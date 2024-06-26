import { authMiddleware } from '@clerk/nextjs/server';
export default authMiddleware({
  // "/" will be accessible to all users
  publicRoutes: ['/api/webhooks/stripe', '/'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
