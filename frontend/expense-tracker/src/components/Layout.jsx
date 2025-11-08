import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  LogOut,
  User,
  Wallet,
} from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ThemeToggle } from "./ThemeToggle";
import { UserContext } from "../context/UserContext";
import { useUserAuth } from "../hooks/useUserAuth";
import toast from "react-hot-toast";

const DashboardLayout = ({ children, activeMenu }) => {
  useUserAuth(); // ensure user is authenticated
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Income", href: "/income", icon: TrendingUp },
    { name: "Expense", href: "/expense", icon: TrendingDown },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-72 bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-sidebar-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                  <Wallet className="h-5 w-5 text-primary-foreground" />
                </div>
                <h1 className="text-xl font-bold">BalanceBin</h1>
              </div>
              <ThemeToggle />
            </div>
          </div>

          {/* Profile */}
          {user && (
            <div className="p-6 border-b border-sidebar-border">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-primary">
                  <AvatarFallback className="bg-primary/10 text-primary text-lg">
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold capitalize">
                    {user?.user?.fullName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {user?.email || "Welcome back!"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navigation.map((item) => {
              const isActive =
                location.pathname === item.href ||
                activeMenu?.toLowerCase() === item.name.toLowerCase();
              return (
                <Link key={item.name} to={item.href}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start gap-3 h-11 transition-all ${
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "hover:bg-sidebar-accent/50"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-sidebar-border">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-11 hover:bg-sidebar-accent/50"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-6">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
