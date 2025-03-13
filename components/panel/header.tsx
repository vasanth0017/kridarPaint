"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Home,
  User,
  Settings,
  LogOut,
  Menu,
  Bell,
  Search,
  Code,
  ChartNoAxesGantt,
  Split,
  LogIn,
  LayoutDashboard,
  ShieldUser,
  Target,
} from "lucide-react";
import { ModeToggle } from "@/components/theme/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { signOut } from "next-auth/react";
import LuxuryCoin from "../amount/display";

const navigationItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/test", icon: User },
  { name: "Our Products", href: "/our-products", icon: Target },
  { name: "Services", href: "/hello", icon: Code },
  { name: "Contact", href: "/dghj", icon: Bell },
];

export function Navigation({
  session,
  amount,
  role,
}: {
  session: any;
  amount: any;
  role: any;
}) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const pathname = usePathname();
  const user = session?.user;
  console.log("headeruser",user)
  const email = user?.email;
  console.log("headeremail",email)
  const userName = email?.substring(0, 2).toUpperCase();
  const router = useRouter();
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out",
        isScrolled
          ? "bg-background/90 backdrop-blur-sm border-b shadow-lg"
          : "bg-background"
      )}
    >
      <nav className="container mx-auto px-4 md:px-8 lg:px-16 h-16 flex items-center justify-between">
        {/* Left Section - Logo and Navigation */}
        <div className="flex items-center space-x-6 lg:space-x-10">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <ChartNoAxesGantt className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl hidden md:block">
              Kridar Paints
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-all duration-200 flex items-center space-x-2 hover:text-primary group",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground hover:translate-x-1"
                )}
              >
                <item.icon className="h-4 w-4 group-hover:rotate-6 transition-transform" />
                <span className="hidden lg:inline">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Section - Search, Actions, Profile */}
        <div className="flex items-center space-x-2 md:space-x-4 lg:space-x-6">
          {/* {coins} */}
          {role === "Painter" && <LuxuryCoin amount={amount} />}

          {/* Search */}
          {/* <div className="relative">
            {isSearchOpen ? (
              <Input
                type="text"
                placeholder="Search..."
                className="w-48 md:w-64 transition-all duration-300"
                onBlur={() => setIsSearchOpen(false)}
              />
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
          </div> */}

          {/* Theme Toggle */}
          <ModeToggle />

          {/* Profile Dropdown */}
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" alt="Profile" />
                      <AvatarFallback>{userName || "HI"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="" alt="Profile" />
                        <AvatarFallback>{userName}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/dashboard">
                    <DropdownMenuItem>
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {user?.email === "eswarvasanth17@gmail.com" ? (
                    <DropdownMenuItem
                      onClick={() => {
                        router.push("/dashboard");
                      }}
                    >
                      <ShieldUser className="mr-2 h-4 w-4" />
                      <span>Admin Page</span>
                    </DropdownMenuItem>
                  ) : (
                    ""
                  )}

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="crusor-pointer"
                    onClick={() => {
                      signOut({ callbackUrl: "/sign-in" });
                      router.push("/sign-in");
                    }}
                  >
                    <LogOut />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button
              variant="ghost"
              onClick={() => {
                router.push("/sign-in");
              }}
            >
              login
              <LogIn className="h-5 w-5" />
            </Button>
          )}

          {/* Mobile Menu Trigger */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col px-3 space-y-4 mt-8">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-sm font-medium flex items-center space-x-2 transition-colors hover:text-primary",
                      pathname === item.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                ))}
                <DropdownMenuSeparator />
                {user ? (
                  <>
                    {" "}
                    <Link
                      href="/dashboard"
                      className="flex items-center space-x-2"
                    >
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      className="flex items-center space-x-2"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center space-x-2"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                    <Link
                      href="#"
                      onClick={() => {
                        signOut();
                        router.push("/sign-in");
                      }}
                      className="flex items-center space-x-2 text-destructive"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Link>
                  </>
                ) : (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      router.push("/sign-in");
                    }}
                  >
                    <LogIn className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
