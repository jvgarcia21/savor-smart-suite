
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Ejemplo de datos de mesas
const tables = [
  { id: 1, number: 1, status: "occupied", time: "20:15", people: 2 },
  { id: 2, number: 2, status: "reserved", time: "21:00", people: 4 },
  { id: 3, number: 3, status: "available", time: null, people: null },
  { id: 4, number: 4, status: "occupied", time: "19:45", people: 3 },
  { id: 5, number: 5, status: "available", time: null, people: null },
  { id: 6, number: 6, status: "occupied", time: "20:30", people: 6 },
  { id: 7, number: 7, status: "cleaning", time: null, people: null },
  { id: 8, number: 8, status: "available", time: null, people: null },
];

// Mapeo de estados a colores y nombres
const statusMap: Record<string, { color: string; label: string }> = {
  occupied: { color: "bg-restaurant-danger/20 text-restaurant-danger", label: "Ocupada" },
  reserved: { color: "bg-restaurant-accent/20 text-restaurant-accent", label: "Reservada" },
  available: { color: "bg-restaurant-secondary/20 text-restaurant-secondary", label: "Disponible" },
  cleaning: { color: "bg-gray-200 text-gray-500", label: "Limpieza" },
};

export default function TableStatus() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Estado de mesas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-3">
          {tables.map((table) => (
            <div
              key={table.id}
              className={`border rounded-lg p-3 text-center ${table.status === "occupied" ? "border-restaurant-danger/50" : "border-gray-200"}`}
            >
              <div className="font-medium">Mesa {table.number}</div>
              <div className={`text-xs inline-block px-2 py-1 rounded-full mt-2 ${statusMap[table.status].color}`}>
                {statusMap[table.status].label}
              </div>
              {table.time && (
                <div className="mt-1 text-sm text-gray-500">
                  {table.time} · {table.people} pers.
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
