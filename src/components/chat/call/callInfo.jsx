export default function CallInfo({ name }) {
  return (
    <div className="absolute top-12 z-40 w-full p-1">
      <div className="flex flex-col items-center">
        {/*Call infos*/}
        <div className="flex flex-col items-center gap-y-1">
          <h3 className="text-white text-lg">
            <b>{name ? name : ''}</b>
          </h3>
          <span className="text-dark_text_1">Ringing...</span>
        </div>
      </div>
    </div>
  );
}
