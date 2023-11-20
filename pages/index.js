import { Inter } from "@next/font/google";
import Sidebar from "@/components/Sidebar";
import Postsfeed from "@/components/Postsfeed";
import Trending from "@/components/Trending";
import BottomBanner from "@/components/BottomBanner";
import { useSelector } from "react-redux";
import CommentModal from "@/components/modals/CommentModal";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const username = useSelector(state => state.user.username)
  
  return (
    <div>
      <div className="bg-black min-h-screen text-[#E7E9EA] max-w-[1400px] mx-auto flex">
        <Sidebar />
        <Postsfeed />
        <Trending />
      </div>

      <CommentModal />

      {!username && <BottomBanner />}
    </div>
  );
}
