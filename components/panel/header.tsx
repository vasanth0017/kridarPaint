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
} from "lucide-react";
import { ModeToggle } from "@/components/theme/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { signOut } from "next-auth/react";

const navigationItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/test", icon: User },
  { name: "Our Products", href: "/our-products", icon: Code },
  { name: "Services", href: "/hello", icon: Code },
  { name: "Contact", href: "/dghj", icon: Bell },
];

export function Navigation({ session }: { session: any }) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const pathname = usePathname();
  const user = session?.user;
  const name = user?.name;
  const userName = name?.substring(0, 2).toUpperCase();
  const router = useRouter();
  console.log("user",user)
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
          {/* Search */}
          <div className="relative">
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
          </div>

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
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      signOut();
                      router.push("/sign-in");
                    }}
                    className="text-destructive focus:text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                router.push("/sign-in");
              }}
            >
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
              <div className="flex flex-col space-y-4 mt-8">
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
                    size="icon"
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
