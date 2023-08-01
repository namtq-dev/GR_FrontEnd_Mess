import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ReturnIcon } from '../../../../svg';
import UnderlineInput from './underlineInput';
import MultipleSelect from './multipleSelect';

export default function CreateGroup() {
  const { user } = useSelector((state) => state.user);
  const { status } = useSelector((state) => state.chat);

  const [name, setName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSearch = async (eve) => {};

  return (
    <div className="createGroupAnimation relative flex0030 h-full z-40">
      <div className="mt-5">
        <button
          className="btn w-6 h-6 border"
          // onClick={() => setShowCreateGroup(false)}
        >
          <ReturnIcon className="fill-white" />
        </button>
        <UnderlineInput name={name} setName={setName} />
        {/* Select users for group chat */}
        <MultipleSelect
          searchResults={searchResults}
          setSelectedUsers={setSelectedUsers}
          handleSearch={handleSearch}
        />
      </div>
    </div>
  );
}
