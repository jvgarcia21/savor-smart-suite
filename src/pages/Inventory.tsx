
import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Search, Plus, AlertTriangle, Utensils, Wine, Coffee } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Datos de ejemplo para inventario
const inventoryItems = [
  { id: 1, name: "Cerveza IPA", category: "bebidas", quantity: 5, unit: "botellas", threshold: 10, cost: 2.50, consumption: 3 },
  { id: 2, name: "Gin premium", category: "bebidas", quantity: 2, unit: "botellas", threshold: 5, cost: 15.00, consumption: 0.5 },
  { id: 3, name: "Tomates", category: "insumos", quantity: 1.5, unit: "kg", threshold: 3, cost: 3.20, consumption: 0.7 },
  { id: 4, name: "Pescado fresco", category: "insumos", quantity: 2, unit: "kg", threshold: 5, cost: 12.00, consumption: 1.2 },
  { id: 5, name: "Arroz", category: "insumos", quantity: 15, unit: "kg", threshold: 8, cost: 1.80, consumption: 2.5 },
  { id: 6, name: "Vasos de cristal", category: "utensilios", quantity: 30, unit: "unidades", threshold: 20, cost: 3.50, consumption: 0 },
  { id: 7, name: "Servilletas", category: "utensilios", quantity: 200, unit: "unidades", threshold: 100, cost: 0.05, consumption: 50 },
  { id: 8, name: "Café en grano", category: "bebidas", quantity: 3, unit: "kg", threshold: 4, cost: 18.00, consumption: 0.8 },
  { id: 9, name: "Azúcar", category: "insumos", quantity: 6, unit: "kg", threshold: 5, cost: 1.20, consumption: 1.3 },
  { id: 10, name: "Pollo", category: "insumos", quantity: 8, unit: "kg", threshold: 5, cost: 5.50, consumption: 2.1 },
];

const Inventory = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("todos");

  // Filtrar los elementos del inventario según la búsqueda y categoría
  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "todos" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAdjustStock = (id: number, amount: number) => {
    toast({
      title: "Stock ajustado",
      description: `El stock ha sido actualizado correctamente`,
    });
  };

  const getStockStatusColor = (quantity: number, threshold: number) => {
    if (quantity <= threshold * 0.3) return "bg-restaurant-danger/20 text-restaurant-danger";
    if (quantity <= threshold * 0.6) return "bg-restaurant-accent/20 text-restaurant-accent";
    return "bg-restaurant-secondary/20 text-restaurant-secondary";
  };

  const getDaysRemaining = (quantity: number, consumption: number) => {
    if (consumption === 0) return "N/A";
    const days = Math.floor(quantity / consumption);
    return days;
  };

  const showLowStockAlert = (quantity: number, threshold: number, consumption: number) => {
    const isLowStock = quantity <= threshold * 0.5;
    const days = getDaysRemaining(quantity, consumption);
    
    if (isLowStock || (days !== "N/A" && days < 3)) {
      return true;
    }
    return false;
  };

  return (
    <AppShell>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Inventario y Control de Stock</h1>
        <Button className="bg-restaurant-primary hover:bg-restaurant-primary/90">
          <Plus className="mr-2 h-4 w-4" /> Nuevo Producto
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Alertas de Inventario</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {inventoryItems
              .filter(item => showLowStockAlert(item.quantity, item.threshold, item.consumption))
              .map(item => (
                <div key={item.id} className="border rounded-lg p-4 bg-restaurant-danger/5 border-restaurant-danger/20">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium flex items-center">
                        <AlertTriangle className="h-4 w-4 text-restaurant-danger mr-1" />
                        {item.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        Quedan: {item.quantity} {item.unit}
                      </div>
                      {item.consumption > 0 && (
                        <div className="text-xs text-restaurant-danger mt-1 font-medium">
                          {getDaysRemaining(item.quantity, item.consumption) === "N/A" ? "" : `${getDaysRemaining(item.quantity, item.consumption)} días restantes`}
                        </div>
                      )}
                    </div>
                    <Badge variant="outline" className="text-restaurant-danger border-restaurant-danger">Reabastecer</Badge>
                  </div>
                </div>
              ))}
            {inventoryItems.filter(item => showLowStockAlert(item.quantity, item.threshold, item.consumption)).length === 0 && (
              <div className="col-span-4 py-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-restaurant-secondary/10 mb-4">
                  <Package className="h-8 w-8 text-restaurant-secondary" />
                </div>
                <h3 className="text-xl font-medium mb-1">¡Inventario en buen estado!</h3>
                <p className="text-gray-500">No hay alertas de stock bajo en este momento.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <CardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5" /> Productos en Inventario
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                placeholder="Buscar producto..." 
                className="pl-8 w-full sm:w-64 md:w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="todos" className="w-full" value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="mb-4 w-full justify-start overflow-auto">
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="insumos" className="flex items-center">
                <Utensils className="mr-1 h-4 w-4" /> Insumos
              </TabsTrigger>
              <TabsTrigger value="bebidas" className="flex items-center">
                <Wine className="mr-1 h-4 w-4" /> Bebidas
              </TabsTrigger>
              <TabsTrigger value="utensilios" className="flex items-center">
                <Coffee className="mr-1 h-4 w-4" /> Utensilios
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="todos" className="mt-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-4 p-4 font-medium text-gray-500 border-b">
                  <div className="col-span-4">Producto</div>
                  <div className="col-span-2 text-center">Stock</div>
                  <div className="col-span-2 text-center">Unidad</div>
                  <div className="col-span-2 text-center">Costo</div>
                  <div className="col-span-2 text-center">Acciones</div>
                </div>
                
                {filteredItems.length > 0 ? (
                  filteredItems.map(item => (
                    <div key={item.id} className="grid grid-cols-12 gap-4 p-4 border-b items-center">
                      <div className="col-span-4">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.category}</div>
                        {item.consumption > 0 && (
                          <div className="text-xs mt-1">
                            Consumo: {item.consumption} {item.unit}/día
                          </div>
                        )}
                      </div>
                      <div className="col-span-2 text-center">
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStockStatusColor(item.quantity, item.threshold)}`}>
                          {item.quantity}{showLowStockAlert(item.quantity, item.threshold, item.consumption) && <AlertTriangle className="ml-1 h-3 w-3" />}
                        </div>
                      </div>
                      <div className="col-span-2 text-center">{item.unit}</div>
                      <div className="col-span-2 text-center">${item.cost.toFixed(2)}</div>
                      <div className="col-span-2 text-center space-x-1">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAdjustStock(item.id, -1)}
                        >
                          -
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAdjustStock(item.id, 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-gray-500">No se encontraron productos que coincidan con la búsqueda.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="insumos" className="mt-0">
              {/* El mismo contenido que "todos" pero se filtra automáticamente por la selección de categoría */}
              <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-4 p-4 font-medium text-gray-500 border-b">
                  <div className="col-span-4">Producto</div>
                  <div className="col-span-2 text-center">Stock</div>
                  <div className="col-span-2 text-center">Unidad</div>
                  <div className="col-span-2 text-center">Costo</div>
                  <div className="col-span-2 text-center">Acciones</div>
                </div>
                {/* Aquí se muestra el contenido filtrado automáticamente */}
              </div>
            </TabsContent>
            
            <TabsContent value="bebidas" className="mt-0">
              {/* Contenido filtrado por bebidas */}
            </TabsContent>
            
            <TabsContent value="utensilios" className="mt-0">
              {/* Contenido filtrado por utensilios */}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </AppShell>
  );
};

export default Inventory;
