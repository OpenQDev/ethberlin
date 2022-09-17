// Third party
import React from 'react';
import { useRouter } from 'next/router';
// Custom
import Image from 'next/image';

const SignIn = ({ redirectUrl }) => {
  const router = useRouter();

  const signIn = () => {
    const clientId = `client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}`;
    router.push(`https://github.com/login/oauth/authorize?${clientId}`);
  };

  return (
    <button
      onClick={() => signIn()}
      className={'flex justify-center btn-default hover:border-[#8b949e] hover:bg-[#30363d] w-full'}
    >
      <div className='flex flex-row items-center justify-center space-x-3'>
        <div className='h-4 w-4 md:h-6 md:w-6 relative'>
          <Image
            src='/social-icons/github-logo-white.svg'
            alt='Picture of the author'
            layout='fill'
            objectFit='cover'
          />
        </div>
        <div>Sign In</div>
      </div>
    </button>
  );
};

export default SignIn;
