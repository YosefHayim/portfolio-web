import { Award, BookOpen, FolderKanban, Home, Layers, User } from "lucide-react";
import { Link } from "react-router";
import {
 Sidebar,
 SidebarContent,
 SidebarGroup,
 SidebarGroupContent,
 SidebarMenu,
 SidebarMenuButton,
 SidebarMenuItem,
 useSidebar,
} from "@/Components/ui/sidebar";
import { SocialIcons } from "../ui/social-icons";

const ICON_SIZE = 18;

const items = [
 {
 title: "Home",
 url: "/#home",
 icon: <Home size={ICON_SIZE} />,
 },
 {
 title: "About",
 url: "/#home",
 icon: <User size={ICON_SIZE} />,
 },
 {
 title: "Tech Stack",
 url: "/#stack",
 icon: <Layers size={ICON_SIZE} />,
 },
 {
 title: "Projects",
 url: "/#projects",
 icon: <FolderKanban size={ICON_SIZE} />,
 },
 {
 title: "Certifications",
 url: "/#certifications",
 icon: <Award size={ICON_SIZE} />,
 },
 {
 title: "Contact",
 url: "/#contact",
 icon: <BookOpen size={ICON_SIZE} />,
 },
];

export function AppSidebar() {
 const { toggleSidebar } = useSidebar();

 return (
 <Sidebar className="border-none bg-transparent">
 <SidebarContent className="bg-[var(--bg-card)] p-2">
 <SidebarGroup className="rounded-2xl bg-[var(--bg-card)] p-2">
 <SidebarGroupContent>
 <SidebarMenu className="gap-2">
 {items.map((item) => (
 <SidebarMenuItem key={item.title}>
 <SidebarMenuButton
 asChild
 className="rounded-xl text-[var(--text-primary)] transition-all duration-200 hover:bg-[var(--bg-elevated)] hover:text-[#05df72]"
 onClick={toggleSidebar}
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

 <SocialIcons labelSides={["top", "bottom", "left", "right"]} showLabels />
 </SidebarContent>
 </Sidebar>
 );
}
