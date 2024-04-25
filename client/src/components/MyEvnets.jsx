import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Toast } from "../util/Toast";
const MyEvnets = () => {
  const [myEvents, setMyEvents] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const getEventHandler = async () => {
    const res = await axios.get(`/api/user/event?id=${currentUser._id}`);
    console.log(res.data.data);
    setMyEvents(res.data.data);
  };
  const deleteHandler = async (_id) => {
    try {
      const res = await axios.delete(`/api/user/deleteEvent/${_id}`);
      Toast(res.data.message);
      getEventHandler();
    } catch (error) {
      Toast(error.message);
    }
  };
  useEffect(() => {
    getEventHandler();
  }, []);
  return (
    <div className="grid grid-flow-col grid-cols-3 gap-2 mt-6  ">
      {myEvents.map((value) => (
        <div
          key={value?._id}
          class="bg-white rounded-lg shadow-lg overflow-hidden max-w-lg w-full h-80 "
        >
          <img className="h-48 w-full" src={value?.avatar} alt="" />
          <div class="p-6 min-h-48 ">
            <h2 class="text-2xl font-bold text-gray-800 mb-2">
              {value?.eventName}
            </h2>
            <p class="text-gray-700 leading-tight mb-4">{value?.description}</p>
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                {/* <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Avatar" class="w-8 h-8 rounded-full mr-2 object-cover"> */}
                <span class="text-gray-800 font-semibold">
                  {value?.location}
                </span>
              </div>
              <span
                class="text-white bg-red-600 px-2  rounded-lg cursor-pointer "
                onClick={() => {
                  deleteHandler(value?._id);
                }}
              >
                Delete
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyEvnets;
