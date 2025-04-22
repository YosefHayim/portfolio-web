import { HiOutlineHome } from "react-icons/hi2";
import { GrTechnology } from "react-icons/gr";
import { PiCertificateThin } from "react-icons/pi";
import { CiSquareInfo } from "react-icons/ci";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/Components/ui/sidebar";
import { Link } from "react-router";
import { FaProjectDiagram } from "react-icons/fa";

const items = [
  {
    title: "Home",
    url: "/",
    icon: <HiOutlineHome />,
  },
  {
    title: "About",
    url: "/about",
    icon: <CiSquareInfo />,
  },
  {
    title: "Tech Stack",
    url: "/techStack",
    icon: <GrTechnology />,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: <FaProjectDiagram />,
  },
  {
    title: "Certifications",
    url: "/certifications",
    icon: <PiCertificateThin />,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="text-white transition delay-150 duration-300 ease-in-out hover:bg-gray-700 hover:text-white"
                  >
                    <Link to={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
