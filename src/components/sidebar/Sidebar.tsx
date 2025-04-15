
import { BsBuildings } from "react-icons/bs";
import { GiPoliceOfficerHead } from "react-icons/gi";
import { GrConfigure } from "react-icons/gr";
import { MdDashboard } from "react-icons/md";
import { FaHandshake } from "react-icons/fa";
import { SidebarContent } from "./SideBarContent";
import { auth } from "@/auth.config";

const menuItems = [
  {
    icon: <MdDashboard />,
    title: "Dashboard",
    path: "/dashboard",
    roles: ["User", "Admin", "Root", "Supervisor"],
  },
  {
    icon: <BsBuildings />,
    title: "Edificios",
    path: "/edificios",
    roles: ["User", "Admin", "Root", "Supervisor"],
  },
  {
    icon: <GiPoliceOfficerHead />,
    title: "Guardias",
    path: "/guardias",
    roles: ["User", "Admin", "Root", "Supervisor"],
  },
  {
    icon: <FaHandshake />,
    title: "Administraciones",
    path: "/administraciones",
    roles: ["User", "Admin", "Root", "Supervisor"],
  },
  {
    icon: <GrConfigure />,
    title: "Usuarios",
    path: "/usuarios",
    roles: ["Admin", "Root"],
  },
];

export const Sidebar = async () => {
  const session = await auth();

  return (
    <>
      <SidebarContent menuItems={menuItems} session={session} />
    </>
  );
};
