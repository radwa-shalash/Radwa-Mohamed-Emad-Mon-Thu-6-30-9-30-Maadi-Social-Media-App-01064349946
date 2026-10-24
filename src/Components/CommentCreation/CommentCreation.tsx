import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaComment } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import { success } from "zod";

export default function CommentCreation({
  postId,
  queryKey,
}: {
  postId: string;
  queryKey: string[];
}) {
  const form = useForm({
    defaultValues: {
      content: "",
      image: "",
    },
  });
  const { register, handleSubmit, reset } = form;

  const query = useQueryClient();

  const formData = new FormData();

  function createComment() {
    return axios.post(
      `https://route-posts.routemisr.com/posts/${postId}/comments`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }
  const { data, isPending, mutate } = useMutation({
    mutationFn: createComment,
    onSuccess: (res) => {
      query.invalidateQueries({ queryKey: queryKey });
      reset();
      toast.success(res.data.message);
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSettled: () => {},
  });

  function handleCreateComment(values: { content: string; image: string }) {
    if (!values.content && !values.image) {
      return;
    }

    if (values.content) {
      formData.append("content", values.content);
    }

    if (values.image) {
      formData.append("image", values.image[0]);
    }

    mutate();
  }

  return (
    <>
      <div className=" bg-white p-4 my-2 rounded-sm">
        <form
          className="max-w-md mx-auto"
          onSubmit={handleSubmit(handleCreateComment)}
        >
          <div className="relative">
            <input
              {...register("content")}
              type="text"
              id="search"
              className="block rounded-sm w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
            />
            <label className="absolute cursor-pointer  top-[50%] end-[10px] translate-y-[-50%]  text-white bg-brand bg-blue-600 hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none">
              <FaImage className="size-4" />
              <input type="file" hidden {...register("image")} />
            </label>
          </div>
          <button
            disabled={isPending}
            type="submit"
            className="w-full mt-2 flex justify-center cursor-pointer disabled:bg-slate-900  text-white bg-brand bg-blue-600 hover:bg-blue-500 hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none"
          >
            {isPending ? (
              <ImSpinner8 className="animate-spin" />
            ) : (
              <FaComment className="size-5" />
            )}
          </button>
        </form>
      </div>
    </>
  );
}
