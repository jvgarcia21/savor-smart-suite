
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

// Datos de ejemplo para la gráfica
const data = [
  { date: "2025-05-01", sales: 4000, customers: 240 },
  { date: "2025-05-02", sales: 3000, customers: 198 },
  { date: "2025-05-03", sales: 5000, customers: 305 },
  { date: "2025-05-04", sales: 2780, customers: 189 },
  { date: "2025-05-05", sales: 1890, customers: 142 },
  { date: "2025-05-06", sales: 2390, customers: 185 },
  { date: "2025-05-07", sales: 3490, customers: 256 },
  { date: "2025-05-08", sales: 2000, customers: 167 },
  { date: "2025-05-09", sales: 2500, customers: 197 },
  { date: "2025-05-10", sales: 3200, customers: 218 },
  { date: "2025-05-11", sales: 2100, customers: 157 },
  { date: "2025-05-12", sales: 1700, customers: 143 },
  { date: "2025-05-13", sales: 3900, customers: 289 },
  { date: "2025-05-14", sales: 4200, customers: 310 },
];

export default function SalesChart() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Ventas y clientes</CardTitle>
        <CardDescription>Vista general de ventas diarias y cantidad de clientes</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1E40AF" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#1E40AF" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorCustomers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="date" 
              tickFormatter={(date) => {
                const parsedDate = parseISO(date);
                return format(parsedDate, "d MMM", { locale: es });
              }}
            />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip 
              formatter={(value: number, name: string) => {
                if (name === "sales") return [`$${value}`, "Ventas"];
                return [value, "Clientes"];
              }}
              labelFormatter={(date) => {
                const parsedDate = parseISO(date as string);
                return format(parsedDate, "d MMMM yyyy", { locale: es });
              }}
            />
            <Area 
              type="monotone" 
              dataKey="sales" 
              stroke="#1E40AF" 
              fillOpacity={1} 
              fill="url(#colorSales)" 
            />
            <Area 
              type="monotone" 
              dataKey="customers" 
              stroke="#10B981" 
              fillOpacity={1} 
              fill="url(#colorCustomers)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
