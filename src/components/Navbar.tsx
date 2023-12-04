import React from 'react';
import Link from 'next/link';
import { UserButton, auth } from '@clerk/nextjs';
import CustomSignOutButton from '@/app/custom-flows/sign-out/page';

export default function Navbar() {
  const { userId } = auth();

  return (
    <div className='font-bold text-lg'>
      {userId ? (
        <nav className='flex-dir-row'>
          <UserButton afterSignOutUrl='/' />
          <Link href='/user-profile'>Profile</Link>
          <br />
          <Link href='/dashboard'>Dashboard</Link>
          <CustomSignOutButton />
        </nav>
      ) : (
        <nav>
          <Link href='/'>Home</Link>
          <Link href='/sign-in'>Sign In</Link>{' '}
          <Link href='/sign-up'>Sign Up</Link>
        </nav>
      )}
    </div>
  );
}
