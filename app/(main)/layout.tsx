import { MobileHeader } from '@/components/mobile-header';
import { Sidebar } from '@/components/sidebar';

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MobileHeader />
      <Sidebar className='hidden lg:flex' />
      <main className='lg:pl-[256px] h-full pt-[50px] lg:pt-0'>
        <div className='bg-red-500 h-full'>{children}</div>
      </main>
    </>
  );
}
