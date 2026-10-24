import React, { useContext, useState } from "react";
import type { CommentType } from "../../Types/Comment.type";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { BiLoaderAlt } from "react-icons/bi";

export default function Comment({
  comment,
  postOwnerId,
  isPostDetails,
  isProfile,
}: {
  comment: CommentType;
  postOwnerId: string;
  isPostDetails: boolean;
  isProfile: boolean;
}) {
  const { commentCreator } = comment;
  const { _id: commentOwnerId } = commentCreator;

  const [isOpen, setisOpen] = useState(false);
  const { userId: loginUserId } = useContext(AuthContext);

  const isPostOwner = loginUserId === postOwnerId;
  const isCommentOwner = loginUserId === commentOwnerId;

  const canEdit = isCommentOwner;
  const canDelete = isCommentOwner || isPostOwner;
  function handleDeleteComment() {
    return axios.delete(
      `https://route-posts.routemisr.com/posts/${comment.post}/comments/${comment._id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }
  const query = useQueryClient();
  const navigate = useNavigate();
  const { data, isPending, mutate } = useMutation({
    mutationFn: handleDeleteComment,
    onSuccess: (res) => {
      toast.success(res.data.message);

      if (isPostDetails === false && isProfile === false) {
        query.invalidateQueries({ queryKey: ["getAllposts"] });
        navigate("/");
      } else if (isPostDetails === true) {
   
           
        query.invalidateQueries({ queryKey: ["getPostComments"] });
        navigate(`/postdetails/${comment.post}`);
     
      } else if (isProfile === true) {
        query.invalidateQueries({ queryKey: ["getMyPosts"] });
        navigate("/profile");
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSettled: () => {},
  });

  return (
    <div className=" p-4 my-2 rounded-sm bg-slate-100">
      <div className="flex items-center gap-4 justify-between">
        <div className="flex items-center  gap-4">
          <img
            className="w-10 h-10 rounded-full border-white border-2"
            src={comment.commentCreator.photo}
            alt="profile_picture"
          />
          <div>
            <p className="font-bold"> {comment.commentCreator.name}</p>
            <p className="text-sm text-slate-500">{comment.createdAt}</p>
          </div>
        </div>

        <div className="relative">
          {(canEdit || canDelete) && (
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
                {canEdit && (
                  <>
                  <Link
                    to={`/updatedata/${comment.post}/${comment._id}`}
                    state={{ body: comment.content, image: comment.image , isPost:false}}
                  >
                    
                    <li className="flex gap-2 items-center cursor-pointer p-2 bg-slate-100">
                      Edit
                      <MdEdit />
                    </li>
                  </Link>
                  </>
                )}
                {canDelete && (
                  <>
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
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
      <p className="px-4">{comment.content}</p>
      <img src={comment.image} alt="" />
    </div>
  );
}
