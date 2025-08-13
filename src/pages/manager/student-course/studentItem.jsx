import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useParams, useRevalidator } from "react-router-dom";
import DeleteCard from "../courses/deleteCard";
import { deleteStudentsCourse } from "../../../services/courseService";

export default function StudentItem(props) {
  const { imageUrl = "studentItem.jsx", name = "Nama", id = "1" } = props;

  const params = useParams();

  const revalidator = useRevalidator();

  const [modalDelete, setModalDelete] = useState(false);

  const { isPending, mutateAsync } = useMutation({
    mutationFn: () => deleteStudentsCourse({ studentId: id }, params.id),
  });

  const handleDelete = async () => {
    try {
      await mutateAsync();
      revalidator.revalidate();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setModalDelete(false);
  };
  return (
    <>
      <div className="card flex items-center gap-5">
        <div className="relative flex shrink-0 w-20 h-20">
          <div className="rounded-[20px] bg-[#D9D9D9] overflow-hidden">
            <img
              src={`${imageUrl}`}
              className="w-full h-full object-cover"
              alt="photo"
            />
          </div>
        </div>
        <div className="w-full">
          <h3 className="font-bold text-xl leading-[30px] line-clamp-1">
            {name}
          </h3>
        </div>
        <div className="flex justify-end items-center gap-3">
          <button
            type="button"
            disabled={isPending}
            onClick={() => setModalDelete(true)}
            className="w-fit cursor-pointer rounded-full p-[14px_20px] bg-[#FF435A] font-semibold text-white text-nowrap"
          >
            Delete
          </button>
        </div>
        {modalDelete && (
          <DeleteCard
            onCancel={handleCancel}
            onDelete={handleDelete}
            isPending={isPending}
            type="student"
          />
        )}
      </div>
    </>
  );
}

StudentItem.propTypes = {
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  totalCourse: PropTypes.number,
  id: PropTypes.string,
};
