import { useEffect, useState } from "react";
import Tweet from "./Tweet";
import TweetInput from "./TweetInput";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { signOutUser } from "@/redux/userSlice";
import { closeLoginModal, closeSignupModal } from "@/redux/modalSlice";

export default function Postsfeed() {
  const [tweets, setTweets] = useState([]);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  async function handleSignOut() {
    await signOut(auth);
    dispatch(signOutUser());
    dispatch(closeSignupModal());
    dispatch(closeLoginModal());
  }

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTweets(snapshot.docs);
    });

    return unsubscribe;
  }, []);

  return (
    <div className="sm:ml-16 xl:ml-[350px] max-w-2xl flex-grow border-gray-700 border-x">
      <div
        className="px-3 py-2 text-lg sm:text-xl font-bold border-b flex justify-between
       items-center border-gray-700 sticky top-0 z-50"
      >
        Home
        <img
          onClick={handleSignOut}
          className="w-10 h-10  rounded-full object-cover sm:hidden"
          src={user.photoUrl || "/assets/twitter-logo.png"}
        />
      </div>

      <TweetInput />

      {tweets.map((tweet) => {
        return <Tweet key={tweet.id} id={tweet.id} data={tweet.data()} />;
      })}

      <Tweet />
    </div>
  );
}
