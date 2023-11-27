import { UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div className='bg-blue-500'>
      <UserButton afterSignOutUrl='/' />

      <p>Adding a note that I'm very excited about this new job!</p>
      <p>Adding another note that everyone on the team is awesome!</p>
    </div>
  );
}
