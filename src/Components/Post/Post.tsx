import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import type { PostType } from "../../Types/Post.type";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import Comment from "./../Comment/Comment";
import type { CommentType } from "../../Types/Comment.type";
import CommentCreation from "../CommentCreation/CommentCreation";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "./../../Context/AuthContext";
import toast from "react-hot-toast";
import { BiLoaderAlt } from "react-icons/bi";

export default function Post({
  post,
  isPostDetails = false,
  isProfile = false,
}: {
  post: PostType;
  isPostDetails?: boolean;
  isProfile?: boolean;
}) {
  const { body, image, user, createdAt, topComment, _id } = post;
  const { name, photo, _id: userId } = user;
  const [isOpen, setisOpen] = useState(false);

  const { userId: loginUserId } = useContext(AuthContext);
  function getPostComments() {
    return axios.get(
      `https://route-posts.routemisr.com/posts/${_id}/comments?page=1&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["getPostComments"],
    queryFn: getPostComments,
    enabled: isPostDetails,
  });

  function handleDeletePost() {
    return axios.delete(`https://route-posts.routemisr.com/posts/${_id}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
  }
  const query = useQueryClient();
  const navigate = useNavigate();
  const {
    data: deletedPost,
    isPending,
    mutate,
  } = useMutation({
    mutationFn: handleDeletePost,
    onSuccess: (res) => {
      toast.success(res.data.message);

      if (isProfile === true) {
        query.invalidateQueries({ queryKey: ["getMyPosts"] });
        navigate("/profile");
      } else {
        query.invalidateQueries({ queryKey: ["getAllposts"] });
        navigate("/");
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSettled: () => {},
  });
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return toast.error(error.message);
  }

  return (
    <>
      <div className="md:w-[700px] p-4 mx-auto bg-slate-300 rounded-lg my-6">
        <div className="flex items-center gap-4 justify-between">
          <div className="flex gap-4 items-center">
            <img
              className="w-10 h-10 rounded-full border-white border-2"
              src={photo}
              alt="profile_picture"
            />
            <div>
              <p className="font-bold"> {name}</p>
              <p className="text-sm text-slate-500">{createdAt}</p>
            </div>
          </div>
          <div className="relative">
            {loginUserId === userId && (
              <BsThreeDotsVertical
                onClick={() => {
                  setisOpen(!isOpen);
                }}
                className="font-bold text-2xl cursor-pointer"
              />
            )}
            {isOpen && (
              <div className="bg-white rounded-lg p-2  absolute top-[120%] end-[-80px] shadow-2xl border-2 border-slate-400 z-20">
                <ul className="flex flex-col gap-3">
                  <Link
                    to={`/updatedata/${_id}/""`}
                    state={{ body: body, image: image, isPost: true }}
                  >
                    <li className="flex gap-2 items-center cursor-pointer p-2 bg-slate-100">
                      Edit
                      <MdEdit />
                    </li>
                  </Link>
                  <li>
                    <button
                      disabled={isPending}
                      onClick={() => {
                        mutate();
                      }}
                      className=" w-full flex gap-2 justify-center items-center cursor-pointer p-2 bg-slate-100 disabled:bg-slate-800 disabled:text-white disabled:cursor-not-allowed"
                    >
                      {isPending ? (
                        <BiLoaderAlt className="animate-spin" />
                      ) : (
                        <>
                          Delete
                          <FaTrashAlt />
                        </>
                      )}
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="p-4">
          <p className="mb-4">{body}</p>
          <img src={image} alt="post_photo" className="w-full" />
        </div>

        <div className="p-4 flex justify-between font-bold bg-slate-200 rounded-sm ">
          <div className="cursor-pointer flex items-center gap-2">
            Likes <AiFillLike />
          </div>
          <Link to={`/postdetails/${_id}`}>
            <div className="cursor-pointer flex items-center gap-2">
              Comments <FaComment />
            </div>
          </Link>
          <div className="cursor-pointer flex items-center gap-2">
            Share <FaShare />
          </div>
        </div>

        <CommentCreation
          postId={_id}
          queryKey={
            isPostDetails
              ? ["getPostComments"]
              : isProfile
                ? ["getMyPosts"]
                : ["getAllposts"]
          }
        />

        {/*topcomments */}

        {isPostDetails ||
          (topComment && (
            <Comment
              comment={topComment}
              postOwnerId={userId}
              isPostDetails={isPostDetails}
              isProfile={isProfile}
            />
          ))}

        {/* allcomments */}

        {isPostDetails && data?.data.data.comments && (
          <>
            {data?.data.data.comments.map((comments: CommentType) => (
              <Comment
                postOwnerId={userId}
                comment={comments}
                key={comments._id}
                isPostDetails={isPostDetails}
                isProfile={isProfile}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
}
