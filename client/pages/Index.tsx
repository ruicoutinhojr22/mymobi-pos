import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  Settings,
  User,
  LogOut,
  Warehouse,
  FileText,
  CreditCard,
  Zap,
  Moon,
  Sun,
  HelpCircle,
} from "lucide-react";
import Dashboard from "./Dashboard";
import Sales from "./Sales";
import Products from "./Products";
import Clients from "./Clients";
import Inventory from "./Inventory";

type Page =
  | "dashboard"
  | "sales"
  | "products"
  | "clients"
  | "inventory"
  | "reports"
  | "users"
  | "payments"
  | "settings";

export default function Index() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      page: "dashboard" as Page,
      badge: null,
    },
    {
      title: "Vendas",
      icon: ShoppingCart,
      page: "sales" as Page,
      badge: "POS",
    },
    {
      title: "Produtos",
      icon: Package,
      page: "products" as Page,
      badge: null,
    },
    {
      title: "Clientes",
      icon: Users,
      page: "clients" as Page,
      badge: null,
    },
    {
      title: "Inventário",
      icon: Warehouse,
      page: "inventory" as Page,
      badge: "3",
    },
    {
      title: "Relatórios",
      icon: BarChart3,
      page: "reports" as Page,
      badge: null,
    },
    {
      title: "Utilizadores",
      icon: User,
      page: "users" as Page,
      badge: null,
    },
    {
      title: "Pagamentos",
      icon: CreditCard,
      page: "payments" as Page,
      badge: null,
    },
    {
      title: "Configurações",
      icon: Settings,
      page: "settings" as Page,
      badge: null,
    },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "sales":
        return <Sales />;
      case "products":
        return <Products />;
      case "clients":
        return <Clients />;
      case "inventory":
        return <Inventory />;
      case "reports":
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-bold mb-2">Relatórios</h2>
              <p className="text-muted-foreground">
                Módulo em desenvolvimento...
              </p>
            </div>
          </div>
        );
      case "users":
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <User className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-bold mb-2">
                Gestão de Utilizadores
              </h2>
              <p className="text-muted-foreground">
                Módulo em desenvolvimento...
              </p>
            </div>
          </div>
        );
      case "payments":
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <CreditCard className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-bold mb-2">Métodos de Pagamento</h2>
              <p className="text-muted-foreground">
                Módulo em desenvolvimento...
              </p>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Settings className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-bold mb-2">Configurações</h2>
              <p className="text-muted-foreground">
                Módulo em desenvolvimento...
              </p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex bg-background">
        {/* Sidebar */}
        <Sidebar side="left" className="border-r">
          <SidebarHeader className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-lg">MyMobiPOS</h1>
                <p className="text-xs text-muted-foreground">v1.0</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Sistema POS</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.page}>
                      <SidebarMenuButton
                        isActive={currentPage === item.page}
                        onClick={() => setCurrentPage(item.page)}
                        className="w-full"
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge
                            variant="secondary"
                            className="ml-auto text-xs"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4">
            <div className="flex items-center gap-3 p-2 bg-muted/20 rounded-lg">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  CX
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">Caixa 01</p>
                <p className="text-xs text-muted-foreground truncate">
                  Turno: 08:00 - 16:00
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="w-8 h-8">
                    <Settings className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsDarkMode(!isDarkMode)}>
                    {isDarkMode ? (
                      <Sun className="w-4 h-4 mr-2" />
                    ) : (
                      <Moon className="w-4 h-4 mr-2" />
                    )}
                    {isDarkMode ? "Modo Claro" : "Modo Escuro"}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Ajuda
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Terminar Sessão
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <SidebarInset className="flex-1">
          {/* Top Bar */}
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
            <div className="flex h-16 items-center justify-between px-6">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold capitalize">
                  {menuItems.find((item) => item.page === currentPage)?.title ||
                    "Dashboard"}
                </h2>
              </div>

              <div className="flex items-center gap-4">
                {/* System Status */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs text-muted-foreground">
                      Online
                    </span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    🇲🇿 MZN
                  </Badge>
                </div>

                {/* Quick Actions */}
                {currentPage !== "sales" && (
                  <Button
                    size="sm"
                    onClick={() => setCurrentPage("sales")}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Nova Venda
                  </Button>
                )}
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 h-full"
            >
              {renderPage()}
            </motion.div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
