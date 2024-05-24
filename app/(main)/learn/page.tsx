import { FeedWrapper } from '@/components/feed-wrapper';
import { StickyWrapper } from '@/components/sticky-wrapper';
import { UserProgress } from '@/components/user-progress';
import { getUserProgress } from '@/database/queries';
import { redirect } from 'next/navigation';
import { Header } from './header';

const LearnPage = async () => {
  const userProgressData = getUserProgress();
  const [userProgress] = await Promise.all([userProgressData]);
  console.log("🚀 ~ LearnPage ~ userProgress:", userProgress?.activeCourse)

  if (!userProgress || !userProgress.activeCourse) {
    redirect('/courses');
  }
  return (
    <div className='flex flex-row-reverse gap-[48px] px-6'>
      <StickyWrapper>
        <UserProgress
          activeCourse={{ title: 'Spanish', imageSrc: '/es.svg' }}
          hearts={5}
          points={100}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title='Spanish' />
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
