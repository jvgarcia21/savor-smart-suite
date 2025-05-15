
import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import { CalendarIcon, Download, FileBarChart2, PieChart as PieChartIcon, ChevronDown, BarChart3, Save } from "lucide-react";
import { format, subDays, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { Button as ShadcnButton } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Datos de ejemplo para los gráficos
const salesData = Array(14).fill(0).map((_, i) => {
  const date = format(subDays(new Date("2025-05-15"), 13 - i), "yyyy-MM-dd");
  return {
    date,
    ventas: 2000 + Math.random() * 4000,
    clientes: 150 + Math.random() * 200,
    ticketPromedio: 20 + Math.random() * 15,
    presencial: 1500 + Math.random() * 3000,
    delivery: 500 + Math.random() * 1000,
  };
});

const categoryData = [
  { name: "Platos principales", valor: 8500, porcentaje: 42 },
  { name: "Bebidas", valor: 6200, porcentaje: 31 },
  { name: "Entrantes", valor: 3100, porcentaje: 15 },
  { name: "Postres", valor: 2400, porcentaje: 12 },
];

const COLORS = ["#1E40AF", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];

const productData = [
  { name: "Filete de res", cantidad: 120, ingresos: 3600, ganancia: 1800, porcentaje: 18 },
  { name: "Pizza margarita", cantidad: 95, ingresos: 2375, ganancia: 1425, porcentaje: 12 },
  { name: "Cerveza artesanal", cantidad: 210, ingresos: 1890, ganancia: 1260, porcentaje: 9.5 },
  { name: "Pasta carbonara", cantidad: 85, ingresos: 1700, ganancia: 935, porcentaje: 8.5 },
  { name: "Copa de vino", cantidad: 150, ingresos: 1650, ganancia: 1125, porcentaje: 8.2 },
  { name: "Ensalada César", cantidad: 78, ingresos: 1170, ganancia: 702, porcentaje: 5.8 },
  { name: "Tiramisú", cantidad: 65, ingresos: 975, ganancia: 650, porcentaje: 4.9 },
  { name: "Risotto", cantidad: 45, ingresos: 945, ganancia: 540, porcentaje: 4.7 },
];

const wasteData = [
  { name: "Pescado", valor: 320, porcentaje: 28 },
  { name: "Verduras", valor: 280, porcentaje: 25 },
  { name: "Carnes", valor: 240, porcentaje: 21 },
  { name: "Lácteos", valor: 160, porcentaje: 14 },
  { name: "Otros", valor: 120, porcentaje: 12 },
];

const staffPerformance = [
  { name: "Carlos", ventas: 12500, clientes: 95, valoracion: 4.8 },
  { name: "María", ventas: 10800, clientes: 82, valoracion: 4.9 },
  { name: "Javier", ventas: 9500, clientes: 73, valoracion: 4.5 },
  { name: "Ana", ventas: 8200, clientes: 68, valoracion: 4.6 },
  { name: "Miguel", ventas: 7800, clientes: 64, valoracion: 4.3 },
];

const Reports = () => {
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>();
  const [reportType, setReportType] = useState("ventas");
  const [exportFormat, setExportFormat] = useState("pdf");
  const [chartType, setChartType] = useState("line");
  
  // Formatear la fecha para mostrar
  const formatDateRange = () => {
    if (dateRange?.from) {
      if (dateRange.to) {
        return `${format(dateRange.from, 'P', { locale: es })} - ${format(dateRange.to, 'P', { locale: es })}`;
      }
      return format(dateRange.from, 'P', { locale: es });
    }
    return "Seleccionar rango";
  };
  
  // Manejo de la exportación de reportes
  const handleExportReport = () => {
    toast({
      title: "Reporte exportado",
      description: `El reporte se ha exportado en formato ${exportFormat.toUpperCase()} correctamente.`,
    });
  };
  
  // Manejo para guardar la vista personalizada
  const handleSaveView = () => {
    toast({
      title: "Vista guardada",
      description: "La vista personalizada se ha guardado correctamente.",
    });
  };

  return (
    <AppShell>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Reportes y Análisis</h1>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formatDateRange()}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                initialFocus
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                className="border-0"
              />
            </PopoverContent>
          </Popover>
          <Select value={exportFormat} onValueChange={setExportFormat}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Formato" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="excel">Excel</SelectItem>
              <SelectItem value="png">PNG</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline"
            onClick={handleExportReport}
          >
            <Download className="mr-2 h-4 w-4" /> Exportar
          </Button>
          <Button
            variant="outline"
            onClick={handleSaveView}
          >
            <Save className="mr-2 h-4 w-4" /> Guardar vista
          </Button>
        </div>
      </div>

      <Tabs defaultValue="ventas" value={reportType} onValueChange={setReportType}>
        <div className="flex justify-between items-center mb-4">
          <TabsList className="w-auto">
            <TabsTrigger value="ventas" className="flex items-center gap-1">
              <FileBarChart2 className="h-4 w-4" /> Ventas
            </TabsTrigger>
            <TabsTrigger value="productos" className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4" /> Productos
            </TabsTrigger>
            <TabsTrigger value="desperdicios" className="flex items-center gap-1">
              <PieChartIcon className="h-4 w-4" /> Desperdicios
            </TabsTrigger>
            <TabsTrigger value="personal" className="flex items-center gap-1">
              <FileBarChart2 className="h-4 w-4" /> Personal
            </TabsTrigger>
          </TabsList>
          
          {reportType === "ventas" && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Tipo de gráfico:</span>
              <div className="flex border rounded-md overflow-hidden">
                <Button 
                  variant={chartType === "line" ? "default" : "ghost"}
                  size="sm"
                  className={`rounded-none px-3 py-1 h-8 ${chartType === "line" ? "bg-restaurant-primary hover:bg-restaurant-primary/90" : ""}`}
                  onClick={() => setChartType("line")}
                >
                  Línea
                </Button>
                <Button 
                  variant={chartType === "bar" ? "default" : "ghost"}
                  size="sm"
                  className={`rounded-none px-3 py-1 h-8 ${chartType === "bar" ? "bg-restaurant-primary hover:bg-restaurant-primary/90" : ""}`}
                  onClick={() => setChartType("bar")}
                >
                  Barras
                </Button>
                <Button 
                  variant={chartType === "area" ? "default" : "ghost"}
                  size="sm"
                  className={`rounded-none px-3 py-1 h-8 ${chartType === "area" ? "bg-restaurant-primary hover:bg-restaurant-primary/90" : ""}`}
                  onClick={() => setChartType("area")}
                >
                  Área
                </Button>
              </div>
            </div>
          )}
        </div>

        <TabsContent value="ventas" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Ventas Totales</CardTitle>
                <CardDescription>Últimos 14 días</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">$48,250.50</div>
                <div className="text-sm flex items-center">
                  <Badge variant="outline" className="bg-restaurant-secondary/20 text-restaurant-secondary">
                    ↑ 15.8% vs período anterior
                  </Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Ticket Promedio</CardTitle>
                <CardDescription>Últimos 14 días</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">$28.65</div>
                <div className="text-sm flex items-center">
                  <Badge variant="outline" className="bg-restaurant-secondary/20 text-restaurant-secondary">
                    ↑ 3.2% vs período anterior
                  </Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Distribución de Ventas</CardTitle>
                <CardDescription>Por canal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold">Presencial</div>
                    <div className="text-2xl font-bold mb-1">$35,425.80</div>
                    <div className="text-sm">73.5% del total</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">Delivery</div>
                    <div className="text-2xl font-bold mb-1">$12,824.70</div>
                    <div className="text-sm">26.5% del total</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Tendencias de Ventas</CardTitle>
                  <CardDescription>
                    Datos de ventas, clientes y ticket promedio en el tiempo
                  </CardDescription>
                </div>
                <Select defaultValue="ventas_totales">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Métrica" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ventas_totales">Ventas Totales</SelectItem>
                    <SelectItem value="clientes">Número de Clientes</SelectItem>
                    <SelectItem value="ticket_promedio">Ticket Promedio</SelectItem>
                    <SelectItem value="canales">Canales (Pre/Del)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                {chartType === "line" && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={salesData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date"
                        tick={{ fontSize: 12 }}
                        tickFormatter={(date) => {
                          const parsedDate = parseISO(date);
                          return format(parsedDate, "d MMM", { locale: es });
                        }}
                      />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: number) => ["$" + value.toFixed(2), "Ventas"]}
                        labelFormatter={(date) => {
                          const parsedDate = parseISO(date as string);
                          return format(parsedDate, "d MMMM yyyy", { locale: es });
                        }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="ventas" 
                        name="Ventas ($)" 
                        stroke="#1E40AF" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="clientes" 
                        name="Clientes" 
                        stroke="#10B981" 
                        strokeWidth={2} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
                
                {chartType === "bar" && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={salesData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date"
                        tick={{ fontSize: 12 }}
                        tickFormatter={(date) => {
                          const parsedDate = parseISO(date);
                          return format(parsedDate, "d MMM", { locale: es });
                        }}
                      />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: number) => ["$" + value.toFixed(2), "Ventas"]}
                        labelFormatter={(date) => {
                          const parsedDate = parseISO(date as string);
                          return format(parsedDate, "d MMMM yyyy", { locale: es });
                        }}
                      />
                      <Legend />
                      <Bar 
                        dataKey="ventas" 
                        name="Ventas ($)" 
                        fill="#1E40AF" 
                      />
                      <Bar 
                        dataKey="clientes" 
                        name="Clientes" 
                        fill="#10B981" 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
                
                {chartType === "area" && (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={salesData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <defs>
                        <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1E40AF" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#1E40AF" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorClientes" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date"
                        tick={{ fontSize: 12 }}
                        tickFormatter={(date) => {
                          const parsedDate = parseISO(date);
                          return format(parsedDate, "d MMM", { locale: es });
                        }}
                      />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: number) => ["$" + value.toFixed(2), "Ventas"]}
                        labelFormatter={(date) => {
                          const parsedDate = parseISO(date as string);
                          return format(parsedDate, "d MMMM yyyy", { locale: es });
                        }}
                      />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="ventas" 
                        name="Ventas ($)" 
                        stroke="#1E40AF" 
                        fillOpacity={1} 
                        fill="url(#colorVentas)" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="clientes" 
                        name="Clientes" 
                        stroke="#10B981" 
                        fillOpacity={1} 
                        fill="url(#colorClientes)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="productos" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
            <Card className="lg:col-span-7">
              <CardHeader>
                <CardTitle>Categorías</CardTitle>
                <CardDescription>Distribución de ventas por categoría de producto</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={categoryData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={120} />
                      <Tooltip 
                        formatter={(value: number) => ["$" + value.toFixed(2), "Ventas"]}
                      />
                      <Legend />
                      <Bar 
                        dataKey="valor" 
                        name="Ventas ($)" 
                        fill="#1E40AF"
                        label={{ position: 'right', formatter: (val: number) => `$${val}` }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-5">
              <CardHeader>
                <CardTitle>Distribución por Categoría</CardTitle>
                <CardDescription>Porcentaje de las ventas totales</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="valor"
                        nameKey="name"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                      <Tooltip formatter={(value: number) => ["$" + value.toFixed(2), "Ventas"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>PMIX - Análisis de Productos</CardTitle>
                  <CardDescription>
                    Lista detallada de productos por volumen de ventas y rentabilidad
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="ingresos">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ingresos">Mayores ingresos</SelectItem>
                      <SelectItem value="cantidad">Mayor cantidad</SelectItem>
                      <SelectItem value="ganancia">Mayor ganancia</SelectItem>
                      <SelectItem value="porcentaje">Mayor % del total</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-2 p-3 bg-gray-50 font-medium text-sm">
                  <div className="col-span-4">Producto</div>
                  <div className="col-span-2 text-center">Cantidad vendida</div>
                  <div className="col-span-2 text-center">Ingresos</div>
                  <div className="col-span-2 text-center">Ganancia</div>
                  <div className="col-span-2 text-center">% del Total</div>
                </div>
                
                {productData.map((product) => (
                  <div key={product.name} className="grid grid-cols-12 gap-2 p-3 border-t items-center">
                    <div className="col-span-4 font-medium">{product.name}</div>
                    <div className="col-span-2 text-center">{product.cantidad} uds</div>
                    <div className="col-span-2 text-center">${product.ingresos.toLocaleString()}</div>
                    <div className="col-span-2 text-center">${product.ganancia.toLocaleString()}</div>
                    <div className="col-span-2 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-restaurant-primary h-2 rounded-full" 
                            style={{ width: `${product.porcentaje * 2}%` }}
                          ></div>
                        </div>
                        <span>{product.porcentaje}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="desperdicios" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <Card className="lg:col-span-6">
              <CardHeader>
                <CardTitle>Desperdicios por Categoría</CardTitle>
                <CardDescription>
                  Distribución de desperdicios por tipo de producto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={wasteData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="valor"
                        nameKey="name"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {wasteData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                      <Tooltip formatter={(value: number) => ["$" + value.toFixed(2), "Costo"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-6">
              <CardHeader>
                <CardTitle>Análisis de Desperdicios</CardTitle>
                <CardDescription>Desglose por categoría y costos asociados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="text-lg font-bold">Total de desperdicios</div>
                    <div className="text-2xl font-bold">$1,120.00</div>
                  </div>
                  <div className="text-sm text-gray-500">
                    Representa un 4.8% del costo total de insumos
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="font-medium mb-2">Desglose por categoría</div>
                    <div className="space-y-3">
                      {wasteData.map((item) => (
                        <div key={item.name} className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div 
                              className="w-3 h-3 rounded-full mr-2"
                              style={{ backgroundColor: COLORS[wasteData.indexOf(item) % COLORS.length] }}
                            ></div>
                            <span>{item.name}</span>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">${item.valor}</span>
                            <span className="text-gray-500 ml-2">({item.porcentaje}%)</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="font-medium mb-2">Acciones recomendadas</div>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Revisar el proceso de almacenamiento de pescado</li>
                      <li>Mejorar la rotación de inventario de verduras</li>
                      <li>Ajustar porciones en preparaciones de carne</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="personal" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <Card className="lg:col-span-12">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Desempeño del Personal</CardTitle>
                    <CardDescription>
                      Análisis de ventas, atención al cliente y valoraciones
                    </CardDescription>
                  </div>
                  <Select defaultValue="ventas">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Métrica" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ventas">Ventas generadas</SelectItem>
                      <SelectItem value="clientes">Clientes atendidos</SelectItem>
                      <SelectItem value="valoracion">Valoración promedio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={staffPerformance}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: number) => ["$" + value.toFixed(2), "Ventas"]}
                      />
                      <Legend />
                      <Bar 
                        dataKey="ventas" 
                        name="Ventas ($)" 
                        fill="#1E40AF" 
                      />
                      <Bar 
                        dataKey="clientes" 
                        name="Clientes atendidos" 
                        fill="#10B981" 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-6">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 gap-2 p-3 bg-gray-50 font-medium text-sm">
                      <div className="col-span-3">Empleado</div>
                      <div className="col-span-3 text-center">Ventas Generadas</div>
                      <div className="col-span-3 text-center">Clientes Atendidos</div>
                      <div className="col-span-3 text-center">Valoración Promedio</div>
                    </div>
                    
                    {staffPerformance.map((staff) => (
                      <div key={staff.name} className="grid grid-cols-12 gap-2 p-3 border-t items-center">
                        <div className="col-span-3 font-medium">{staff.name}</div>
                        <div className="col-span-3 text-center">${staff.ventas.toLocaleString()}</div>
                        <div className="col-span-3 text-center">{staff.clientes}</div>
                        <div className="col-span-3 text-center">
                          <div className="flex items-center justify-center">
                            <div className="flex items-center">
                              {Array(5).fill(0).map((_, i) => (
                                <svg 
                                  key={i}
                                  className={`w-4 h-4 ${i < Math.floor(staff.valoracion) ? 'text-yellow-400' : 'text-gray-300'}`}
                                  fill="currentColor" 
                                  viewBox="0 0 20 20" 
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                              ))}
                            </div>
                            <span className="ml-2">{staff.valoracion.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
};

export default Reports;
