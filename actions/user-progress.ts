'use server';

import { POINTS_TO_REFILL } from '@/constants';
import db from '@/database/drizzle';
import {
  getCourseById,
  getUserProgress,
  getUserSubscription,
} from '@/database/queries';
import { challengeProgress, challenges, userProgress } from '@/database/schema';
import { auth, currentUser } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

/**
 * Updates or inserts user progress for a given course.
 *
 * @param {number} courseId - The ID of the course.
 * @throws {Error} Throws an error if the user is unauthorized.
 * @return {Promise<void>} Returns a promise that resolves when the user progress is updated or inserted.
 */
export const upsertUserProgress = async (courseId: number) => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!user || !userId) {
    throw new Error('Unauthorized');
  }

  const course = await getCourseById(courseId);

  if (!course) {
    throw new Error('Course not found');
  }

  if (!course.units.length || !course.units[0].lessons.length) {
    throw new Error('Course is empty');
  }

  const existingUserProgress = await getUserProgress();

  if (existingUserProgress) {
    await db.update(userProgress).set({
      activeCourseId: courseId,
      username: user.firstName || 'User',
      userImageSrc: user.imageUrl || '/mascot.svg',
    });
    revalidatePath('/courses');
    revalidatePath('/learn');
    redirect('/learn');
  }

  await db.insert(userProgress).values({
    userId: userId!,
    activeCourseId: courseId,
    username: user.firstName || 'User',
    userImageSrc: user.imageUrl || '/mascot.svg',
  });

  revalidatePath('/courses');
  revalidatePath('/learn');
  redirect('/learn');
};

/**
 * Reduces the hearts of the user associated with the given challenge ID.
 *
 * @param {number} challengeId - The ID of the challenge.
 * @return {Promise<{ error: string } | void>} Returns an object with an error message if the user is not authorized,
 * if the user progress is not found, or if the user has no hearts left. Returns nothing if the hearts are successfully reduced.
 * @throws {Error} Throws an error if the challenge is not found.
 */
export const reduceHearts = async (challengeId: number) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const currentUserProgress = await getUserProgress();
  const userSubscription = await getUserSubscription();

  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeId)
    ),
  });

  const isPractice = !!existingChallengeProgress;

  if (isPractice) {
    return { error: 'practice' };
  }

  if (!currentUserProgress) {
    throw new Error('User progress not found');
  }

  if (userSubscription?.isActive) {
    return { error: 'subscription' };
  }
  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });

  if (!challenge) {
    throw new Error('Challenge not found');
  }

  const lessonId = challenge.lessonId;

  if (currentUserProgress.hearts === 0) {
    return { error: 'hearts' };
  }

  await db
    .update(userProgress)
    .set({
      hearts: Math.max(currentUserProgress.hearts - 1, 0),
    })
    .where(eq(userProgress.userId, userId));

  revalidatePath('/shop');
  revalidatePath('/learn');
  revalidatePath('/quests');
  revalidatePath('/leaderboard');
  revalidatePath(`/lesson/${lessonId}`);
};

export const refillHearts = async () => {
  const currentUserProgress = await getUserProgress();

  if (!userProgress) {
    throw new Error('User progress not found');
  }

  if (currentUserProgress?.hearts === 5) {
    throw new Error('Hearts are already full');
  }

  if (currentUserProgress && currentUserProgress?.points < POINTS_TO_REFILL) {
    throw new Error('Not enough points');
  }

  await db
    .update(userProgress)
    .set({
      hearts: 5,
      points: currentUserProgress?.points! - POINTS_TO_REFILL,
    })
    .where(eq(userProgress.userId, currentUserProgress?.userId!));

  revalidatePath('/shop');
  revalidatePath('/learn');
  revalidatePath('/quests');
  revalidatePath('/leaderboard');
};
