import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
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
  Users,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  MoreHorizontal,
  Star,
  CreditCard,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { Client } from "@shared/pos-types";

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([
    {
      id: "1",
      name: "João Silva",
      email: "joao.silva@email.com",
      phone: "+258 84 123 4567",
      address: "Rua das Flores, 123, Maputo",
      taxNumber: "123456789",
      loyaltyPoints: 850,
      creditLimit: 10000,
      currentBalance: 2500,
      purchaseHistory: [],
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Maria Santos",
      email: "maria.santos@email.com",
      phone: "+258 87 987 6543",
      address: "Avenida Julius Nyerere, 456, Maputo",
      taxNumber: "987654321",
      loyaltyPoints: 1200,
      creditLimit: 15000,
      currentBalance: 0,
      purchaseHistory: [],
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
    },
    {
      id: "3",
      name: "Carlos Mendes",
      email: "carlos.mendes@email.com",
      phone: "+258 82 555 7890",
      address: "Bairro Central, Lote 789, Beira",
      loyaltyPoints: 450,
      creditLimit: 5000,
      currentBalance: 750,
      purchaseHistory: [],
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    taxNumber: "",
    creditLimit: 0,
  });

  const filteredClients = clients.filter((client) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      client.name.toLowerCase().includes(searchLower) ||
      client.email?.toLowerCase().includes(searchLower) ||
      client.phone?.toLowerCase().includes(searchLower) ||
      client.taxNumber?.toLowerCase().includes(searchLower)
    );
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-MZ", {
      style: "currency",
      currency: "MZN",
    }).format(amount);
  };

  const handleAddClient = () => {
    const client: Client = {
      id: Date.now().toString(),
      name: newClient.name,
      email: newClient.email || undefined,
      phone: newClient.phone || undefined,
      address: newClient.address || undefined,
      taxNumber: newClient.taxNumber || undefined,
      loyaltyPoints: 0,
      creditLimit: newClient.creditLimit,
      currentBalance: 0,
      purchaseHistory: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setClients([...clients, client]);
    setShowAddDialog(false);
    setNewClient({
      name: "",
      email: "",
      phone: "",
      address: "",
      taxNumber: "",
      creditLimit: 0,
    });
  };

  const handleDeleteClient = (clientId: string) => {
    if (confirm("Tem certeza que deseja eliminar este cliente?")) {
      setClients(clients.filter((c) => c.id !== clientId));
    }
  };

  const getLoyaltyTier = (points: number) => {
    if (points >= 1000) return { name: "Ouro", color: "bg-yellow-500" };
    if (points >= 500) return { name: "Prata", color: "bg-gray-400" };
    return { name: "Bronze", color: "bg-orange-600" };
  };

  const ClientForm = ({ client }: { client?: Client }) => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome Completo *</Label>
        <Input
          id="name"
          value={client?.name || newClient.name}
          onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
          placeholder="Ex: João Silva"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={client?.email || newClient.email}
            onChange={(e) =>
              setNewClient({ ...newClient, email: e.target.value })
            }
            placeholder="joao@email.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            value={client?.phone || newClient.phone}
            onChange={(e) =>
              setNewClient({ ...newClient, phone: e.target.value })
            }
            placeholder="+258 84 123 4567"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Endereço</Label>
        <Input
          id="address"
          value={client?.address || newClient.address}
          onChange={(e) =>
            setNewClient({ ...newClient, address: e.target.value })
          }
          placeholder="Rua das Flores, 123, Maputo"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="taxNumber">NUIT</Label>
          <Input
            id="taxNumber"
            value={client?.taxNumber || newClient.taxNumber}
            onChange={(e) =>
              setNewClient({ ...newClient, taxNumber: e.target.value })
            }
            placeholder="123456789"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="creditLimit">Limite de Crédito (MZN)</Label>
          <Input
            id="creditLimit"
            type="number"
            step="0.01"
            value={client?.creditLimit || newClient.creditLimit}
            onChange={(e) =>
              setNewClient({
                ...newClient,
                creditLimit: parseFloat(e.target.value),
              })
            }
            placeholder="0.00"
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
          <h1 className="text-3xl font-bold">Gestão de Clientes</h1>
          <p className="text-muted-foreground">
            Gerir clientes e programa de fidelidade
          </p>
        </div>

        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Cliente</DialogTitle>
            </DialogHeader>
            <ClientForm />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddClient}>Adicionar Cliente</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold">{clients.length}</p>
                <p className="text-sm text-muted-foreground">Total Clientes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Star className="w-8 h-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold">
                  {clients.filter((c) => c.loyaltyPoints >= 1000).length}
                </p>
                <p className="text-sm text-muted-foreground">Clientes Ouro</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CreditCard className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold">
                  {formatCurrency(
                    clients.reduce((sum, c) => sum + c.currentBalance, 0),
                  )}
                </p>
                <p className="text-sm text-muted-foreground">Saldo em Dívida</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Star className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold">
                  {clients
                    .reduce((sum, c) => sum + c.loyaltyPoints, 0)
                    .toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  Total Pontos Fidelidade
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Pesquisar clientes por nome, email, telefone ou NUIT..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Clients Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Fidelidade</TableHead>
                <TableHead>Crédito</TableHead>
                <TableHead>Saldo</TableHead>
                <TableHead>Registado</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => {
                const loyaltyTier = getLoyaltyTier(client.loyaltyPoints);
                return (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{client.name}</div>
                        {client.taxNumber && (
                          <div className="text-sm text-muted-foreground">
                            NUIT: {client.taxNumber}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {client.email && (
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="w-3 h-3" />
                            {client.email}
                          </div>
                        )}
                        {client.phone && (
                          <div className="flex items-center gap-1 text-sm">
                            <Phone className="w-3 h-3" />
                            {client.phone}
                          </div>
                        )}
                        {client.address && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {client.address}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge className={`text-white ${loyaltyTier.color}`}>
                          {loyaltyTier.name}
                        </Badge>
                        <span className="text-sm">
                          {client.loyaltyPoints} pts
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(client.creditLimit)}</TableCell>
                    <TableCell>
                      <div
                        className={`font-medium ${
                          client.currentBalance > 0
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {formatCurrency(client.currentBalance)}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(client.createdAt).toLocaleDateString("pt-PT")}
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
                            onClick={() => setEditingClient(client)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Star className="mr-2 h-4 w-4" />
                            Histórico de Compras
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDeleteClient(client.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
