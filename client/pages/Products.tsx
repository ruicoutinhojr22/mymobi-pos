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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  MoreHorizontal,
  AlertTriangle,
  BarChart3,
  Upload,
  Download,
} from "lucide-react";
import { Product, ProductCategory } from "@shared/pos-types";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Coca-Cola 500ml",
      description: "Refrigerante de cola 500ml",
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
      description: "Pão de forma integral",
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
      description: "Leite UHT integral 1 litro",
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

  const [categories] = useState<ProductCategory[]>([
    { id: "1", name: "Bebidas", color: "#3B82F6" },
    { id: "2", name: "Padaria", color: "#F59E0B" },
    { id: "3", name: "Laticínios", color: "#10B981" },
    { id: "4", name: "Carnes", color: "#EF4444" },
    { id: "5", name: "Frutas", color: "#22C55E" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    sku: "",
    barcode: "",
    price: 0,
    cost: 0,
    categoryId: "",
    stockLevel: 0,
    minStockLevel: 0,
    taxRate: 17,
  });

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.barcode?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || product.category.id === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-MZ", {
      style: "currency",
      currency: "MZN",
    }).format(amount);
  };

  const handleAddProduct = () => {
    const category = categories.find((c) => c.id === newProduct.categoryId);
    if (!category) return;

    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      description: newProduct.description,
      sku: newProduct.sku,
      barcode: newProduct.barcode,
      price: newProduct.price,
      cost: newProduct.cost,
      category,
      variants: [],
      stockLevel: newProduct.stockLevel,
      minStockLevel: newProduct.minStockLevel,
      taxRate: newProduct.taxRate,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setProducts([...products, product]);
    setShowAddDialog(false);
    setNewProduct({
      name: "",
      description: "",
      sku: "",
      barcode: "",
      price: 0,
      cost: 0,
      categoryId: "",
      stockLevel: 0,
      minStockLevel: 0,
      taxRate: 17,
    });
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm("Tem certeza que deseja eliminar este produto?")) {
      setProducts(products.filter((p) => p.id !== productId));
    }
  };

  const ProductForm = ({ product }: { product?: Product }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome do Produto *</Label>
          <Input
            id="name"
            value={product?.name || newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            placeholder="Ex: Coca-Cola 500ml"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sku">SKU *</Label>
          <Input
            id="sku"
            value={product?.sku || newProduct.sku}
            onChange={(e) =>
              setNewProduct({ ...newProduct, sku: e.target.value })
            }
            placeholder="Ex: COKE-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={product?.description || newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
          placeholder="Descrição detalhada do produto"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="barcode">Código de Barras</Label>
          <Input
            id="barcode"
            value={product?.barcode || newProduct.barcode}
            onChange={(e) =>
              setNewProduct({ ...newProduct, barcode: e.target.value })
            }
            placeholder="Ex: 1234567890123"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Categoria *</Label>
          <Select
            value={product?.category.id || newProduct.categoryId}
            onValueChange={(value) =>
              setNewProduct({ ...newProduct, categoryId: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecionar categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    {category.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Preço de Venda (MZN) *</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={product?.price || newProduct.price}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                price: parseFloat(e.target.value),
              })
            }
            placeholder="0.00"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cost">Preço de Custo (MZN) *</Label>
          <Input
            id="cost"
            type="number"
            step="0.01"
            value={product?.cost || newProduct.cost}
            onChange={(e) =>
              setNewProduct({ ...newProduct, cost: parseFloat(e.target.value) })
            }
            placeholder="0.00"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="stock">Stock Actual</Label>
          <Input
            id="stock"
            type="number"
            value={product?.stockLevel || newProduct.stockLevel}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                stockLevel: parseInt(e.target.value),
              })
            }
            placeholder="0"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="minStock">Stock Mínimo</Label>
          <Input
            id="minStock"
            type="number"
            value={product?.minStockLevel || newProduct.minStockLevel}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                minStockLevel: parseInt(e.target.value),
              })
            }
            placeholder="0"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tax">Taxa IVA (%)</Label>
          <Input
            id="tax"
            type="number"
            step="0.01"
            value={product?.taxRate || newProduct.taxRate}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                taxRate: parseFloat(e.target.value),
              })
            }
            placeholder="17"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestão de Produtos</h1>
          <p className="text-muted-foreground">
            Gerir produtos, categorias e stock
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Importar
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Novo Produto
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Produto</DialogTitle>
              </DialogHeader>
              <ProductForm />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowAddDialog(false)}
                >
                  Cancelar
                </Button>
                <Button onClick={handleAddProduct}>Adicionar Produto</Button>
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
                <p className="text-2xl font-bold">{products.length}</p>
                <p className="text-sm text-muted-foreground">Total Produtos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="w-8 h-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold">
                  {
                    products.filter((p) => p.stockLevel <= p.minStockLevel)
                      .length
                  }
                </p>
                <p className="text-sm text-muted-foreground">Stock Baixo</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <BarChart3 className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold">{categories.length}</p>
                <p className="text-sm text-muted-foreground">Categorias</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold">
                  {products
                    .reduce((sum, p) => sum + p.stockLevel, 0)
                    .toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Total Stock</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Pesquisar produtos por nome, SKU ou código de barras..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Todas as categorias" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      {category.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Produtos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {product.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono">{product.sku}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: product.category.color }}
                      />
                      {product.category.name}
                    </div>
                  </TableCell>
                  <TableCell>{formatCurrency(product.price)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{product.stockLevel}</span>
                      {product.stockLevel <= product.minStockLevel && (
                        <Badge variant="destructive" className="text-xs">
                          Baixo
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={product.isActive ? "default" : "secondary"}>
                      {product.isActive ? "Activo" : "Inactivo"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => setEditingProduct(product)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
