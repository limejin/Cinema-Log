import Image from 'next/image';

export default function Home() {
  return (
    <>
      <div className='pt-50 pb-50 ml-300 bg-slate-300'>
        <div className='w-auto'>
          <div className='h-auto max-w-screen-md my-0 mx-auto'>
            <div className=' bg-gradient-to-r from-cyan-500 to-blue-500 h-52 bg-center-right bg-cover'>
              <div className='bg-slate-900 h-full p-20 text-white font-light relative'>
                <a className='absolute cursor-pointer left-0 top-7/20 text-grey'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'
                    />
                  </svg>
                </a>
                <a className='absolute cursor-pointer right-0 top-7/20 text-grey'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3'
                    />
                  </svg>
                </a>

                <div className='row pl-15/100'>
                  <h3>8월</h3>
                  <h5>오늘은 8월 9일입니다.</h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-white p-20 pl-15/100 pr-15/100 overflow-hidden'>
          <div className='text-center'>
            <div className='row flex'>
              <div className='col grow'>월</div>
              <div className='col grow'>화</div>
              <div className='col grow'>수</div>
              <div className='col grow'>목</div>
              <div className='col grow'>금</div>
              <div className='col grow'>토</div>
              <div className='col grow'>일</div>
            </div>
          </div>
          <div className='text-center'>
            <div className='row flex'>
              <div className='col grow'></div>
              <div className='col grow'>1</div>
              <div className='col grow'>2</div>
              <div className='col grow'>3</div>
              <div className='col grow'>4</div>
              <div className='col grow'>5</div>
              <div className='col grow'>6</div>
            </div>
            <div className='row flex'>
              <div className='col grow'>7</div>
              <div className='col grow'>8</div>
              <div className='col grow'>9</div>
              <div className='col grow'>10</div>
              <div className='col grow'>11</div>
              <div className='col grow'>12</div>
              <div className='col grow'>13</div>
            </div>
            <div className='row flex'>
              <div className='col grow'>14</div>
              <div className='col grow'>15</div>
              <div className='col grow'>16</div>
              <div className='col grow'>17</div>
              <div className='col grow'>18</div>
              <div className='col grow'>19</div>
              <div className='col grow'>20</div>
            </div>
            <div className='row flex'>
              <div className='col grow'>21</div>
              <div className='col grow'>22</div>
              <div className='col grow'>23</div>
              <div className='col grow'>24</div>
              <div className='col grow'>25</div>
              <div className='col grow'>26</div>
              <div className='col grow'>27</div>
            </div>

            <div className='row flex'>
              <div className='col grow'>28</div>
              <div className='col grow'>29</div>
              <div className='col grow'>30</div>
              <div className='col grow'>31</div>
              <div className='col grow'></div>
              <div className='col grow'></div>
              <div className='col grow'></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
