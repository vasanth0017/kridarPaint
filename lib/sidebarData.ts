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
import { title } from "process";

export  function sidebarData  (session: any) {
  return {
    user: {
      name: "Morgan",
      email: "m@example.com",
      avatar: "#",
    },
    teams: [
      {
        title:"Kridar Paints",
        subName:"Eco-Friendly"
      },
    ],
    navMain: [
      {
        title: "Dashboard",
        url: "dashboard",
        icon: SquareTerminal,
        isActive: true,
        // items: [
        //   {
        //     title: "History",
        //     url: "#",
        //   },
        //   {
        //     title: "Starred",
        //     url: "#",
        //   },
        //   {
        //     title: "Settings",
        //     url: "#",
        //   },
        // ],
      },
      {
        title: "Create Products",
        url: "/create-product",
        icon: Bot,
        // items: [
        //   {
        //     title: "Genesis",
        //     url: "#",
        //   },
        //   {
        //     title: "Explorer",
        //     url: "#",
        //   },
        //   {
        //     title: "Quantum",
        //     url: "#",
        //   },
        // ],
      },
      // {
      //   title: "Service Listing",
      //   url: "/service-listing",
      //   icon: BookOpen,
      //   ...(session?.user?.role === "freelancer" && {
      //     items: [
      //       {
      //         title: "All Services",
      //         url: "/service-listing",
      //       },
      //       {
      //         title: "My Services",
      //         url: "/my-services",
      //       },
      //     ],
      //   }),
      // },
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
  }
}
