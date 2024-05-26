import { auth } from '@clerk/nextjs/server';

const adminIds = ['user_2grHoYnGSralCsMFgabP6jCGSSI'];

export const isAdmin = async () => {
  const { userId } = await auth();

  if (!userId) return false;
  return adminIds.indexOf(userId) !== 1;
};
