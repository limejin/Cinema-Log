'use client';

import dayjs, { Dayjs } from 'dayjs';

import { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import LogModal from './logModal';

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
    startTime: '2023-09-20T13:00',
    endTime: '2023-09-20T15:00',
    emoji: '💫',
  },
];

const Home = () => {
  const today: Dayjs = dayjs();
  const [selectedDay, setSelectedDay] = useState<Dayjs>(today);
  const [currentMonth, setCurrentMonth] = useState<string>(
    today.format('MMMM YYYY')
  );
  const [daysInCurrentMonth, setDaysInCurrentMonth] = useState<Dayjs[]>([]);
  const [openCreateCinemaLog, setOpenCreateCinemaLog] =
    useState<boolean>(false);
  let dateOfMonth: Dayjs = dayjs(currentMonth).date(1);
  let cinemaLogsOfselectedDay = cinemaLogs.filter(cinemaLog =>
    dayjs(cinemaLog.startTime).isSame(selectedDay, 'day')
  );

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

  const previousMonth = () => {
    let previousMonth = dateOfMonth.subtract(1, 'month').format('MMMM YYYY');

    setCurrentMonth(previousMonth);
  };

  const nextMonth = () => {
    let nextMonth = dateOfMonth.add(1, 'month').format('MMMM YYYY');

    setCurrentMonth(nextMonth);
  };

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
    setOpenCreateCinemaLog(true);
  };

  return (
    <>
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
            <section className='mt-12 md:mt-0 md:pl-14'>
              <h2 className='font-semibold text-gray-900'>
                <time dateTime={selectedDay.format('YYYY-MM-DD')}>
                  {selectedDay.format('YYYY년 MM월 DD일')}
                </time>{' '}
                cinema log...
              </h2>
              <div className='mt-4 space-y-1 text-sm leading-6 text-gray-500'>
                {cinemaLogsOfselectedDay.length > 0 ? (
                  cinemaLogsOfselectedDay.map(cinemalog => (
                    <>
                      <div
                        className='flex justify-center realative'
                        key={cinemalog.id}
                      >
                        <Image
                          key={cinemalog.id}
                          src={cinemalog.imageUrl}
                          alt={cinemalog.name}
                          width={300}
                          height={300}
                        ></Image>
                        <div className='flex justify-center mt-2 w-12 h-12  text-3xl rounded-full absolute'>
                          {cinemalog.emoji}
                        </div>
                      </div>
                    </>
                  ))
                ) : (
                  <p>There&apos;s no log...</p>
                )}
              </div>
            </section>
          </div>
          <div className='flex justify-center items-center text-black'>
            Would you like to create a log?
            <button
              onClick={createCinemaLog}
              type='button'
              className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-3 py-1.5 ml-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
            >
              Yes
            </button>
          </div>
        </div>
      </div>
      {openCreateCinemaLog && (
        <LogModal setOpenCreateCinemaLog={setOpenCreateCinemaLog}></LogModal>
      )}
    </>
  );
};

export default Home;
