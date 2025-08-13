import React from "react";
import CardCourse from "./cardCourse";
import { useLoaderData } from "react-router-dom";

export default function StudentPage() {
  const courses = useLoaderData();
  return (
    <section
      id="LatestCourse"
      className="flex flex-col rounded-[30px] p-[30px] gap-[30px] bg-[#F8FAFB]"
    >
      <h2 className="font-extrabold text-[22px] leading-[33px]">
        Latest Courses
      </h2>
      {courses?.map((course) => (
        <CardCourse
          key={course._id}
          id={course._id}
          category={course.category.name}
          title={course.name}
          imageUrl={course.thumbnail_url}
        />
      ))}
    </section>
  );
}
