import { UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div className='bg-blue-500'>
      <UserButton afterSignOutUrl='/' />
    </div>
  );
}
