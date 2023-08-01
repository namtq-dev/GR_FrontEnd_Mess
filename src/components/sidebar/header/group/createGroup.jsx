import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReturnIcon, ValidIcon } from '../../../../svg';
import UnderlineInput from './underlineInput';
import MultipleSelect from './multipleSelect';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { createGroupConversation } from '../../../../reducers/features/chatSlice';

export default function CreateGroup({ setShowCreateGroup }) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { status } = useSelector((state) => state.chat);

  const [groupName, setGroupName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSearch = async (e) => {
    if (e.target.value && e.key === 'Enter') {
      setSearchResults([]);
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/searchMess?search=${e.target.value}`,
          {
            headers: {
              Authorization: `Bearer ${user.loginToken}`,
            },
          }
        );
        if (data.length > 0) {
          let tempArray = [];
          data.forEach((user) => {
            let tempUser = {
              value: user._id,
              label: user.firstName + user.lastName,
              picture: user.picture,
            };
            tempArray.push(tempUser);
          });
          setSearchResults(tempArray);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    } else {
      setSearchResults([]);
    }
  };

  const createGroupHandler = async () => {
    if (status !== 'loading') {
      let users = [];
      selectedUsers.forEach((user) => {
        users.push(user.value); // get users' ID only
      });

      let values = {
        groupName,
        users,
        loginToken: user.loginToken,
      };

      let newConver = await dispatch(createGroupConversation(values));
      setShowCreateGroup(false);
    }
  };

  return (
    <div className="createGroupAnimation relative flex0030 h-full z-40">
      <div className="mt-5">
        <button
          className="btn w-6 h-6 border"
          onClick={() => setShowCreateGroup(false)}
        >
          <ReturnIcon className="fill-white" />
        </button>
        <UnderlineInput groupName={groupName} setGroupName={setGroupName} />
        {/* Select users for group chat */}
        <MultipleSelect
          searchResults={searchResults}
          setSelectedUsers={setSelectedUsers}
          handleSearch={handleSearch}
        />
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2">
          <button
            className="btn bg-green_1 scale-150 hover:bg-green-500"
            onClick={() => createGroupHandler()}
          >
            {status === 'loading' ? (
              <ClipLoader color="#E9EDEF" size={25} />
            ) : (
              <ValidIcon className="fill-white mt-2 h-full" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
