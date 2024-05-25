'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { usePracticeModal } from '@/store/use-practice-modal';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

interface PracticeModalProps {}

export const PracticeModal: FC<PracticeModalProps> = ({}) => {
  const router = useRouter();
  const [isClient, setisClient] = useState(false);
  const { isOpen, close } = usePracticeModal();

  useEffect(() => setisClient(true), []);

  if (!isClient) {
    return null;
  }
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <div className='flex items-center w-full justify-center mb-5'>
            <Image src='/heart.svg' alt='Heart' height={100} width={100} />
          </div>
          <DialogTitle className='text-center font-bold text-2xl'>
            Practice Lesson
          </DialogTitle>
          <DialogDescription className='text-center text-base'>
            Use practice lessons to regain hearts and points. You cannot loose
            hearts or points in the practice lessons.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='mb-4'>
          <div className='flex flex-col gap-y-4 w-full'>
            <Button
              className='w-full'
              variant='primary'
              size='lg'
              onClick={close}
            >
              I understand
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
