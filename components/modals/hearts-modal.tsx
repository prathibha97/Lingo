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
import { useHeartsModal } from '@/store/use-hearts-modal';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

interface HeartsModalProps {}

export const HeartsModal: FC<HeartsModalProps> = ({}) => {
  const router = useRouter();
  const [isClient, setisClient] = useState(false);
  const { isOpen, close } = useHeartsModal();

  useEffect(() => setisClient(true), []);

  const onClick = ()=>{
    close()
    router.push('/store');
  }

  if (!isClient) {
    return null;
  }
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <div className='flex items-center w-full justify-center mb-5'>
            <Image src='/mascot_bad.svg' alt='Mascot' height={80} width={80} />
          </div>
          <DialogTitle className='text-center font-bold text-2xl'>
            You ran out of hearts!
          </DialogTitle>
          <DialogDescription className='text-center text-base'>
            Get pro for unlimited hearts, or purchase them from the store.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='mb-4'>
          <div className='flex flex-col gap-y-4 w-full'>
            <Button
              className='w-full'
              variant='primaryOutline'
              size='lg'
              onClick={onClick}
            >
              Get unlimited hearts
            </Button>
            <Button
              className='w-full'
              variant='dangerOutline'
              size='lg'
              onClick={close}
            >
              No thanks
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

