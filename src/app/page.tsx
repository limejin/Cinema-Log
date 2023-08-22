'use client';

import dayjs, { Dayjs } from 'dayjs';

import { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

let colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
];

export default function Home() {
  const today: Dayjs = dayjs();
  const [selectedDay, setSelectedDay] = useState<Dayjs>(today);
  const [currentMonth, setCurrentMonth] = useState<string>(
    today.format('MMMM YYYY')
  );
  const [daysInCurrentMonth, setDaysInCurrentMonth] = useState<Dayjs[]>([]);

  let dateOfMonth: Dayjs = dayjs(currentMonth).date(1);

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
                      {day.get('date')}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
