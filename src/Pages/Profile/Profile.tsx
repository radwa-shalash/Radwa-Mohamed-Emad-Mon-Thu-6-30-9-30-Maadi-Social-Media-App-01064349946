import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Helmet } from "react-helmet";
import type { UserType } from "../../Types/Profile.type";
import Loader from "../../Components/Loader/Loader";
import toast from "react-hot-toast";
import Post from "../../Components/Post/Post";
import type { PostType } from "../../Types/Post.type";

export default function Profile() {
  function getMyProfile() {
    return axios.get(`https://route-posts.routemisr.com/users/profile-data`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
  }
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getMyProfile"],
    queryFn: getMyProfile,
  });
  const user: UserType = data?.data.data.user;
  

  function getMyPosts() {
    return axios.get(
      `https://route-posts.routemisr.com/users/${user._id}/posts`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }

  const { data: userPostsData, isLoading: loadingUserPosts  } = useQuery({
    queryKey: ["getMyPosts"],
    queryFn: getMyPosts,
    enabled: !isLoading && !isError && !!data,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return toast.error(error.message);
  }

 

  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>

      {user && (
        <div className="bg-indigo-400 rounded-lg p-4 mx-auto md:w-[800px] my-4 flex justify-between items-center shadow-2xl border-2 border-slate-300">
          <img
            className="size-20 rounded-full border-2 border-white  "
            src={user?.photo}
            alt="profile_picture"
          />
          <div>
            <p>
              <span className="font-bold">UserName : </span>
              {user?.name}
            </p>
            <p>
              <span className="font-bold">Gender : </span>
              {user?.gender}
            </p>
            <p>
              <span className="font-bold">Email : </span>
              {user?.email}
            </p>
            <p>
              <span className="font-bold">BirthDay : </span>
              {user?.dateOfBirth.split("T")[0]}
            </p>
          </div>
        </div>
      )}
      {userPostsData?.data.data.posts.map((currentPost: PostType) => (
        <Post post={currentPost} key={currentPost._id} isProfile={true} />
      ))}
    </>
  );
}
