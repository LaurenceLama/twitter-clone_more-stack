import { DotsHorizontalIcon, SearchIcon } from "@heroicons/react/outline";
import { BadgeCheckIcon } from "@heroicons/react/solid";


export default function Trending() {
  return (
    <div className="hidden lg:flex flex-col ml-7 mt-4">
      <div className="flex space-x-3 bg-white bg-opacity-10 w-[300px] h-[44px] p-3 rounded-3xl">
        <SearchIcon className="w-6 text-gray-600" />
        <input
          className="bg-transparent focus:outline-none placeholder:text-gray-600"
          placeholder="Search Twitter"
        />
      </div>
      <div className="w-[300px] h-[500px] bg-white bg-opacity-10 rounded-3xl mt-3 sticky top-5">
        <h1 className="font-bold text-xl p-3">Trends for you</h1>
        <div className="p-3 relative">
          <DotsHorizontalIcon className="w-5 text-gray-600 absolute right-4" />
          <p className="text-xs text-gray-500">Trending in Phillipines</p>
          <h1 className="text-[15px] font-bold">Calvin Klein</h1>
          <p className="text-xs text-gray-500">75.9k posts</p>
        </div>
        <div className="p-3 relative">
          <DotsHorizontalIcon className="w-5 text-gray-600 absolute right-4" />
          <p className="text-xs text-gray-500">Music · Trending</p>
          <h1 className="text-[15px] font-bold">Manila</h1>
          <p className="text-xs text-gray-500">84k posts</p>
        </div>
        <div className="p-3 relative">
          <DotsHorizontalIcon className="w-5 text-gray-600 absolute right-4" />
          <p className="text-xs text-gray-500">Trending</p>
          <h1 className="text-[15px] font-bold">Sleeping #1 habit</h1>
          <p className="text-xs text-gray-500">1M posts</p>
        </div>
        <div className="p-3 relative">
          <DotsHorizontalIcon className="w-5 text-gray-600 absolute right-4" />
          <p className="text-xs text-gray-500">Trending a little bit</p>
          <h1 className="text-[15px] font-bold">
            I think I want an apple vision pro
          </h1>
          <p className="text-xs text-gray-500">100 posts</p>
        </div>
        <div className="p-3 relative">
          <DotsHorizontalIcon className="w-5 text-gray-600 absolute right-4" />
          <p className="text-xs text-gray-500">Trending in Philippines</p>
          <h1 className="text-[15px] font-bold">Philippines in Trending</h1>
          <p className="text-xs text-gray-500">202k posts</p>
        </div>
      </div>
      <div className="w-[300px] h-[300px] bg-white bg-opacity-10 rounded-3xl mt-3 sticky top-[540px]">
        <h1 className="font-bold text-xl p-3">Who to follow</h1>

        <div className="flex justify-between p-3">
          <div className="flex space-x-3">
            <img
              src="/assets/me.png"
              className="w-11 h-11 object-cover rounded-full"
            />
            <div>
              <div className="flex space-x-1">
                <h1 className="font-bold">Laurence Lama</h1>
                <BadgeCheckIcon className="w-[18px] text-blue-400" />
              </div>
              <h1 className="text-[12px] mt-1 text-gray-500">@Laurence Lama</h1>
            </div>
          </div>

          <a
            href="https://www.linkedin.com/in/laurencelama/"
            className="bg-white text-black flex items-center justify-center text-sm w-20 
            rounded-3xl font-bold h-8 transition duration-[350ms] hover:bg-[#ffffffd1]"
          >
            Follow
          </a>
        </div>

        <div className="flex justify-between p-3">
          <div className="flex space-x-3">
            <img
              src="https://avatars.githubusercontent.com/u/119298889?v=4"
              className="w-11 h-11 object-cover rounded-full"
            />
            <div>
              <div className="flex space-x-1">
                <h1 className="font-bold">LaurenceLama</h1>
                <BadgeCheckIcon className="w-[18px] text-blue-400" />
              </div>
              <h1 className="text-[12px] mt-1 text-gray-500">@LaurenceLama</h1>
            </div>
          </div>

          <a
            href="https://github.com/LaurenceLama"
            className="bg-white text-black flex items-center justify-center text-sm w-20 
            rounded-3xl font-bold h-8 transition duration-[350ms] hover:bg-[#ffffffd1]"
          >
            Follow
          </a>
        </div>

        <div className="flex justify-between p-3">
          <div className="flex space-x-3">
            <img
              src="/assets/pfp.png"
              className="w-11 h-11 object-cover rounded-full"
            />
            <div>
              <div className="flex space-x-1">
                <h1 className="font-bold">The guy</h1>
                <BadgeCheckIcon className="w-[18px] text-blue-400" />
              </div>
              <h1 className="text-[12px] mt-1 text-gray-500">@Musketeer</h1>
            </div>
          </div>

          <button className="bg-white text-black text-sm w-20 rounded-3xl font-bold h-8">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
}
