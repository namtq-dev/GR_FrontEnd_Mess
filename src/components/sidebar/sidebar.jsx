import { SidebarHeader } from './header';
import Notifications from './notifications';

export default function Sidebar() {
  return (
    <div className="w-[40%] h-full select-none">
      <SidebarHeader />
      <Notifications />
    </div>
  );
}
