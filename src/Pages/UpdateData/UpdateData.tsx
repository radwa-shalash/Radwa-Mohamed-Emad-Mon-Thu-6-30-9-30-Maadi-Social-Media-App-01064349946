import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FiImage, FiSend } from "react-icons/fi";
import { ImSpinner8 } from "react-icons/im";
import { IoMdCloseCircle } from "react-icons/io";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

export default function UpdateData() {
  const { postId, commentId } = useParams();
  const { state } = useLocation();
  const { body, image, isPost } = state;

  const [isUploaded, setisUploaded] = useState("");

  const formData = new FormData();

  const textInput = useRef(null);
  const imgInput = useRef(null);
  const query = useQueryClient();

  useEffect(() => {
    textInput.current.value = body;
    setisUploaded(image);
  }, []);

  function updatePost() {
    return axios.put(
      `https://route-posts.routemisr.com/posts/${postId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }

  function updateComment() {
    return axios.put(
      `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }

  function clearForm() {
    textInput.current.value = "";
    imgInput.current.value = "";
    setisUploaded("");
  }

  const navigate = useNavigate();
  const { data, isPending, mutate } = useMutation({
    mutationFn: isPost ? updatePost : updateComment,
    onSuccess: (res) => {
      clearForm();

      query.invalidateQueries({ queryKey: ["getAllposts"] });
      toast.success(res.data.message);
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSettled: () => {},
  });

  function handleUpdatePost() {
    if (textInput.current.value === "" && imgInput.current.value === "") {
      return;
    }

    if (textInput.current.value) {
      formData.append("body", textInput.current.value);
    }

    if (imgInput.current.value) {
      formData.append("image", imgInput.current.files[0]);
    }

    mutate();
  }

  function handleUpdateComment() {
    if (textInput.current.value === "" && imgInput.current.value === "") {
      return;
    }

    if (textInput.current.value) {
      formData.append("content", textInput.current.value);
    }

    if (imgInput.current.value) {
      formData.append("image", imgInput.current.files[0]);
    }

    mutate();
  }

  function handleImagePreview(e) {
    const path = URL.createObjectURL(e.target.files[0]);
    setisUploaded(path);
  }

  return (
    <div>
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        {/* Text Input */}
        <div className="relative mb-4">
          <textarea
            ref={textInput}
            // placeholder="What's on your mind?"
            rows={4}
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none transition-all"
          />
        </div>

        {/* Image Input */}
        {isUploaded && (
          <div className="mb-4 relative">
            <img src={isUploaded} alt="" />
            <IoMdCloseCircle
              onClick={() => setisUploaded("")}
              className=" absolute top-[10px] end-[10px] size-8 text-white"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <label className="cursor-pointer flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <FiImage className="text-green-500 text-xl" />
              <span className="text-sm font-medium">Add Photo</span>
              <input
                ref={imgInput}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  handleImagePreview(e);
                }}
              />
            </label>
          </div>

          <button
            disabled={isPending}
            type="button"
            onClick={() =>
              isPost ? handleUpdatePost() : handleUpdateComment()
            }
            className="disabled:bg-slate-900 disabled:cursor-not-allowed flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            {isPending ? (
              <ImSpinner8 className="animate-spin" />
            ) : (
              <>
                <span>Update Post</span>
                <FiSend className="text-lg" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
