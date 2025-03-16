// import CreateModule from "@/components/course/create-module";
// import CreateSubject from "@/components/course/create-subject";
// import Link from "next/link";

// export default function CourseLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="">
//       <div
//         style={{
//           backgroundImage: `url(${"/edu-four.jpg"})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//         className="h-[250px]  relative before:absolute before:inset-0 before:bg-blue-900/50 flex items-center justify-center"
//       >
//         <h1 className="text-2xl my-2 text-white z-50 font-semibold">
//           <span className="text-4xl">W</span>e prioritize your education, as we
//           aim in providing you first-class quality learning materials and
//           techniques.
//         </h1>
//         <div className="absolute bottom-4 right-4 grid grid-flow-col gap-3 auto-cols-max ">
//           <div className="">
//             <CreateSubject />
//           </div>
//           <div className="">
//             <CreateModule />
//           </div>
//           <Link
//             href={"/course"}
//             className="  text-white bg-blue-600 px-3 py-2 text-lg font-semibold rounded-2xl capitalize cursor-pointer "
//           >
//             course
//           </Link>
//           <Link
//             href={"/"}
//             className=" text-white bg-blue-600 px-3 py-2 text-lg font-semibold rounded-2xl capitalize cursor-pointer "
//           >
//             home
//           </Link>
//         </div>
//       </div>

//       {/* Main Content */}
//       <main className=" mx-auto ">{children}</main>
//     </div>
//   );
// }

import { useMemo, useCallback } from "react";
import CreateModule from "@/components/course/create-module";
import CreateSubject from "@/components/course/create-subject";
import Link from "next/link";
import CreateTask from "@/components/course/create-task";

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Memoizing background styles so it's not recreated on every render
  const backgroundStyles = useMemo(
    () => ({
      backgroundImage: `url(${"/edu-four.jpg"})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }),
    []
  );

  const memoizedCreateSubject = useMemo(() => <CreateSubject />, []);

  // Memoizing links to prevent unnecessary re-renders
  const navigationLinks = useMemo(
    () => [
      { href: "/course", label: "course" },
      { href: "/", label: "home" },
    ],
    []
  );

  // Memoizing render function for links
  const renderLinks = useCallback(
    () =>
      navigationLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-white bg-blue-600 px-3 py-2 text-lg font-semibold rounded-2xl capitalize cursor-pointer"
        >
          {link.label}
        </Link>
      )),
    [navigationLinks]
  );

  return (
    <div>
      <div
        style={backgroundStyles}
        className="h-[250px] relative before:absolute before:inset-0 before:bg-blue-900/50 flex items-center justify-center"
      >
        <h1 className="text-2xl my-2 text-white z-50 font-semibold">
          <span className="text-4xl">W</span>e prioritize your education, as we
          aim in providing you first-class quality learning materials and
          techniques.
        </h1>

        <div className="absolute bottom-4 right-4 grid grid-flow-col gap-3 auto-cols-max">
          {memoizedCreateSubject}
          {renderLinks()}
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto">{children}</main>
    </div>
  );
}
