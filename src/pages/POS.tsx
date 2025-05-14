
import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Minus, Trash2, CreditCard, QrCode } from "lucide-react";

// Datos de ejemplo para el menú
const menuCategories = [
  { id: "entradas", name: "Entradas" },
  { id: "principales", name: "Platos fuertes" },
  { id: "bebidas", name: "Bebidas" },
  { id: "postres", name: "Postres" },
];

const menuItems = [
  { id: 1, name: "Ensalada César", price: 8.99, category: "entradas", image: "/placeholder.svg" },
  { id: 2, name: "Carpaccio", price: 12.50, category: "entradas", image: "/placeholder.svg" },
  { id: 3, name: "Calamares", price: 10.99, category: "entradas", image: "/placeholder.svg" },
  { id: 4, name: "Pasta Carbonara", price: 14.99, category: "principales", image: "/placeholder.svg" },
  { id: 5, name: "Filete de res", price: 24.99, category: "principales", image: "/placeholder.svg" },
  { id: 6, name: "Risotto", price: 16.50, category: "principales", image: "/placeholder.svg" },
  { id: 7, name: "Agua mineral", price: 2.50, category: "bebidas", image: "/placeholder.svg" },
  { id: 8, name: "Refresco", price: 3.50, category: "bebidas", image: "/placeholder.svg" },
  { id: 9, name: "Vino tinto", price: 7.99, category: "bebidas", image: "/placeholder.svg" },
  { id: 10, name: "Tiramisú", price: 6.99, category: "postres", image: "/placeholder.svg" },
  { id: 11, name: "Cheesecake", price: 5.99, category: "postres", image: "/placeholder.svg" },
];

// Interfaces para el carrito
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
}

const POS = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("entradas");
  const [tableNumber, setTableNumber] = useState<number | null>(null);
  
  // Filtrar productos por categoría
  const filteredItems = menuItems.filter(item => item.category === activeCategory);
  
  // Calcular total
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Agregar al carrito
  const addToCart = (item: typeof menuItems[0]) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 } 
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };
  
  // Aumentar cantidad
  const increaseQuantity = (id: number) => {
    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };
  
  // Disminuir cantidad
  const decreaseQuantity = (id: number) => {
    setCart(cart.map(item => 
      item.id === id && item.quantity > 1 
        ? { ...item, quantity: item.quantity - 1 } 
        : item
    ).filter(item => !(item.id === id && item.quantity === 1)));
  };
  
  // Eliminar del carrito
  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };
  
  // Limpiar carrito
  const clearCart = () => {
    setCart([]);
  };
  
  return (
    <AppShell>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Punto de Venta</h1>
        <div className="flex items-center gap-2">
          <select 
            value={tableNumber || ""} 
            onChange={(e) => setTableNumber(e.target.value ? Number(e.target.value) : null)}
            className="border rounded-md px-3 py-1.5 text-sm bg-white"
          >
            <option value="">Seleccionar mesa</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>Mesa {num}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Menú */}
        <div className="w-full lg:w-2/3">
          <Card>
            <CardContent className="p-4">
              <Tabs defaultValue="entradas" className="w-full">
                <TabsList className="mb-4 w-full justify-start overflow-auto">
                  {menuCategories.map(category => (
                    <TabsTrigger 
                      key={category.id} 
                      value={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className="px-4 py-2"
                    >
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {menuCategories.map(category => (
                  <TabsContent key={category.id} value={category.id} className="mt-0">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {filteredItems.map(item => (
                        <div 
                          key={item.id} 
                          className="border rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => addToCart(item)}
                        >
                          <div className="aspect-square rounded-md bg-gray-100 mb-2 overflow-hidden">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="font-medium truncate">{item.name}</div>
                          <div className="text-restaurant-primary font-medium">${item.price.toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        {/* Ticket */}
        <div className="w-full lg:w-1/3">
          <Card className="h-full flex flex-col">
            <div className="p-4 border-b">
              <div className="font-semibold text-lg">Ticket de venta</div>
              {tableNumber && <div className="text-sm text-gray-500">Mesa: {tableNumber}</div>}
            </div>
            
            <div className="flex-grow overflow-auto p-4">
              {cart.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  El carrito está vacío
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-start border-b pb-3">
                      <div className="flex-grow">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">${item.price.toFixed(2)} x {item.quantity}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => decreaseQuantity(item.id)}
                          className="p-1 rounded-md hover:bg-gray-100"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => increaseQuantity(item.id)}
                          className="p-1 rounded-md hover:bg-gray-100"
                        >
                          <Plus size={16} />
                        </button>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 rounded-md hover:bg-gray-100 text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="p-4 border-t bg-gray-50">
              <div className="flex justify-between mb-2">
                <div>Subtotal:</div>
                <div>${cartTotal.toFixed(2)}</div>
              </div>
              <div className="flex justify-between font-semibold">
                <div>Total:</div>
                <div>${cartTotal.toFixed(2)}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-4">
                <Button 
                  variant="outline" 
                  disabled={cart.length === 0}
                  onClick={clearCart}
                >
                  Cancelar
                </Button>
                <Button 
                  disabled={cart.length === 0 || !tableNumber}
                  className="bg-restaurant-primary hover:bg-restaurant-primary/90"
                >
                  <CreditCard className="mr-2 h-4 w-4" /> Cobrar
                </Button>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full mt-2"
                disabled={cart.length === 0 || !tableNumber}
              >
                <QrCode className="mr-2 h-4 w-4" /> Código QR
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
};

export default POS;
