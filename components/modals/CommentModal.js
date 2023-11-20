import { db } from "@/firebase";
import { closeCommentModal } from "@/redux/modalSlice";
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import { Modal } from "@mui/material";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CommentModal() {
  const isOpen = useSelector((state) => state.modals.commentModalOpen);
  const userImg = useSelector((state) => state.user.photoUrl);
  const tweetDetails = useSelector(state => state.modals.commentTweetDetails)
  const user = useSelector(state => state.user)

  const dispatch = useDispatch();

  const [comment, setComment] = useState('')
  const router = useRouter();


  async function sendComment() {
    const docRef = doc(db, 'posts', tweetDetails.id) 
    const commentDetails = {
      username: user.username,
      name: user.name,
      photoUrl: user.photoUrl,
      comment: comment
    }
    await updateDoc(docRef, {
      comments: arrayUnion(commentDetails)
    })

    dispatch(closeCommentModal)
    router.push('/' + tweetDetails.id)
    
  }
  
  return (
    <>
      <Modal
        className="flex justify-center items-center"
        open={isOpen}
        onClose={() => dispatch(closeCommentModal())}
      >
        <div
          className="relative bg-black border border-gray-500 
        text-white w-full h-full sm:w-[600px] sm:h-[386px] rounded-lg sm:p-10 p-4"
        >
          <div
            className="absolute w-[2px] h-[77px] bg-gray-500 left-[40px] top-[96px]
           sm:left-[64px] sm:top-[120px]"
          ></div>
          <div
            className="absolute top-4 cursor-pointer"
            onClick={() => dispatch(closeCommentModal())}
          >
            <XIcon className="w-6" />
          </div>

          <div className="mt-8">
            <div className="flex space-x-3">
              <img
                src={userImg}
                className=" w-12 h-12 object-cover rounded-full"
              />
              <div>
                <div className="flex space-x-1.5">
                  <h1 className="font-bold">{tweetDetails.name}</h1>
                  <h1 className="text-gray-500">@{tweetDetails.username}</h1>
                </div>
                <p className="mt-1">{tweetDetails.tweet}</p>
                <h1 className=" text-gray-500 text-[15px] mt-2">
                  Replying to <span className="text-[#1b9bf0]">@{tweetDetails.username}</span>
                </h1>
              </div>
            </div>
          </div>

          <div className="mt-11">
            <div className="flex space-x-3">
              <img
                src={userImg}
                className=" w-12 h-12 object-cover rounded-full"
              />
              <div className="w-full">
                <textarea
                  className="w-full bg-transparent resize-none text-lg outline-none"
                  placeholder="Tweet your reply"
                  onChange={e => setComment(e.target.value)}
                />

                <div className="flex justify-between border-t border-gray-700 pt-4">
                  <div className="space-x-0 flex">
                    <div className="iconAnimation">
                      <PhotographIcon className="h-[22px] text-[#1d9bf0]" />
                    </div>
                    <div className="iconAnimation">
                      <ChartBarIcon className="h-[22px] text-[#1d9bf0]" />
                    </div>
                    <div className="iconAnimation">
                      <EmojiHappyIcon className="h-[22px] text-[#1d9bf0]" />
                    </div>
                    <div className="iconAnimation">
                      <CalendarIcon className="h-[22px] text-[#1d9bf0]" />
                    </div>
                    <div className="iconAnimation">
                      <LocationMarkerIcon className="h-[22px] text-[#1d9bf0]" />
                    </div>
                  </div>
                  <button onClick={sendComment} disabled={!comment} className="bg-[#1d9bf0] rounded-full px-4 py-1.5 disabled:opacity-50">
                    Tweet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
