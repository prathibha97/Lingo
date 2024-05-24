import { lessons, units } from '@/database/schema';
import { FC } from 'react';
import { LessonButton } from './lessonButton';
import { UnitBanner } from './unit-banner';

interface UnitProps {
  id: number;
  order: number;
  title: string;
  description: string;
  lessons: (typeof lessons.$inferSelect & {
    completed: boolean;
  })[];
  activeLesson:
    | (typeof lessons.$inferSelect & {
        unit: typeof units.$inferSelect;
      })
    | undefined;
  activeLessonPersentage: number;
}

export const Unit: FC<UnitProps> = ({
  activeLessonPersentage,
  activeLesson,
  description,
  id,
  lessons,
  order,
  title,
}) => {
  return (
    <>
      <UnitBanner title={title} description={description} />
      <div className='flex items-center flex-col relative'>
        {lessons.map((lesson, index) => {
          const isCurrent = lesson.id === activeLesson?.id;
          const isLocked = !lesson.completed && !isCurrent;
          return (
            <LessonButton
              key={lesson.id}
              id={lesson.id}
              index={index}
              totalCount={lessons.length - 1}
              current={isCurrent}
              locked={isLocked}
              percentage={activeLessonPersentage}
            />
          );
        })}
      </div>
    </>
  );
};
