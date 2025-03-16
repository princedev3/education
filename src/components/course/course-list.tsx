"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pdf, Subject } from "@prisma/client";
import Loading from "../loading";

interface courseArrayType extends Subject {
  pdf: Pdf[];
}

const CourseList = () => {
  const [courseArray, setCourseArray] = useState<courseArrayType[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchCourseFunc = async () => {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_FETCH_URL}/subject/create-subject`,
        {
          method: "GET",
        }
      );

      const data = await res.json();

      if (data.status === 200) {
        setCourseArray(data.courseArrays);
      }
      setLoading(false);
    };
    fetchCourseFunc();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="grid gap-5 grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] ">
      {courseArray.length > 0 &&
        courseArray?.map((item) => (
          <Link href={`/course/${item?.id}`} className="" key={item?.id}>
            <div className="w-full relative  h-[200px] ">
              <Image
                src={item?.coverImage}
                alt=""
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <h1 className="text-xl text-gray-800 ">{item?.name} </h1>
            <span className="text-gray-800 ">Duration: {item?.duration} </span>
          </Link>
        ))}
    </div>
  );
};

export default CourseList;
