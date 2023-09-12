import dayjs from 'dayjs';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { useEffect, useState } from 'react';

export default function LogModal(setOpenCreateCinemaLog: any) {
  const [showEmojiPickerButton, setShowEmojiPickerButton] = useState(false);
  const [emojiPicked, setEmojiPicked] = useState('❔');

  const [searchMovieWord, setSearchMovieWord] = useState<String>('');

  const searchMovie = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value != null) {
      setSearchMovieWord(event.target.value);
    }
  };

  const [movieList, setMovieList] = useState<String[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/keyword?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${searchMovieWord}`
      );

      const { results } = await response.json();

      let resultsArray: String[] = [];
      results.map((result: any) => {
        resultsArray.push(result.name);
      });
      setMovieList(resultsArray);
    })();
  }, [searchMovieWord]);

  const [logDate, setLogDate] = useState<String>('');
  const showEmojiPicker = (event: any) => {
    event.preventDefault();
    setShowEmojiPickerButton(!showEmojiPickerButton);
  };

  const inputLogFile = (event: React.ChangeEvent<HTMLInputElement> | null) => {
    if (event != null && event.target.files) {
      let date = dayjs(event.target.files[0].lastModified);

      setLogDate(date.format('YYYY-MM-DD'));
    }
  };
  const changeEmojiPicked = (emojiData: EmojiClickData, event: MouseEvent) => {
    setEmojiPicked(emojiData.emoji);
    setShowEmojiPickerButton(!showEmojiPickerButton);
  };

  return (
    <>
      <div className='fixed top-0 left-0 w-full h-full  bg-green-200 flex   justify-center items-center'>
        <div className='w-full max-w-xs'>
          <form className='sw-full max-w-lg  '>
            <label htmlFor='formFile' className='mb-2 inline-block text-black '>
              그 날의 로그 사진을 업로드 해주세요
            </label>
            <input
              className='relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100dark:focus:border-primary'
              type='file'
              id='formFile'
              onChange={inputLogFile}
            />
            <div className='flex flex-wrap -mx-3 mt-3'>
              <div className='w-full px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 font-bold mb-2'
                  htmlFor='log_date'
                >
                  날짜
                </label>
                <p
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='log_date'
                >
                  {logDate}
                </p>
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mt-3'>
              <div className='w-full px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 font-bold mb-2'
                  htmlFor='search_movie'
                >
                  영화 검색
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  placeholder='영화 이름을 검색해주세요.'
                  id='search_movie'
                  onChange={searchMovie}
                ></input>
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mt-3'>
              <div className='w-full h-full px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 mb-2'
                  htmlFor='search_movie'
                >
                  그 날의 기분을 골라주세요.
                </label>
                <div className='w-full h-full flex justify-center items-center'>
                  <button
                    className='w-fit h-fit rounded-full'
                    onClick={showEmojiPicker}
                  >
                    {emojiPicked}
                  </button>
                </div>
                {showEmojiPickerButton && (
                  <EmojiPicker onEmojiClick={changeEmojiPicked} />
                )}
              </div>
            </div>
          </form>
          <div className='flex flex-wrap -mx-3 mt-6'>
            <div className='w-full h-full px-3'>
              <div className='w-full h-full flex justify-center items-center'>
                <button
                  className=' w-full h-full bg-black'
                  onClick={showEmojiPicker}
                >
                  create log
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
