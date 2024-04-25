import React, { useEffect, useState } from "react";
import { Toast } from "../util/Toast";
import axios from "axios";
import { useSelector } from "react-redux";

const BookedEvnets = () => {
  const [bookedEvents, setBookedEvents] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  const cancelHandler = async (bookingId) => {
    const res = await axios.patch(
      `/api/user/cancelbooking?id=${currentUser._id}&bookingId=${bookingId}`
    );
    console.log(res)
    if (res) {
      Toast(res.data.message);
      bookedEventHandler();
    }
  };
  const bookedEventHandler = async () => {
    try {
      const res = await axios.get(
        `/api/user/bookedEvents?id=${currentUser._id}`
      );

      setBookedEvents(res.data.events);
    } catch (error) {
      Toast(error.message);
    }
  };
  useEffect(() => {
    bookedEventHandler();
  }, []);
  return (
    <div class="grid grid-flow-col grid-cols-3 gap-2 mt-6  ">
      {bookedEvents.map((value) => (
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
                  cancelHandler(value._id);
                }}
              >
                Cancel
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookedEvnets;
