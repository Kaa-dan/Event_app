import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signOutUserSuccess } from "@/store/userSlice";
import { useNavigate } from "react-router-dom";
import { Toast } from "@/util/Toast";
import Spinner from "@/components/Spinner";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import axios from "axios";
import BookedEvnets from "../components/BookedEvnets";
import MyEvnets from "../components/MyEvnets";
const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [uploading, setUploading] = useState(false);
  const [page, setPage] = useState("MY EVENTS");
  const [formData, setFormData] = useState({
    eventName: "",
    location: "",
    description: "",
    avatar: null,
    userId: currentUser._id,
  });
  const [imageFile, setImageFile] = useState(null);
  const [color, setColor] = useState({
    left: "bg-blue-700",
    right: "bg-blue-500",
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
  const submitHandler = async () => {
    try {
      if (
        formData.avatar &&
        formData.description &&
        formData.eventName &&
        formData.location
      ) {
        const res = await axios.post("/api/user/event", formData);
        console.log(res);
        Toast(res.data.message);
        setPage("MY EVENTS");
      } else Toast("Fill all details");
    } catch (error) {
      Toast(error.message);
    }
  };
  const handleFileUpload = (file) => {
    try {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      setUploading((prev) => !prev);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // setFilePerc(Math.round(progress));
        },
        (error) => {
          // setFileUploadError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
            setFormData((prev) => ({ ...prev, avatar: downloadURL }))
          );
        }
      );
      setUploading((prev) => !prev);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (imageFile) {
      handleFileUpload(imageFile);
    }
  }, [imageFile]);

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
                    setPage("MY EVENTS");
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
                      setPage("BOOKED EVENTS");
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
              {page}
            </div>
            <button
              className="bg-blue-500 text-white w-28 rounded-lg h-10 shadow-lg"
              onClick={() => setPage("CREATE EVENTS")}
            >
              Create Event
            </button>
          </div>
          {page === "CREATE EVENTS" && (
            <div className="flex ml-10 mt-10 ">
              <div className="my-2 text-blue-700  flex flex-col justify-between gap-2">
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
                  onChange={(e) => {
                    setImageFile(e.target.files[0]);
                  }}
                />
                {uploading ? (
                  <Spinner />
                ) : (
                  <button
                    className="bg-blue-800 text-white rounded-lg p-2"
                    onClick={submitHandler}
                  >
                    Submit
                  </button>
                )}
              </div>

              <div>
                {formData?.avatar ? (
                  <img
                    className="h-full w-full"
                    src={formData?.avatar}
                    alt=""
                  />
                ) : (
                  <div className="text-red-600  h-full ml-16 place-content-center">
                    {" "}
                    No image files uploaded
                  </div>
                )}
              </div>
            </div>
          )}
          {page === "MY EVENTS" && <MyEvnets />}
          {page === "BOOKED EVENTS" && <BookedEvnets />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
