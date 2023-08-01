import { useState } from 'react';
import { ReturnIcon } from '../../../../svg';
import UnderlineInput from './underlineInput';

export default function CreateGroup() {
  const [name, setName] = useState('');

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
      </div>
    </div>
  );
}
