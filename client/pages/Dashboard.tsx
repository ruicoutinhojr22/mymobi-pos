import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  AlertTriangle,
  Eye,
  DollarSign,
  Calendar,
} from "lucide-react";
import { DashboardStats } from "@shared/pos-types";

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    today: {
      sales: 45,
      revenue: 125000,
      transactions: 32,
    },
    thisMonth: {
      sales: 1250,
      revenue: 3500000,
      transactions: 890,
    },
    topProducts: [
      {
        product: {
          id: "1",
          name: "Coca-Cola 500ml",
          sku: "COKE-500",
          price: 45,
          category: { id: "1", name: "Bebidas", color: "#3B82F6" },
          stockLevel: 150,
        },
        quantity: 85,
        revenue: 3825,
      },
      {
        product: {
          id: "2",
          name: "Pão Forma",
          sku: "PAO-001",
          price: 25,
          category: { id: "2", name: "Padaria", color: "#F59E0B" },
          stockLevel: 45,
        },
        quantity: 62,
        revenue: 1550,
      },
    ],
    lowStock: [
      {
        id: "3",
        name: "Leite UHT 1L",
        sku: "LEITE-001",
        price: 65,
        stockLevel: 5,
        minStockLevel: 20,
        category: { id: "3", name: "Laticínios", color: "#10B981" },
      },
    ],
    recentSales: [],
  } as any);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-MZ", {
      style: "currency",
      currency: "MZN",
    }).format(amount);
  };

  const StatsCard = ({
    title,
    value,
    icon: Icon,
    color,
    subtitle,
  }: {
    title: string;
    value: string | number;
    icon: any;
    color: string;
    subtitle?: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {title}
              </p>
              <p className="text-2xl font-bold">{value}</p>
              {subtitle && (
                <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
              )}
            </div>
            <div className={`p-3 rounded-lg ${color}`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo ao MyMobiPOS - Visão geral do seu negócio
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            🇲🇿 Mozambique
          </Badge>
          <Badge variant="outline" className="text-xs">
            MZN
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Vendas Hoje"
          value={formatCurrency(stats.today.revenue)}
          icon={DollarSign}
          color="bg-green-500"
          subtitle={`${stats.today.sales} produtos vendidos`}
        />
        <StatsCard
          title="Transações Hoje"
          value={stats.today.transactions}
          icon={ShoppingCart}
          color="bg-blue-500"
          subtitle="Média: 2.8 items/transação"
        />
        <StatsCard
          title="Vendas do Mês"
          value={formatCurrency(stats.thisMonth.revenue)}
          icon={TrendingUp}
          color="bg-purple-500"
          subtitle={`${stats.thisMonth.transactions} transações`}
        />
        <StatsCard
          title="Produtos Activos"
          value="245"
          icon={Package}
          color="bg-orange-500"
          subtitle="12 categorias"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Top Products */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Produtos Mais Vendidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.topProducts.map((item, index) => (
                <div
                  key={item.product.id}
                  className="flex items-center justify-between p-3 bg-muted/20 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.product.category.color }}
                    />
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.product.category.name} • {item.product.sku}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{item.quantity} vendidos</p>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(item.revenue)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <AlertTriangle className="w-5 h-5" />
              Stock Baixo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.lowStock.map((product) => (
                <div
                  key={product.id}
                  className="p-3 border border-orange-200 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm">{product.name}</p>
                    <Badge variant="destructive" className="text-xs">
                      {product.stockLevel} restantes
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Mínimo: {product.minStockLevel} unidades
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{
                        width: `${(product.stockLevel / product.minStockLevel) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full">
                <Eye className="w-4 h-4 mr-2" />
                Ver Todos
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Acções Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Nova Venda
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Package className="w-4 h-4 mr-2" />
              Adicionar Produto
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="w-4 h-4 mr-2" />
              Novo Cliente
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <TrendingUp className="w-4 h-4 mr-2" />
              Relatórios
            </Button>
          </CardContent>
        </Card>

        {/* Today's Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Resumo de Hoje
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Vendas em Dinheiro
              </span>
              <span className="font-medium">{formatCurrency(85000)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Vendas no Cartão
              </span>
              <span className="font-medium">{formatCurrency(25000)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">M-Pesa</span>
              <span className="font-medium">{formatCurrency(15000)}</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span className="text-green-600">
                {formatCurrency(stats.today.revenue)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>Estado do Sistema</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Ligação à Internet</span>
              <Badge variant="default" className="bg-green-500">
                Online
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Backup em Nuvem</span>
              <Badge variant="default" className="bg-green-500">
                Sincronizado
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Impressora</span>
              <Badge variant="default" className="bg-green-500">
                Conectada
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Última Sincronização</span>
              <span className="text-xs text-muted-foreground">há 2 min</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
