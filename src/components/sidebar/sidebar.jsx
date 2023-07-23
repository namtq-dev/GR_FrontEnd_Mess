import { useState } from 'react';
import { SidebarHeader } from './header';
import Notifications from './notifications';
import { Search } from './search';
import { Conversations } from './conversations';

export default function Sidebar() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="w-[40%] h-full select-none">
      <SidebarHeader />
      <Notifications />
      <Search
        searchResultsLength={searchResults.length}
        setSearchResults={setSearchResults}
      />
      <Conversations />
    </div>
  );
}
