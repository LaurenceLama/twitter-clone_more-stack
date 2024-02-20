import { auth } from "@/firebase";
import { closeLoginModal, openLoginModal } from "@/redux/modalSlice";
import { Modal } from "@mui/material";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function LoginModal() {
  const isOpen = useSelector((state) => state.modals.loginModalOpen);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const gAuthProvider = new GoogleAuthProvider();

  async function handleSignIn() {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function handleGuestSignIn() {
    await signInWithEmailAndPassword(auth, "guest12310@gmail.com", "laurence");
  }

  async function handleGoogleSignIn() {
    const result = await signInWithPopup(auth, gAuthProvider);
    const gUser = result.user;
    if (gUser) {
      dispatch(closeLoginModal());
    }
  }

  return (
    <>
      <button
        onClick={() => dispatch(openLoginModal())}
        className="bg-transparent border border-white text-white w-[160px] rounded-full h-[40px] hover:bg-[#cbd2d7]"
      >
        Log in
      </button>
      <Modal
        open={isOpen}
        onClose={() => dispatch(closeLoginModal())}
        className="flex justify-center items-center"
      >
        <div className="w-[90%] h-[600px] bg-black text-white md:w-[560px] md:h-[600px] border border-gray-700 rounded-lg flex justify-center">
          <div className="w-[90%] mt-8 flex flex-col">
            <h1 className="mt-4 font-bold text-4xl">Sign in to your account</h1>
            <input
              placeholder="Email"
              className="h-10 rounded-md bg-transparent border border-gray-700 p-6 mt-8"
              type={"email"}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              className="h-10 rounded-md bg-transparent border border-gray-700 p-6 mt-8"
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleSignIn}
              className="bg-white text-black w-full font-bold text-lg p-2 mt-8 rounded-md
              transition duration-[350ms] hover:bg-[#ffffffd1]"
            >
              Sign in
            </button>
            <h1 className="text-center mt-4 font-bold text-lg">or</h1>
            <button
              onClick={handleGuestSignIn}
              className="bg-white text-black w-full font-bold text-lg p-2 rounded-md mt-4
              transition duration-[350ms] hover:bg-[#ffffffd1]"
            >
              Sign in as Guest
            </button>
            <h1 className="text-center mt-4 font-bold text-lg">or</h1>
            <button
              className="relative w-full flex bg-white text-black font-bold
                justify-center items-center min-w-[180px] h-10 p-2 mt-4 rounded-md text-lg transition 
               duration-[350ms] hover:bg-[#4285f4] hover:text-white"
              onClick={handleGoogleSignIn}
            >
              <figure
                className="bg-transparent flex justify-center items-center w-9 
                      h-9 absolute left-[5px] rounded-md bg-white"
              >
                <img
                  className="h-6 w-6"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBhGqD-THvCbERB_5R1ZrqJ8wl8QGvJwsm2A&usqp=CAU"
                  alt="google.png"
                />
              </figure>
              <div>Sign in with Google</div>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
