import Pagination from "@/components/Pagination";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Toast } from "../util/Toast";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state?.user);
  const [search, setSearch] = useState("");
  console.log(search);

  const getEventHandler = async (search) => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/user/allEvents?search=${search}`);
      setEvents(res.data.events);
      setLoading(false);
    } catch (error) {
      Toast(error.message);
      setLoading(false);
    }
  };

  const bookEventHandler = async (id, userId) => {
    try {
      const res = await axios.patch(
        `/api/user/bookEvent?id=${id}&userId=${userId}`
      );
      console.log(res);
      Toast(res.data.message);
    } catch (error) {
      Toast(error.message);
    }
  };

  useEffect(() => {
    getEventHandler(search);
  }, [search]);

  return (
    <div className="bg-white relative flex flex-col justify-center items-center min-h-96 ">
      <div className="flex">
        <div className="flex mt-4">
          <input
            type="text"
            className="w-full px-3 h-10 rounded-l border-2 border-blue-500   "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white rounded-r px-2 md:px-3 py-0 md:py-1"
            onClick={(e) => {
              e.preventDefault();
              getEventHandler(search);
            }}
          >
            Search
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {loading ? (
            <div>Loading...</div>
          ) : (
            events.map((value) => (
              <a
                className={`group bg-slate-100 rounded-md ${
                  value?.hostedBy === currentUser?._id ? "hidden" : ""
                }`}
                key={value?._id}
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={value?.avatar}
                    alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div className="flex justify-around">
                  <div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900 uppercase">
                      {value?.eventName}
                    </h3>
                    <p className="mt-1 text-lg  text-gray-700">
                      {value?.location}
                    </p>
                  </div>
                  {value?.bookedBy.includes(currentUser?._id) ? (
                    <button className="bg-green-700 mt-7 text-white h-10 p-2 rounded-lg cursor-pointer ">
                      Booked
                    </button>
                  ) : (
                    <button
                      className="bg-blue-700 mt-7 text-white h-10 p-2 rounded-lg cursor-pointer "
                      onClick={() => {
                        bookEventHandler(value._id, currentUser._id);
                      }}
                    >
                      Book
                    </button>
                  )}
                </div>

                <p className="mt-1 text-center  text-gray-700 font-light">
                  {value?.description}
                </p>
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
