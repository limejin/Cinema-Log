'use client';

import dayjs, { Dayjs } from 'dayjs';

import { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { format } from 'path';
import Image from 'next/image';

let colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
];

const cinemaLogs = [
  {
    id: 1,
    name: '바비',
    imageUrl:
      'https://i.namu.wiki/i/-aJLl0K4fW_WDkzo0jyNZPQJH8e5X2J-D-CjjL7H_7xDqDVP1T0L_qM_Q91oo1RgjSwFHgLmyMbs85hR0FK2Bw.webp',
    startTime: '2023-08-22T13:00',
    endTime: '2023-08-22T15:00',
  },
];

export default function Home() {
  const today: Dayjs = dayjs();
  const [selectedDay, setSelectedDay] = useState<Dayjs>(today);
  const [currentMonth, setCurrentMonth] = useState<string>(
    today.format('MMMM YYYY')
  );
  const [daysInCurrentMonth, setDaysInCurrentMonth] = useState<Dayjs[]>([]);
  const [openCreateCinemaLog, setOpenCreateCinemaLog] = useState<boolean>(true);
  let dateOfMonth: Dayjs = dayjs(currentMonth).date(1);

  let cinemaLogsOfselectedDay = cinemaLogs.filter(cinemaLog =>
    dayjs(cinemaLog.startTime).isSame(selectedDay, 'day')
  );

  const previousMonth = () => {
    let previousMonth = dateOfMonth.subtract(1, 'month').format('MMMM YYYY');

    setCurrentMonth(previousMonth);
  };

  const nextMonth = () => {
    let nextMonth = dateOfMonth.add(1, 'month').format('MMMM YYYY');

    setCurrentMonth(nextMonth);
  };

  useEffect(() => {
    const year = dateOfMonth.get('year');
    const month = dateOfMonth.get('month') + 1;
    const daysInMonth = dateOfMonth.daysInMonth();

    const tempDaysInMonth: Dayjs[] = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = dayjs(`${year}-${month}-${day}`);
      tempDaysInMonth.push(date);
    }

    setDaysInCurrentMonth(tempDaysInMonth);
  }, [currentMonth]);

  const selectedDayButtonClick =
    (day: Dayjs) =>
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      setSelectedDay(day);
    };

  const filterClassNames = (...classes: any[]) => {
    return classes.filter(Boolean).join(' ');
  };

  const createCinemaLog = () => {
    //정보 입력 팝업 결정
    setOpenCreateCinemaLog(false);
  };
  return (
    <>
      {openCreateCinemaLog ? (
        <div className='pt-16'>
          <div className='max-w-md px-4 mx-auto sm:px-7 md:max-w-4x1 md:px-6'>
            <div className='md:grid md:grid-cols-2 md:divide-x md:divide-gray-200'>
              <div className='md:pr-14'>
                <div className='flex items-center'>
                  <h2 className='flex-auto font-semibold text-gray-900'>
                    {dateOfMonth.format('MMMM YYYY')}
                  </h2>
                  <button
                    type='button'
                    onClick={previousMonth}
                    className='-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500'
                  >
                    <span className='sr-only'>Previous month</span>
                    <ChevronLeftIcon className='w-5 h-5' aria-hidden='true' />
                  </button>
                  <button
                    onClick={nextMonth}
                    type='button'
                    className='-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500'
                  >
                    <span className='sr-only'>Next month</span>
                    <ChevronRightIcon className='w-5 h-5' aria-hidden='true' />
                  </button>
                </div>
                <div className='grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500'>
                  <div>S</div>
                  <div>M</div>
                  <div>T</div>
                  <div>W</div>
                  <div>T</div>
                  <div>F</div>
                  <div>S</div>
                </div>
                <div className='grid grid-cols-7 mt-2 text-sm'>
                  {daysInCurrentMonth.map((day, dayIndex) => (
                    <div
                      key={day.toString()}
                      // className={`${colStartClasses[day.get('day')]} py-1.5`}
                      className={filterClassNames(
                        dayIndex === 0 && colStartClasses[day.get('day')],
                        'py-1.5'
                      )}
                    >
                      <button
                        type='button'
                        onClick={selectedDayButtonClick(day)}
                        className={filterClassNames(
                          day.isSame(selectedDay) && 'text-white',
                          !day.isSame(selectedDay) &&
                            day.isSame(dayjs(), 'day') &&
                            'text-red-500',
                          !day.isSame(selectedDay) &&
                            !day.isSame(dayjs(), 'day') &&
                            day.isSame(dateOfMonth, 'month') &&
                            'text-gray-900',
                          !day.isSame(selectedDay) &&
                            !day.isSame(dayjs(), 'day') &&
                            !day.isSame(dateOfMonth, 'month') &&
                            'text-gray-400',
                          day.isSame(selectedDay) &&
                            day.isSame(dayjs(), 'day') &&
                            'bg-red-500',
                          day.isSame(selectedDay) &&
                            !day.isSame(dayjs(), 'day') &&
                            'bg-gray-900',
                          !day.isSame(selectedDay) && 'hover:bg-gray-200',
                          (day.isSame(selectedDay) ||
                            day.isSame(dayjs(), 'day')) &&
                            'font-semibold',
                          'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                        )}
                      >
                        <time dateTime={day.format('YYYY-MM-DD')}>
                          {day.get('date')}
                        </time>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <section className='mt-12 md:mt-0 md:p1-14'>
                <h2 className='font-semibold text-gray-900'>
                  <time dateTime={selectedDay.format('YYYY-MM-DD')}>
                    {selectedDay.format('YYYY년 MM월 DD일')}
                  </time>{' '}
                  <p></p>
                  cinema log...
                </h2>
                <ol className='mt-4 space-y-1 text-sm leading-6 text-gray-500'>
                  {cinemaLogsOfselectedDay.length > 0 ? (
                    cinemaLogsOfselectedDay.map(cinemalog => (
                      <Image
                        key={cinemalog.id}
                        src={cinemalog.imageUrl}
                        alt={cinemalog.name}
                        width={300}
                        height={300}
                      ></Image>
                    ))
                  ) : (
                    <p>
                      Would you like to create a log?
                      <button
                        onClick={createCinemaLog}
                        type='button'
                        className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-3 py-1.5 ml-2 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
                      >
                        Yes
                      </button>
                    </p>
                  )}
                </ol>
              </section>
            </div>
          </div>
        </div>
      ) : (
        <div className='w-full max-w-xs'>
          <form className='w-full max-w-lg'>
            <label
              htmlFor='formFile'
              className='mb-2 inline-block text-black dark:text-neutral-200'
            >
              그 날의 로그 사진을 업로드 해주세요
            </label>
            <input
              className='relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary'
              type='file'
              id='formFile'
            />
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-first-name'
                >
                  First Name
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                  id='grid-first-name'
                  type='text'
                  placeholder='Jane'
                ></input>
                <p className='text-red-500 text-xs italic'>
                  Please fill out this field.
                </p>
              </div>
              <div className='w-full md:w-1/2 px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-last-name'
                >
                  Last Name
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-last-name'
                  type='text'
                  placeholder='Doe'
                ></input>
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-password'
                >
                  Password
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-password'
                  type='password'
                  placeholder='******************'
                ></input>
                <p className='text-gray-600 text-xs italic'>
                  Make it as long and as crazy as you'd like
                </p>
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-2'>
              <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-city'
                >
                  City
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-city'
                  type='text'
                  placeholder='Albuquerque'
                ></input>
              </div>
              <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-state'
                >
                  State
                </label>
                <div className='relative'>
                  <select
                    className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    id='grid-state'
                  >
                    <option>New Mexico</option>
                    <option>Missouri</option>
                    <option>Texas</option>
                  </select>
                  <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                    <svg
                      className='fill-current h-4 w-4'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                    >
                      <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                    </svg>
                  </div>
                </div>
              </div>
              <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-zip'
                >
                  Zip
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-zip'
                  type='text'
                  placeholder='90210'
                ></input>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
