import { auth } from "@/auth.config";
import Link from "next/link";

interface Props {
  path: string;
  title: string;
}

export const ButtonWithPath = async ({ path, title }: Props) => {
  const session = await auth();
  const isAdmin =
    session.user.rol.nombreRol === "Admin" ||
    session.user.rol.nombreRol === "Root";
  return (
    <>
      {isAdmin && (
        <Link
          href={path}
          className={`text-white bg-sky-600 px-4 py-3 flex items-center space-x-4 rounded-md hover:bg-cyan-600`}
        >
          <span className="group-hover:text-white-700">{title}</span>
        </Link>
      )}
    </>
  );
};
