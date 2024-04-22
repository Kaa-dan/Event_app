import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signOutUserSuccess } from "@/store/userSlice";
import { useNavigate } from "react-router-dom";
import { Toast } from "@/util/Toast";
const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    eventName: "",
    location: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [color, setColor] = useState({
    left: "bg-blue-500",
    right: "bg-blue-700",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signOutHandler = async () => {
    try {
      dispatch(signOutUserSuccess());
      navigate("/sign-in");
      Toast("User signed out");
    } catch (error) {
      console.log(error.message);
    }
  };
  const onChangeHandler = (e) => {
    try {
      setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="container mx-auto my-5 p-5">
      <div className="md:flex no-wrap md:-mx-2 ">
        <div className="w-full md:w-3/12 md:mx-2 h-96">
          <div className="bg-white p-3 border-t-4 border-blue-400 mt-14  flex gap-5">
            <div className="image overflow-hidden">
              <img className="h-16" src={currentUser?.avatar} alt="" />
            </div>
            <div>
              <h1 className="text-gray-900 font-bold text-xl leading-8 my-1 ">
                {currentUser?.userName}
              </h1>
              <h3 className="text-gray-600 font-lg text-semibold leading-6 ">
                {currentUser?.email}
              </h3>
            </div>
          </div>
          <div className="my-4"></div>
          <div className="bg-white p-3 hover:shadow">
            <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
              <li className="flex items-center py-3">
                <span
                  className={`${color.left} py-1 px-2 rounded text-white text-sm cursor-pointer`}
                  onClick={() => {
                    setColor({
                      left: "bg-blue-700",
                      right: "bg-blue-500",
                    });
                  }}
                >
                  My events
                </span>
                <span className="ml-auto">
                  <span
                    className={`${color.right} py-1 px-2 rounded text-white text-sm cursor-pointer`}
                    onClick={() => {
                      setColor({
                        left: "bg-blue-500",
                        right: "bg-blue-700",
                      });
                    }}
                  >
                    Booked events
                  </span>
                </span>
              </li>
            </ul>
          </div>
          <button
            className="w-full bg-red-700 rounded-xl text-white h-10 shadow-lg hover:bg-red-500"
            onClick={signOutHandler}
          >
            SignOut
          </button>
        </div>
        <div className="w-full md:w-9/12 mx-2 flex flex-col ">
          <div className="flex justify-between">
            <div className="text-blue-700 text-xl border-b-2 border-blue-500">
              {" "}
              MY EVENTS
            </div>
            <button className="bg-blue-500 text-white w-28 rounded-lg h-10 shadow-lg">
              Create Event
            </button>
          </div>
          <div className="flex ml-10 mt-10">
            <div className="my-2 text-blue-700  flex flex-col gap-2">
              <input
                type="text"
                placeholder="Event Name"
                className="w-full border border-blue-400 rounded-md py-2 px-3 pr-10"
                value={formData.eventName}
                id="eventName"
                onChange={onChangeHandler}
              />
              <input
                type="text"
                placeholder="Location"
                className="w-full border border-blue-400 rounded-md py-2 px-3 pr-10"
                value={formData.location}
                id="location"
                onChange={onChangeHandler}
              />
              <textarea
                className="w-full border border-blue-400 rounded-md py-2 px-3 resize-none"
                rows="3"
                placeholder="Description"
                value={formData.description}
                id="description"
                onChange={onChangeHandler}
              ></textarea>
              <input
                type="file"
                className="w-full border  border-blue-400 rounded-md py-2 px-3 pr-10"
              />
              <button className="bg-blue-800 text-white rounded-lg p-2">
                Submit
              </button>
            </div>
            <div>
              <img src="" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
