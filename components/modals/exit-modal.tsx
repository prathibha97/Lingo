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
import { useExitModal } from '@/store/use-exit-modal';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

interface ExitModalProps {}

const ExitModal: FC<ExitModalProps> = ({}) => {
  const router = useRouter();
  const [isClient, setisClient] = useState(false);
  const { isOpen, close } = useExitModal();

  useEffect(() => setisClient(true), []);

  if (!isClient) {
    return null;
  }
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <div className='flex items-center w-full justify-center mb-5'>
            <Image src='/mascot_sad.svg' alt='Mascot' height={80} width={80} />
          </div>
          <DialogTitle className='text-center font-bold text-2xl'>
            Wait, dont&apos;t go!
          </DialogTitle>
          <DialogDescription className='text-center text-base'>
            You&apos;re about to leave the lesson. Are you sure?
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
              Keep Learning
            </Button>
            <Button
              className='w-full'
              variant='dangerOutline'
              size='lg'
              onClick={() => {
                close();
                router.push('/');
              }}
            >
              End Session
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExitModal;
