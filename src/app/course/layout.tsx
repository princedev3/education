import { useMemo, useCallback } from "react";
import CreateSubject from "@/components/course/create-subject";
import Link from "next/link";

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const backgroundStyles = useMemo(
    () => ({
      backgroundImage: `url(${"/edu-four.jpg"})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }),
    []
  );

  const memoizedCreateSubject = useMemo(() => <CreateSubject />, []);

  const navigationLinks = useMemo(
    () => [
      { href: "/course", label: "course" },
      { href: "/", label: "home" },
    ],
    []
  );

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
        className="relative h-[250px] flex items-center justify-center"
        style={backgroundStyles}
      >
        <div className="absolute inset-0 bg-blue-900/60 z-0"></div>
        <div className="relative z-10 flex flex-col items-center text-center px-4">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
            We Prioritize Your Education
          </h1>
          <p className="md:text-xl text-white">
            Our goal is to provide you with first-class quality learning
            materials and techniques.
          </p>
        </div>
        <div className="absolute bottom-4 right-4 grid grid-flow-col gap-3 auto-cols-max z-10">
          {memoizedCreateSubject}
          {renderLinks()}
        </div>
      </div>

      <main className="mx-auto">{children}</main>
    </div>
  );
}
