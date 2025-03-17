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

      <main className="mx-auto">{children}</main>
    </div>
  );
}
