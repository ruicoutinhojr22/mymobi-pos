import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
} from "@/components/ui/dialog";
import {
  ShoppingCart,
  Search,
  Scan,
  Plus,
  Minus,
  Trash2,
  DollarSign,
  CreditCard,
  Smartphone,
  Calculator,
  User,
  Percent,
  Printer,
  Save,
} from "lucide-react";
import { Product, SaleItem, PaymentMethod } from "@shared/pos-types";

export default function Sales() {
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
      createdAt: "",
      updatedAt: "",
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
      createdAt: "",
      updatedAt: "",
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
      createdAt: "",
      updatedAt: "",
    },
  ]);

  const [cart, setCart] = useState<SaleItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showClientDialog, setShowClientDialog] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);

  const categories = [
    { id: "all", name: "Todas Categorias", color: "#6B7280" },
    { id: "1", name: "Bebidas", color: "#3B82F6" },
    { id: "2", name: "Padaria", color: "#F59E0B" },
    { id: "3", name: "Laticínios", color: "#10B981" },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.barcode?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || product.category.id === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.productId === product.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      const newItem: SaleItem = {
        id: `item-${Date.now()}`,
        productId: product.id,
        name: product.name,
        sku: product.sku,
        price: product.price,
        quantity: 1,
        discountAmount: 0,
        discountPercentage: 0,
        taxRate: product.taxRate,
        subtotal: product.price,
      };
      setCart([...cart, newItem]);
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCart(
      cart.map((item) =>
        item.id === itemId
          ? { ...item, quantity, subtotal: item.price * quantity }
          : item,
      ),
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.subtotal, 0);
  };

  const calculateDiscount = () => {
    return (calculateSubtotal() * discountPercentage) / 100;
  };

  const calculateTax = () => {
    const afterDiscount = calculateSubtotal() - calculateDiscount();
    return cart.reduce((sum, item) => {
      const itemAfterDiscount =
        (item.subtotal * (100 - discountPercentage)) / 100;
      return sum + (itemAfterDiscount * item.taxRate) / 100;
    }, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount() + calculateTax();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-MZ", {
      style: "currency",
      currency: "MZN",
    }).format(amount);
  };

  const clearCart = () => {
    setCart([]);
    setDiscountPercentage(0);
    setSelectedClient(null);
  };

  const PaymentDialog = () => {
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
    const [amountReceived, setAmountReceived] = useState("");

    const total = calculateTotal();
    const change = parseFloat(amountReceived) - total;

    const completeSale = () => {
      // Here you would save the sale to the backend
      console.log("Sale completed:", {
        items: cart,
        total,
        paymentMethod,
        amountReceived: parseFloat(amountReceived),
        change,
      });

      // Print receipt
      // Clear cart
      clearCart();
      setShowPaymentDialog(false);
    };

    return (
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Finalizar Venda</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(total)}
              </p>
              <p className="text-sm text-muted-foreground">Total a Pagar</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Método de Pagamento</label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={paymentMethod === "cash" ? "default" : "outline"}
                  className="pos-button-cash"
                  onClick={() => setPaymentMethod("cash")}
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Dinheiro
                </Button>
                <Button
                  variant={paymentMethod === "card" ? "default" : "outline"}
                  className="pos-button-card"
                  onClick={() => setPaymentMethod("card")}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Cartão
                </Button>
                <Button
                  variant={paymentMethod === "m-pesa" ? "default" : "outline"}
                  className="pos-button-mobile"
                  onClick={() => setPaymentMethod("m-pesa")}
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  M-Pesa
                </Button>
                <Button
                  variant={paymentMethod === "e-mola" ? "default" : "outline"}
                  className="pos-button-mobile"
                  onClick={() => setPaymentMethod("e-mola")}
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  e-Mola
                </Button>
              </div>
            </div>

            {paymentMethod === "cash" && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Valor Recebido</label>
                <Input
                  type="number"
                  step="0.01"
                  value={amountReceived}
                  onChange={(e) => setAmountReceived(e.target.value)}
                  placeholder="0.00"
                  className="text-lg text-center"
                />
                {change > 0 && (
                  <div className="text-center p-2 bg-green-100 rounded">
                    <p className="text-sm text-green-700">Troco</p>
                    <p className="text-lg font-bold text-green-700">
                      {formatCurrency(change)}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={() => setShowPaymentDialog(false)}
              >
                Cancelar
              </Button>
              <Button
                onClick={completeSale}
                disabled={
                  paymentMethod === "cash" &&
                  (parseFloat(amountReceived) < total || !amountReceived)
                }
              >
                <Printer className="w-4 h-4 mr-2" />
                Finalizar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="h-full flex gap-4">
      {/* Products Section */}
      <div className="flex-1 space-y-4">
        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Pesquisar produtos, SKU ou código de barras..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="icon">
                <Scan className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex gap-2 mt-4 overflow-x-auto">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="whitespace-nowrap"
                >
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: category.color }}
                  />
                  {category.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="pos-grid">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => addToCart(product)}
              >
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-sm line-clamp-2">
                        {product.name}
                      </h3>
                      {product.stockLevel <= product.minStockLevel && (
                        <Badge variant="destructive" className="text-xs">
                          Baixo
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {product.sku}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-green-600">
                        {formatCurrency(product.price)}
                      </p>
                      <Badge
                        variant="outline"
                        className="text-xs"
                        style={{
                          backgroundColor: `${product.category.color}20`,
                          color: product.category.color,
                        }}
                      >
                        {product.stockLevel}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cart Section */}
      <div className="w-96 space-y-4">
        <Card className="h-full flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Carrinho de Compras
              {cart.length > 0 && (
                <Badge variant="secondary">{cart.length}</Badge>
              )}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col">
            {/* Client Selection */}
            <div className="mb-4">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => setShowClientDialog(true)}
              >
                <User className="w-4 h-4 mr-2" />
                {selectedClient ? selectedClient.name : "Selecionar Cliente"}
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 space-y-2 mb-4 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Carrinho vazio</p>
                  <p className="text-sm">
                    Adicione produtos para começar uma venda
                  </p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 p-2 border rounded"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatCurrency(item.price)} cada
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">
                        {formatCurrency(item.subtotal)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-red-500"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))
              )}
            </div>

            {/* Cart Summary */}
            {cart.length > 0 && (
              <>
                <Separator className="my-4" />

                {/* Discount */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Percent className="w-4 h-4" />
                    <Input
                      type="number"
                      placeholder="Desconto %"
                      value={discountPercentage}
                      onChange={(e) =>
                        setDiscountPercentage(parseFloat(e.target.value) || 0)
                      }
                      className="h-8"
                    />
                  </div>
                </div>

                {/* Totals */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(calculateSubtotal())}</span>
                  </div>
                  {discountPercentage > 0 && (
                    <div className="flex justify-between text-sm text-red-600">
                      <span>Desconto ({discountPercentage}%):</span>
                      <span>-{formatCurrency(calculateDiscount())}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span>IVA (17%):</span>
                    <span>{formatCurrency(calculateTax())}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-green-600">
                      {formatCurrency(calculateTotal())}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => setShowPaymentDialog(true)}
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    Finalizar Venda
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      <Save className="w-4 h-4 mr-2" />
                      Suspender
                    </Button>
                    <Button variant="outline" size="sm" onClick={clearCart}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Limpar
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <PaymentDialog />
    </div>
  );
}
