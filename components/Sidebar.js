import {
  HomeIcon,
  HashtagIcon,
  InboxIcon,
  BookmarkIcon,
  BellIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import SidebarLink from "./SidebarLink";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "@/redux/userSlice";
import { closeLoginModal, closeSignupModal } from "@/redux/modalSlice";

export default function Sidebar() {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user)

  async function handleSignOut() {
    await signOut(auth);
    dispatch(signOutUser());
    dispatch(closeSignupModal())
    dispatch(closeLoginModal());
  }

  return (
    <div className="hidden sm:flex flex-col fixed h-full xl:ml-24">
      <nav className="h-full relative xl:space-y-1.5">
        <div className="flex items-center py-3 p-3 justify-start">
          <Image src={"/assets/twitter-logo.png"} width={34} height={34} />
        </div>
        <SidebarLink Icon={HomeIcon} text={"Home"} />
        <SidebarLink Icon={HashtagIcon} text={"Explore"} />
        <SidebarLink Icon={BellIcon} text={"Notifications"} />
        <SidebarLink Icon={InboxIcon} text={"Messages"} />
        <SidebarLink Icon={BookmarkIcon} text={"Bookmarks"} />
        <SidebarLink Icon={UserIcon} text={"Profile"} />
        <SidebarLink Icon={DotsCircleHorizontalIcon} text={"More"} />
        <button className="hidden xl:inline bg-[#1d9bf0] hover:bg-[#1a8cd8] rounded-full h-[52px] w-[200px] mt-2 text-lg font-bold">
          Tweet
        </button>
      </nav>
      
      <div
        className="absolute bottom-0 xl:p-3 flex justify-center items-center p-3 space-x-3 hover:bg-white hover:bg-opacity-10 rounded-full cursor-pointer"
        onClick={handleSignOut}
      >
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={user.photoUrl || "/assets/kylie.png"}
        />
        <div className="hidden xl:inline">
          <h1 className="font-bold whitespace-nowrap">{user.name}</h1>
          <h1 className="text-gray-500">@{user.username}</h1>
        </div>
        <DotsHorizontalIcon className="hidden h-5 xl:inline" />
      </div>
    </div>
  );
}
