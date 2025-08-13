import "react-quill-new/dist/quill.snow.css";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContentSchema } from "../../../utils/zodSchema";
import ReactQuill from "react-quill-new";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { createContent, updateContent } from "../../../services/courseService";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";

export default function ManageContentCreatePage() {
  const { id, contentId } = useParams();
  const navigate = useNavigate();
  const content = useLoaderData();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
  } = useForm({
    resolver: zodResolver(createContentSchema),
    defaultValues: {
      title: content?.title,
      type: content?.type,
      youtubeId: content?.youtubeId,
      text: content?.text,
    },
  });

  const { isPending: isPendingCreate, mutateAsync: mutateAsyncCreate } =
    useMutation({
      mutationFn: (data) => createContent(data),
    });

  const { isPending: isPendingUpdate, mutateAsync: mutateAsyncUpdate } =
    useMutation({
      mutationFn: (data) => updateContent(data, contentId),
    });

  const type = watch("type");

  useEffect(() => {
    if (type === "video") {
      setValue("text", ""); // Clear text when switching to video
    } else if (type === "text") {
      setValue("youtubeId", ""); // Clear youtubeId when switching to text
    }
  }, [type, setValue]);

  const onSubmit = async (values) => {
    try {
      const cleanedValues = { ...values };

      if (values.type === "video") {
        delete cleanedValues.text; // Remove text field if type is video
      } else if (values.type === "text") {
        delete cleanedValues.youtubeId; // Remove youtubeId field if type is text
      }
      if (!content) {
        await mutateAsyncCreate({ ...cleanedValues, courseId: id });
      } else {
        await mutateAsyncUpdate({ ...cleanedValues, courseId: id });
      }

      navigate("/manager/courses/" + id);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("Form errors:", errors);

  return (
    <>
      <div
        id="Breadcrumb"
        className="flex items-center gap-5 *:after:content-['/'] *:after:ml-5"
      >
        <span className="last-of-type:after:content-[''] last-of-type:font-semibold">
          Manage Course
        </span>
        <span className="last-of-type:after:content-[''] last-of-type:font-semibold">
          Course
        </span>
        <span className="last-of-type:after:content-[''] last-of-type:font-semibold">
          {content ? "Edit" : "Add"} Content
        </span>
      </div>
      <header className="flex items-center justify-between gap-[30px]">
        <div className="flex items-center gap-[30px]">
          <div className="flex shrink-0 w-[150px] h-[100px] rounded-[20px] overflow-hidden bg-[#D9D9D9]">
            <img
              src="/assets/images/thumbnails/th-1.png"
              className="w-full h-full object-cover"
              alt="thumbnail"
            />
          </div>
          <div>
            <h1 className="font-extrabold text-[28px] leading-[42px]">
              {content ? "Edit" : "Add"} Content
            </h1>
            <p className="text-[#838C9D] mt-[1]">
              Give a best content for the course
            </p>
          </div>
        </div>
      </header>
      <form
        className="flex flex-col w-[930px] rounded-[30px] p-[30px] gap-[30px] bg-[#F8FAFB]"
        onSubmit={handleSubmit((values) => onSubmit(values))}
      >
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="title" className="font-semibold">
            Content Title
          </label>
          <div className="flex items-center w-full rounded-full border border-[#CFDBEF] gap-3 px-5 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#662FFF]">
            <img
              src="/assets/images/icons/note-favorite-black.svg"
              className="w-6 h-6"
              alt="icon"
            />
            <input
              {...register("title")}
              type="text"
              id="title"
              className="appearance-none outline-none w-full py-3 font-semibold placeholder:font-normal placeholder:text-[#838C9D] !bg-transparent"
              placeholder="Write better name for your course"
            />
          </div>
          {errors?.title && (
            <span className="error-message text-[#FF435A]">
              {errors?.title?.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="type" className="font-semibold">
            Select Type
          </label>
          <div className="flex items-center w-full rounded-full border border-[#CFDBEF] gap-3 px-5 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#662FFF]">
            <img
              src="/assets/images/icons/crown-black.svg"
              className="w-6 h-6"
              alt="icon"
            />
            <select
              {...register("type")}
              id="type"
              className="appearance-none outline-none w-full py-3 px-2 -mx-2 font-semibold placeholder:font-normal placeholder:text-[#838C9D] !bg-transparent"
            >
              <option value="" hidden>
                Choose content type
              </option>
              <option value="video">Video</option>
              <option value="text">Text</option>
            </select>
            <img
              src="/assets/images/icons/arrow-down.svg"
              className="w-6 h-6"
              alt="icon"
            />
          </div>
          {errors?.type && (
            <span className="error-message text-[#FF435A]">
              {errors?.type?.message}
            </span>
          )}
        </div>
        {type === "video" && (
          <div className="flex flex-col gap-[10px]">
            <label htmlFor="video" className="font-semibold">
              Youtube Video ID
            </label>
            <div className="flex items-center w-full rounded-full border border-[#CFDBEF] gap-3 px-5 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#662FFF]">
              <img
                src="/assets/images/icons/bill-black.svg"
                className="w-6 h-6"
                alt="icon"
              />
              <input
                {...register("youtubeId")}
                type="text"
                id="video"
                className="appearance-none outline-none w-full py-3 font-semibold placeholder:font-normal placeholder:text-[#838C9D] !bg-transparent"
                placeholder="Write tagline for better copy"
              />
            </div>
            {errors?.youtubeId && (
              <span className="error-message text-[#FF435A]">
                {errors?.youtubeId?.message}
              </span>
            )}
          </div>
        )}

        {type === "text" && (
          <div className="flex flex-col gap-[10px]">
            <label className="font-semibold">Content Text</label>
            <Controller
              name="text"
              control={control}
              render={({ field }) => (
                <ReactQuill
                  theme="snow"
                  value={field.value || ""}
                  onChange={field.onChange}
                />
              )}
            />
            {errors?.text && (
              <span className="error-message text-[#FF435A]">
                {errors?.text?.message}
              </span>
            )}
          </div>
        )}
        <div className="flex items-center gap-[14px]">
          <button
            type="button"
            className="w-full rounded-full border border-[#060A23] p-[14px_20px] font-semibold text-nowrap"
          >
            Save as Draft
          </button>
          <button
            type="submit"
            disabled={!content ? isPendingCreate : isPendingUpdate}
            className="w-full rounded-full p-[14px_20px] font-semibold text-[#FFFFFF] bg-[#662FFF] text-nowrap"
          >
            {content ? "Edit" : "Add"} Content Now
          </button>
        </div>
      </form>
    </>
  );
}
