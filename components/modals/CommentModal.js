import { db, storage } from "@/firebase";
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
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

export default function CommentModal() {
  const isOpen = useSelector((state) => state.modals.commentModalOpen);
  const userImg = useSelector((state) => state.user.photoUrl);
  const tweetDetails = useSelector((state) => state.modals.commentTweetDetails);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [comment, setComment] = useState("");
  const router = useRouter();

  const [showEmojis, setShowEmojis] = useState(false);
  const textareaRef = useRef(null);

  const [image, setImage] = useState(null);
  const filePickerRef = useRef(null);

  async function sendComment() {
    const docRef = doc(db, "posts", tweetDetails.id);
    const commentDetails = {
      username: user.username,
      name: user.name,
      photoUrl: user.photoUrl,
      comment: comment,
      image: image,
    };
    await updateDoc(docRef, {
      comments: arrayUnion(commentDetails),
    });

    dispatch(closeCommentModal);
    router.push("/" + tweetDetails.id);
  }

  function addImagetoTweet(e) {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.addEventListener("load", (e) => {
      setImage(e.target.result);
    });
  }

  function handleEmojiSelect(emoji) {
    const textarea = textareaRef.current;

    if (textarea) {
      const cursorPos = textarea.selectionStart || 0;
      const textBefore = comment.substring(0, cursorPos);
      const textAfter = comment.substring(cursorPos);
      const newText = textBefore + emoji.native + textAfter;

      // Update textarea value directly
      textarea.value = newText;

      // Move the cursor position after the inserted emoji
      const newCursorPos = cursorPos + emoji.native.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);

      textarea.focus();

      // Update the state
      setComment(newText);
    }
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
        text-white w-full h-full sm:w-[600px] sm:h-[560px] rounded-lg sm:p-10 p-4"
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
                  Replying to{" "}
                  <span className="text-[#1b9bf0]">
                    @{tweetDetails.username}
                  </span>
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
                  ref={textareaRef}
                  onChange={(e) => setComment(e.target.value)}
                />

                {image && (
                  <div className="relative mb-4">
                    <div
                      onClick={() => setImage(null)}
                      className="absolute top-1 left-1 bg-[#272c26] rounded-full w-8 h-8 
                    flex justify-center items-center cursor-pointer hover:bg-white hover:bg-opacity-10"
                    >
                      <XIcon className="h-5" />
                    </div>
                    <img
                      className="rounded-2xl max-h-40 object-contain"
                      src={image}
                    />
                  </div>
                )}

                <div className="flex justify-between border-t border-gray-700 pt-4">
                  <div className="space-x-0 flex">
                    <div
                      className="iconAnimation"
                      onClick={() =>
                        !user.username
                          ? dispatch(openLoginModal())
                          : filePickerRef.current.click()
                      }
                    >
                      <PhotographIcon className="h-[22px] text-[#1d9bf0]" />
                    </div>
                    <input
                      onChange={addImagetoTweet}
                      ref={filePickerRef}
                      type="file"
                      className="hidden"
                    />
                    <div className="iconAnimation">
                      <ChartBarIcon className="h-[22px] text-[#1d9bf0]" />
                    </div>
                    <div
                      className="iconAnimation"
                      onClick={() => setShowEmojis(!showEmojis)}
                    >
                      <EmojiHappyIcon className="h-[22px] text-[#1d9bf0]" />
                    </div>
                    <div className="iconAnimation">
                      <CalendarIcon className="h-[22px] text-[#1d9bf0]" />
                    </div>
                    <div className="iconAnimation">
                      <LocationMarkerIcon className="h-[22px] text-[#1d9bf0]" />
                    </div>
                  </div>
                  <button
                    onClick={sendComment}
                    disabled={!comment}
                    className="bg-[#1d9bf0] rounded-full px-4 py-1.5 disabled:opacity-50"
                  >
                    Tweet
                  </button>

                  <div className="absolute max-w-xs left-[600px] top-0">
                    {showEmojis && (
                      <Picker
                        onEmojiSelect={handleEmojiSelect}
                        data={data}
                        theme="dark"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
