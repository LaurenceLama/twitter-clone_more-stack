import { auth } from "@/firebase";
import { closeLoginModal, closeSignupModal, openSignupModal } from "@/redux/modalSlice";
import { setUser } from "@/redux/userSlice";
import { Modal } from "@mui/material";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SignupModal() {
  const isOpen = useSelector((state) => state.modals.signupModalOpen);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const gAuthProvider = new GoogleAuthProvider();

  async function handleSignup() {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: `./assets/profilePictures/pfp${Math.ceil(
        Math.random() * 6
      )}.png`,
    });

    router.reload();
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;

      // handle redux actions
      dispatch(
        setUser({
          username: currentUser.email.split("@")[0], //display name by getting name before the @ of email account
          name: currentUser.displayName,
          email: currentUser.email,
          uid: currentUser.uid,
          photoUrl: currentUser.photoURL,
        })
      );
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <button
        onClick={() => dispatch(openSignupModal())}
        className="bg-white text-black w-[160px] rounded-full h-[40px] hover:bg-[#cbd2d7]"
      >
        Sign up
      </button>
      <Modal
        open={isOpen}
        onClose={() => dispatch(closeSignupModal())}
        className="flex justify-center items-center"
      >
        <div className="w-[90%] h-[600px] bg-black text-white md:w-[560px] md:h-[600px] border border-gray-700 rounded-lg flex justify-center">
          <div className="w-[90%] mt-8 flex flex-col">
            <button
              onClick={handleGuestSignIn}
              className="bg-white text-black w-full font-bold text-lg p-2 rounded-md
              transition duration-[350ms] hover:bg-[#ffffffd1]"
            >
              Sign in as Guest
            </button>
            <h1 className="text-center mt-2 font-bold text-lg">or</h1>
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
            <h1 className="text-center mt-2 font-bold text-lg">or</h1>
            <h1 className="mt-1 font-bold text-4xl">Create your account</h1>
            <input
              placeholder="Full name"
              className="h-10 rounded-md bg-transparent border border-gray-700 p-6 mt-8"
              type={"text"}
              onChange={(e) => setName(e.target.value)}
            />
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
              className="bg-white text-black w-full font-bold text-lg p-2 mt-8 rounded-md
              transition duration-[350ms] hover:bg-[#ffffffd1]"
              onClick={handleSignup}
            >
              Create account
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
