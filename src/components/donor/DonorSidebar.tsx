import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  User,
  History,
  Calendar,
  BookOpen,
  Settings,
  LogOut,
  Droplet,
  Menu,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "My Profile", icon: User },
    { name: "Donation History", icon: History },
    { name: "Schedule Donation", icon: Calendar },
    { name: "Educational Resources", icon: BookOpen },
    { name: "Settings", icon: Settings },
  ]

  return (
    <TooltipProvider>
      <aside
        className={`h-screen bg-white border-r shadow-md flex flex-col transition-all duration-300 
          ${collapsed ? "w-20" : "w-64"}`}
      >
        {/* Header with toggle */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Droplet className="text-red-600" size={24} />
            {!collapsed && <span className="text-xl font-bold text-red-600">BloodLine</span>}
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto"
          >
            <Menu size={20} />
          </Button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 mt-4 space-y-1">
          {menuItems.map((item, idx) => (
            <Tooltip key={idx}>
              <TooltipTrigger asChild>
                <a
                  href="#"
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg 
                    hover:bg-red-50 hover:text-red-600 transition-colors
                    ${idx === 0 ? "bg-red-600 text-white shadow-sm" : "text-gray-700"}`}
                >
                  <item.icon size={20} />
                  {!collapsed && <span>{item.name}</span>}
                </a>
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent side="right">
                  <p>{item.name}</p>
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t">
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
          >
            <LogOut size={18} />
            {!collapsed && "Logout"}
          </Button>
        </div>
      </aside>
    </TooltipProvider>
  )
}
