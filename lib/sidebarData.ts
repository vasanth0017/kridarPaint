import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
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
        : []), // If not admin, it will return an empty array (hides items)
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
