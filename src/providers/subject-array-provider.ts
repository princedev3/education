import { courseArrayType } from "@/components/course/course-list";
import { create } from "zustand";

type ArrayTypes = {
  courseArray: courseArrayType[];
  setCourseArray: (courseArray: courseArrayType[]) => void;
};
export const useSubjectStore = create<ArrayTypes>((set) => ({
  courseArray: [],
  setCourseArray: (courseArray) => set({ courseArray }),
}));
