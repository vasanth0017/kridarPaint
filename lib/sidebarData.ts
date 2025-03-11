import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Home,
  Map,
  NotebookTabs,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";


export function sidebarData(session: any) {
  return {
    user: {
      name: "Morgan",
      email: "m@example.com",
      avatar: "#",
    },
    teams: [
      {
        title: "Kridar Paints",
        subName: "Eco-Friendly",
      },
    ],
    navMain: [
      {
        title: "Home",
        url: "/",
        icon: Home,
        isActive: true,
      },
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: SquareTerminal,
        isActive: true,
      },
      ...(session?.role === "admin"
        ? [
            {
              title: "Create Products",
              url: "/create-product",
              icon: Bot,
            },
            {
              title: "Qr Generate",
              url: "#",
              icon: BookOpen,
              items: [
                {
                  title: "Generate",
                  url: "/qr-generate",
                },
                {
                  title: "Manage QrCodes",
                  url: "#",
                },
              ],
            },
            {
              title: "painters",
              url: "/painter-details",
              icon: NotebookTabs,
            },
            {
              title: "Redeem",
              url: "#",
              icon: Settings2,
              items: [
                {
                  title: "Pending Redeem",
                  url: "/pending-reward",
                },
                {
                  title: "Total Redeem",
                  url: "#",
                },
              ],
            },
          ]
        : []),
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "General",
            url: "#",
          },
          {
            title: "Team",
            url: "#",
          },
          {
            title: "Billing",
            url: "#",
          },
          {
            title: "Limits",
            url: "#",
          },
        ],
      },
    ],
    projects: [
      {
        name: "Design Engineering",
        url: "#",
        icon: Frame,
      },
      {
        name: "Sales & Marketing",
        url: "#",
        icon: PieChart,
      },
      {
        name: "Travel",
        url: "#",
        icon: Map,
      },
    ],
  };
}
