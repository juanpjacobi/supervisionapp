'use client'
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import  { useEffect, useState } from 'react'
import { CiMenuBurger } from 'react-icons/ci';
import { SidebarItem } from './SidebarItem';
import { Logout } from './Logout';
import { Session } from 'next-auth';

interface Props {
    menuItems:  {
      icon: JSX.Element;
      title: string;
      path: string;
      roles: string[];
  }[]
    session: Session
}

export const SidebarContent = ({menuItems, session}: Props) => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 1024);

    const userRol = session.user.rol.nombreRol;
  
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 1024) {
          setIsSidebarVisible(true);
        } else {
          setIsSidebarVisible(false);
        }
      };
  
      window.addEventListener("resize", handleResize);
      handleResize();
  
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    const toggleSidebar = () => setIsSidebarVisible((prev) => !prev);
  
    return (
      <>
        <button
          onClick={toggleSidebar}
          className="p-1 fixed top-3 left-4 z-20 lg:hidden bg-white rounded-full shadow-lg"
        >
          <CiMenuBurger size={30} />
        </button>
  
        {/* Sidebar */}
        <aside
          className={clsx(
            "fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition-transform duration-300 md:w-4/12 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]",
            {
              "-translate-x-full": !isSidebarVisible, 
              "translate-x-0": isSidebarVisible, 
            }
          )}
        >
          <div>
            <div className="-mx-6 px-6 py-4">
              <Link href="#" title="home">
                <Image
                  src="/logo.png"
                  width={150}
                  height={150}
                  className="w-64"
                  alt="tailus logo"
                />
              </Link>
            </div>
            <div className="mt-8 text-center">
              <h5 className="mt-4 text-xl font-semibold text-gray-600 lg:block">
                {session?.user.nombre}
              </h5>
              <span className="text-gray-400 lg:block">
                "{userRol}"
              </span>
            </div>
            <ul className="space-y-2 tracking-wide mt-8">
              {menuItems
                .filter((menuItem) => menuItem.roles.includes(userRol))
                .map((menuItem) => (
                  <SidebarItem key={menuItem.path} {...menuItem} />
                ))}
            </ul>
          </div>
  
          <Logout />
        </aside>
      </>
    );
  };
