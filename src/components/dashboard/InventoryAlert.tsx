
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";

// Datos de ejemplo para alertas de inventario
const inventoryAlerts = [
  { id: 1, name: "Cerveza IPA", quantity: 5, threshold: 10, unit: "botellas" },
  { id: 2, name: "Gin premium", quantity: 2, threshold: 5, unit: "botellas" },
  { id: 3, name: "Tomates", quantity: 1.5, threshold: 3, unit: "kg" },
  { id: 4, name: "Pescado fresco", quantity: 2, threshold: 5, unit: "kg" },
];

export default function InventoryAlert() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package size={18} />
          Alertas de inventario
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {inventoryAlerts.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b pb-3">
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-500">
                  Quedan: <span className="text-restaurant-danger font-medium">{item.quantity} {item.unit}</span>
                </div>
              </div>
              <div className="text-xs bg-restaurant-danger/10 text-restaurant-danger px-2 py-1 rounded-full">
                Bajo inventario
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 text-sm text-center text-primary hover:underline">
          Ver todo el inventario
        </button>
      </CardContent>
    </Card>
  );
}
