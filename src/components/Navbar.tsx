import React from 'react';
import Link from 'next/link';
import { SignOutButton, UserButton, auth } from '@clerk/nextjs';

export default function Navbar() {
  const { userId } = auth();

  return (
    <div className='font-bold text-lg'>
      {userId ? (
        <nav className='flex-dir-row'>
          <UserButton afterSignOutUrl='/' />
          <Link href='/user-profile'>Profile</Link>
        </nav>
      ) : (
        <nav>
          <Link href='/'>Home</Link>{' '}
          <Link href='/custom-flows/sign-in'>Sign In</Link>{' '}
          <Link href='/custom-flows/sign-up'>Sign Up</Link>
        </nav>
      )}
    </div>
  );
}
