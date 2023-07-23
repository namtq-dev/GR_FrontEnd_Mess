import { useState } from 'react';
import { FilterIcon, ReturnIcon, SearchIcon } from '../../../svg';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function Search({ searchResultsLength, setSearchResults }) {
  const { user } = useSelector((state) => state.user);

  const [showArrow, setShowArrow] = useState(false);

  const handleSearch = async (eve) => {
    if (eve.target.value && eve.key === 'Enter') {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/searchMess?search=${eve.target.value}`,
          {
            headers: {
              Authorization: `Bearer ${user.loginToken}`,
            },
          }
        );

        setSearchResults(data);
      } catch (error) {
        console.log(error.response.data.message);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="h-[49px] py-1.5">
      <div className="px-[10px]">
        <div className="flex items-center gap-x-2">
          <div className="w-full flex dark:bg-dark_bg_2 rounded-lg pl-2">
            {showArrow || searchResultsLength > 0 ? (
              <span
                className="w-8 flex items-center justify-center rotateAnimation cursor-pointer"
                onClick={() => setSearchResults([])}
              >
                <ReturnIcon className="fill-green_1 w-5" />
              </span>
            ) : (
              <span className="w-8 flex items-center justify-center ">
                <SearchIcon className="dark:fill-dark_svg_2 w-5" />
              </span>
            )}
            <input
              type="text"
              placeholder="Search or start a new chat"
              className="input"
              onFocus={() => setShowArrow(true)}
              onBlur={() => searchResultsLength === 0 && setShowArrow(false)}
              onKeyDown={(eve) => handleSearch(eve)}
            />
          </div>
          <button className="btn">
            <FilterIcon className="dark:fill-dark_svg_2" />
          </button>
        </div>
      </div>
    </div>
  );
}
