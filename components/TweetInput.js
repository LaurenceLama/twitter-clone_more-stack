import { db, storage } from "@/firebase";
import { openLoginModal } from "@/redux/modalSlice";
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

export default function TweetInput() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const filePickerRef = useRef(null);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const [showEmojis, setShowEmojis] = useState(false);
  const textareaRef = useRef(null);

  async function sendTweet() {
    if (!user.username) {
      dispatch(openLoginModal());
      return;
    }

    setLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      username: user.username,
      name: user.name,
      photoUrl: user.photoUrl,
      uid: user.uid,
      timestamp: serverTimestamp(),
      likes: [],
      tweet: text,
    });

    if (image) {
      const imageRef = ref(storage, `tweetImages/${docRef.id}`);
      const uploadImage = await uploadString(imageRef, image, "data_url");
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(db, "posts", docRef.id), {
        image: downloadURL,
      });
    }

    setText("");
    setImage(null);
    setLoading(false);
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
    setText((prevText) => prevText + emoji.native);
    textareaRef.current.focus();
  }

  return (
    <div className="flex space-x-3 p-3 border-b border-gray-700">
      <img
        src={
          user.photoUrl ||
          "https://freelogopng.com/images/all_img/1690643640twitter-x-icon-png.png"
        }
        className="w-11 h-11 rounded-full object-cover"
      />

      {loading && <h1 className="text-2xl to-gray-500">Uploading post...</h1>}
      {!loading && (
        <div className="w-full">
          <textarea
            className="bg-transparent resize-none outline-none w-full min-h-[50px] text-lg"
            placeholder="What's on your mind?"
            ref={textareaRef}
            onChange={(e) => setText(e.target.value)}
            value={text}
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
                className="rounded-2xl max-h-80 object-contain"
                src={image}
              />
            </div>
          )}

          <div className="flex justify-between border-t border-gray-700 pt-4">
            <div className="space-x-0 flex relative">
              <div
                onClick={() =>
                  !user.username
                    ? dispatch(openLoginModal())
                    : filePickerRef.current.click()
                }
                className="iconAnimation"
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
                onClick={() =>
                  !user.username
                    ? dispatch(openLoginModal())
                    : setShowEmojis(!showEmojis)
                }
              >
                <EmojiHappyIcon className="h-[22px] text-[#1d9bf0]" />
              </div>
              <div className="iconAnimation">
                <CalendarIcon className="h-[22px] text-[#1d9bf0]" />
              </div>
              <div className="iconAnimation">
                <LocationMarkerIcon className="h-[22px] text-[#1d9bf0]" />
              </div>

              <div className="absolute max-w-xs mt-10 left-[-40px]">
                {showEmojis && (
                  <Picker
                    onEmojiSelect={handleEmojiSelect}
                    data={data}
                    theme="dark"
                  />
                )}
              </div>
            </div>

            <button
              onClick={sendTweet}
              disabled={!text && !image}
              className="bg-[#1d9bf0] rounded-full px-4 py-1.5
              disabled:opacity-50
            "
            >
              Tweet
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
