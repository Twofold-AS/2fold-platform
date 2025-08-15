"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, MoveRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import AdaptiveLogo from "@/components/AdaptiveLogo";
import ThemeToggle from "@/components/ThemeToggle";
import AuthSection from "../auth/AuthSection";

export default function Header() {
    const [isOpen, setOpen] = useState(false);

    const navigationItems = [
        {
            title: "The Fold",
            description: "Managing a small business today is already tough.",
            items: [
                { title: "Reports", href: "/reports" },
                { title: "Statistics", href: "/statistics" },
                { title: "Dashboards", href: "/dashboards" },
                { title: "Recordings", href: "/recordings" },
            ],
        },
        {
            title: "Company",
            description: "Managing a small business today is already tough.",
            items: [
                { title: "About us", href: "/about" },
                { title: "Fundraising", href: "/fundraising" },
                { title: "Investors", href: "/investors" },
                { title: "Contact us", href: "/contact" },
            ],
        },
    ];

    return (
        <header className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            {/* Logo på venstre side */}
            <AdaptiveLogo />

            {/* Alt annet på høyre side */}
            <div className="flex items-center gap-4">
                <NavigationMenu className="hidden lg:block">
                    <NavigationMenuList className="flex gap-4">
                        {navigationItems.map((item) => (
                            <NavigationMenuItem key={item.title}>
                                <NavigationMenuTrigger className="font-medium text-sm">
                                    {item.title}
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="!w-[450px] p-4">
                                    <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                                        <div className="flex flex-col justify-between">
                                            <div className="flex flex-col">
                                                <p className="text-base">{item.title}</p>
                                                <p className="text-muted-foreground text-sm">
                                                    {item.description}
                                                </p>
                                            </div>
                                            <Button size="sm" className="mt-10">
                                                Book a call today
                                            </Button>
                                        </div>
                                        <div className="flex flex-col text-sm">
                                            {item.items?.map((subItem) => (
                                                <NavigationMenuLink
                                                    key={subItem.title}
                                                    href={subItem.href}
                                                    className="flex justify-between items-center hover:bg-muted py-2 px-4 rounded"
                                                >
                                                    <span>{subItem.title}</span>
                                                    <MoveRight className="w-4 h-4 text-muted-foreground" />
                                                </NavigationMenuLink>
                                            ))}
                                        </div>
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
                
                <ThemeToggle />
                <div className="border-r hidden md:inline" />
                
                {/* Auth Section - Server Component */}
                <AuthSection />

                {/* Mobilmeny */}
                <Button
                    variant="ghost"
                    className="lg:hidden"
                    onClick={() => setOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-16 right-0 w-full bg-background shadow-lg py-4 flex flex-col gap-8 lg:hidden z-50">
                    {navigationItems.map((item) => (
                        <div key={item.title} className="px-4">
                            <p className="text-lg">{item.title}</p>
                            {item.items?.map((subItem) => (
                                <Link
                                    key={subItem.title}
                                    href={subItem.href}
                                    className="flex justify-between items-center py-1"
                                    onClick={() => setOpen(false)}
                                >
                                    <span className="text-muted-foreground">{subItem.title}</span>
                                    <MoveRight className="w-4 h-4" />
                                </Link>
                            ))}
                        </div>
                    ))}
                    
                    {/* Auth i mobilmeny */}
                    <div className="px-4 pt-4 border-t">
                        <AuthSection />
                    </div>
                </div>
            )}
        </header>
    );
}