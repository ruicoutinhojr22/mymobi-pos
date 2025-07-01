import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Warehouse,
  Plus,
  Minus,
  Search,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Package,
  ArrowUpCircle,
  ArrowDownCircle,
  RotateCcw,
  FileText,
} from "lucide-react";
import { InventoryMovement, Product, MovementType } from "@shared/pos-types";

export default function Inventory() {
  const [products] = useState<Product[]>([
    {
      id: "1",
      name: "Coca-Cola 500ml",
      sku: "COKE-500",
      barcode: "1234567890123",
      price: 45,
      cost: 30,
      category: { id: "1", name: "Bebidas", color: "#3B82F6" },
      variants: [],
      stockLevel: 150,
      minStockLevel: 20,
      taxRate: 17,
      isActive: true,
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Pão Forma",
      sku: "PAO-001",
      barcode: "2345678901234",
      price: 25,
      cost: 15,
      category: { id: "2", name: "Padaria", color: "#F59E0B" },
      variants: [],
      stockLevel: 45,
      minStockLevel: 10,
      taxRate: 17,
      isActive: true,
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
    },
    {
      id: "3",
      name: "Leite UHT 1L",
      sku: "LEITE-001",
      barcode: "3456789012345",
      price: 65,
      cost: 45,
      category: { id: "3", name: "Laticínios", color: "#10B981" },
      variants: [],
      stockLevel: 5,
      minStockLevel: 20,
      taxRate: 17,
      isActive: true,
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
    },
  ]);

  const [movements, setMovements] = useState<InventoryMovement[]>([
    {
      id: "1",
      productId: "1",
      type: "stock_in",
      quantity: 100,
      reason: "Reposição de stock",
      reference: "PO-001",
      userId: "user1",
      createdAt: "2024-01-15T10:00:00Z",
    },
    {
      id: "2",
      productId: "2",
      type: "stock_out",
      quantity: 20,
      reason: "Venda",
      reference: "SALE-001",
      userId: "user1",
      createdAt: "2024-01-15T14:30:00Z",
    },
    {
      id: "3",
      productId: "3",
      type: "adjustment",
      quantity: -5,
      reason: "Produto danificado",
      userId: "user1",
      createdAt: "2024-01-15T16:45:00Z",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showStockInDialog, setShowStockInDialog] = useState(false);
  const [showStockOutDialog, setShowStockOutDialog] = useState(false);
  const [showAdjustmentDialog, setShowAdjustmentDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [stockMovement, setStockMovement] = useState({
    productId: "",
    quantity: 0,
    reason: "",
    reference: "",
  });

  const lowStockProducts = products.filter(
    (p) => p.stockLevel <= p.minStockLevel,
  );

  const totalStockValue = products.reduce(
    (sum, p) => sum + p.stockLevel * p.cost,
    0,
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-MZ", {
      style: "currency",
      currency: "MZN",
    }).format(amount);
  };

  const handleStockMovement = (type: MovementType) => {
    const movement: InventoryMovement = {
      id: Date.now().toString(),
      productId: stockMovement.productId,
      type,
      quantity: stockMovement.quantity,
      reason: stockMovement.reason,
      reference: stockMovement.reference,
      userId: "current-user",
      createdAt: new Date().toISOString(),
    };

    setMovements([movement, ...movements]);

    // Reset form
    setStockMovement({
      productId: "",
      quantity: 0,
      reason: "",
      reference: "",
    });

    // Close dialogs
    setShowStockInDialog(false);
    setShowStockOutDialog(false);
    setShowAdjustmentDialog(false);
  };

  const getMovementIcon = (type: MovementType) => {
    switch (type) {
      case "stock_in":
        return <ArrowUpCircle className="w-4 h-4 text-green-600" />;
      case "stock_out":
        return <ArrowDownCircle className="w-4 h-4 text-red-600" />;
      case "adjustment":
        return <RotateCcw className="w-4 h-4 text-orange-600" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getMovementTypeLabel = (type: MovementType) => {
    switch (type) {
      case "stock_in":
        return "Entrada";
      case "stock_out":
        return "Saída";
      case "adjustment":
        return "Ajuste";
      default:
        return type;
    }
  };

  const MovementForm = ({ type }: { type: MovementType }) => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="product">Produto *</Label>
        <Select
          value={stockMovement.productId}
          onValueChange={(value) =>
            setStockMovement({ ...stockMovement, productId: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecionar produto" />
          </SelectTrigger>
          <SelectContent>
            {products.map((product) => (
              <SelectItem key={product.id} value={product.id}>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: product.category.color }}
                  />
                  {product.name} ({product.sku})
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="quantity">Quantidade *</Label>
        <Input
          id="quantity"
          type="number"
          value={stockMovement.quantity}
          onChange={(e) =>
            setStockMovement({
              ...stockMovement,
              quantity: parseInt(e.target.value),
            })
          }
          placeholder="0"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="reason">Motivo *</Label>
        <Textarea
          id="reason"
          value={stockMovement.reason}
          onChange={(e) =>
            setStockMovement({ ...stockMovement, reason: e.target.value })
          }
          placeholder="Descreva o motivo do movimento"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="reference">Referência</Label>
        <Input
          id="reference"
          value={stockMovement.reference}
          onChange={(e) =>
            setStockMovement({ ...stockMovement, reference: e.target.value })
          }
          placeholder="Número da encomenda, nota fiscal, etc."
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestão de Inventário</h1>
          <p className="text-muted-foreground">
            Controlo de stock e movimentos de inventário
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Dialog open={showStockInDialog} onOpenChange={setShowStockInDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="text-green-600">
                <ArrowUpCircle className="w-4 h-4 mr-2" />
                Entrada Stock
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Entrada de Stock</DialogTitle>
              </DialogHeader>
              <MovementForm type="stock_in" />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowStockInDialog(false)}
                >
                  Cancelar
                </Button>
                <Button onClick={() => handleStockMovement("stock_in")}>
                  Registar Entrada
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog
            open={showStockOutDialog}
            onOpenChange={setShowStockOutDialog}
          >
            <DialogTrigger asChild>
              <Button variant="outline" className="text-red-600">
                <ArrowDownCircle className="w-4 h-4 mr-2" />
                Saída Stock
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Saída de Stock</DialogTitle>
              </DialogHeader>
              <MovementForm type="stock_out" />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowStockOutDialog(false)}
                >
                  Cancelar
                </Button>
                <Button onClick={() => handleStockMovement("stock_out")}>
                  Registar Saída
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog
            open={showAdjustmentDialog}
            onOpenChange={setShowAdjustmentDialog}
          >
            <DialogTrigger asChild>
              <Button variant="outline" className="text-orange-600">
                <RotateCcw className="w-4 h-4 mr-2" />
                Ajuste Stock
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajuste de Stock</DialogTitle>
              </DialogHeader>
              <MovementForm type="adjustment" />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowAdjustmentDialog(false)}
                >
                  Cancelar
                </Button>
                <Button onClick={() => handleStockMovement("adjustment")}>
                  Registar Ajuste
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold">
                  {products.reduce((sum, p) => sum + p.stockLevel, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Unidades</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="w-8 h-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold">{lowStockProducts.length}</p>
                <p className="text-sm text-muted-foreground">Stock Baixo</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold">
                  {formatCurrency(totalStockValue)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Valor Total Stock
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold">{movements.length}</p>
                <p className="text-sm text-muted-foreground">Movimentos Hoje</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="stock" className="space-y-4">
        <TabsList>
          <TabsTrigger value="stock">Níveis de Stock</TabsTrigger>
          <TabsTrigger value="movements">Movimentos</TabsTrigger>
          <TabsTrigger value="alerts">Alertas</TabsTrigger>
        </TabsList>

        <TabsContent value="stock" className="space-y-4">
          {/* Search */}
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Pesquisar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Stock Levels Table */}
          <Card>
            <CardHeader>
              <CardTitle>Níveis de Stock Atuais</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Stock Atual</TableHead>
                    <TableHead>Stock Mínimo</TableHead>
                    <TableHead>Valor Total</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products
                    .filter((product) =>
                      product.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()),
                    )
                    .map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="font-medium">{product.name}</div>
                        </TableCell>
                        <TableCell className="font-mono">
                          {product.sku}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{
                                backgroundColor: product.category.color,
                              }}
                            />
                            {product.category.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold">
                            {product.stockLevel}
                          </span>
                        </TableCell>
                        <TableCell>{product.minStockLevel}</TableCell>
                        <TableCell>
                          {formatCurrency(product.stockLevel * product.cost)}
                        </TableCell>
                        <TableCell>
                          {product.stockLevel <= product.minStockLevel ? (
                            <Badge variant="destructive">Stock Baixo</Badge>
                          ) : product.stockLevel <=
                            product.minStockLevel * 2 ? (
                            <Badge variant="secondary">Stock Médio</Badge>
                          ) : (
                            <Badge variant="default">Stock Normal</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Movimentos</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Produto</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Motivo</TableHead>
                    <TableHead>Referência</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {movements.map((movement) => {
                    const product = products.find(
                      (p) => p.id === movement.productId,
                    );
                    return (
                      <TableRow key={movement.id}>
                        <TableCell>
                          {new Date(movement.createdAt).toLocaleString("pt-PT")}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{
                                backgroundColor: product?.category.color,
                              }}
                            />
                            {product?.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getMovementIcon(movement.type)}
                            {getMovementTypeLabel(movement.type)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`font-medium ${
                              movement.type === "stock_in"
                                ? "text-green-600"
                                : movement.type === "stock_out"
                                  ? "text-red-600"
                                  : "text-orange-600"
                            }`}
                          >
                            {movement.type === "stock_in" ? "+" : ""}
                            {movement.quantity}
                          </span>
                        </TableCell>
                        <TableCell>{movement.reason}</TableCell>
                        <TableCell className="font-mono">
                          {movement.reference || "-"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                Alertas de Stock Baixo
              </CardTitle>
            </CardHeader>
            <CardContent>
              {lowStockProducts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Não há alertas de stock baixo</p>
                  <p className="text-sm">
                    Todos os produtos estão com stock adequado
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {lowStockProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-4 border border-orange-200 rounded-lg bg-orange-50"
                    >
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-orange-600" />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {product.sku} • {product.category.name}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <Badge variant="destructive">
                            {product.stockLevel} restantes
                          </Badge>
                          <p className="text-sm text-muted-foreground">
                            Mínimo: {product.minStockLevel}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
