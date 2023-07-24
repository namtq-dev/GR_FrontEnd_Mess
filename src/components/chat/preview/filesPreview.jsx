import { useState } from 'react';
import Header from './header';
import FileViewer from './fileViewer';
import Input from './input';
import HandleFiles from './handleFiles';

export default function FilesPreview() {
  const [message, setMessage] = useState('');

  return (
    <div className="relative py-2 w-full flex items-center justify-center">
      <div className="w-full flex flex-col items-center">
        <Header />
        <FileViewer />
        <div className="w-full flex flex-col items-center">
          <Input message={message} setMessage={setMessage} />
          <HandleFiles />
        </div>
      </div>
    </div>
  );
}
