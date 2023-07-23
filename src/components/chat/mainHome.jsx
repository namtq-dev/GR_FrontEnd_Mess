import { Logo } from '../../svg';

export default function MainHome() {
  return (
    <div className="h-full w-full dark:bg-dark_bg_4 select-none border-l dark:border-l-dark_border_2 border-b-[6px] border-b-green_2">
      <div className="-mt-1.5 w-full h-full flex flex-col gap-y-8 items-center justify-center">
        <span>
          <Logo />
        </span>
        {/* Infos */}
        <div className="mt-1 text-center space-y-[12px]">
          <h1 className="text-[32px] dark:text-dark_text_4 font-extralight">
            Aimer Chat
          </h1>
          <p className="text-sm dark:text-dark_text_3">
            Connect Seamlessly - Chat Endlessly <br />
            Your ultimate Messaging and Video Calling App!
          </p>
        </div>
      </div>
    </div>
  );
}
