'use client';

import Link from 'next/link';

const Home = () => {
  return (
    <>
      <div className='flex flex-col justify-center items-center w-full h-screen bg-black m-0'>
        <p>Welcome to Cinema-Log</p>

        <div>
          <p className='typing-text'>please enter your name...</p>

          <input className='input-show-up' type='text' maxLength={10} />
        </div>
        <Link href='/movie'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='animate-bounce w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </Link>
      </div>
    </>
  );
};

export default Home;
