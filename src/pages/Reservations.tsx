
import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Users, CalendarDays, Plus, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Definir tipos para reservas y mesas
interface Reservation {
  id: number;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  table?: number;
  status: "confirmed" | "pending" | "cancelled" | "completed" | "no-show";
  notes?: string;
}

interface Table {
  id: number;
  number: number;
  capacity: number;
  section: string;
  status: "available" | "occupied" | "reserved" | "cleaning";
  currentReservation?: number;
}

// Datos de ejemplo
const reservationsData: Reservation[] = [
  { id: 1, name: "Carlos Pérez", phone: "555-123-4567", email: "carlos@example.com", date: "2025-05-15", time: "19:00", guests: 4, table: 5, status: "confirmed", notes: "Celebración de aniversario" },
  { id: 2, name: "María López", phone: "555-987-6543", email: "maria@example.com", date: "2025-05-15", time: "20:30", guests: 2, table: 3, status: "confirmed" },
  { id: 3, name: "José González", phone: "555-456-7890", email: "jose@example.com", date: "2025-05-15", time: "21:15", guests: 6, status: "pending" },
  { id: 4, name: "Ana Rodríguez", phone: "555-789-0123", email: "ana@example.com", date: "2025-05-16", time: "13:00", guests: 3, table: 7, status: "confirmed" },
  { id: 5, name: "Roberto Díaz", phone: "555-321-6547", email: "roberto@example.com", date: "2025-05-16", time: "14:30", guests: 5, status: "confirmed" },
  { id: 6, name: "Sofía Martínez", phone: "555-654-9870", email: "sofia@example.com", date: "2025-05-16", time: "20:00", guests: 2, table: 2, status: "pending" },
];

const tablesData: Table[] = [
  { id: 1, number: 1, capacity: 2, section: "ventana", status: "available" },
  { id: 2, number: 2, capacity: 2, section: "ventana", status: "reserved" },
  { id: 3, number: 3, capacity: 4, section: "centro", status: "occupied" },
  { id: 4, number: 4, capacity: 4, section: "centro", status: "available" },
  { id: 5, number: 5, capacity: 4, section: "ventana", status: "reserved", currentReservation: 1 },
  { id: 6, number: 6, capacity: 6, section: "terraza", status: "occupied" },
  { id: 7, number: 7, capacity: 8, section: "privado", status: "reserved", currentReservation: 4 },
  { id: 8, number: 8, capacity: 10, section: "privado", status: "cleaning" },
  { id: 9, number: 9, capacity: 4, section: "terraza", status: "available" },
  { id: 10, number: 10, capacity: 4, section: "terraza", status: "available" },
  { id: 11, number: 11, capacity: 6, section: "terraza", status: "available" },
  { id: 12, number: 12, capacity: 2, section: "barra", status: "available" },
];

const Reservations = () => {
  const { toast } = useToast();
  const [reservations] = useState<Reservation[]>(reservationsData);
  const [tables] = useState<Table[]>(tablesData);
  const [showNewReservationDialog, setShowNewReservationDialog] = useState(false);
  const [activeSection, setActiveSection] = useState("todos");
  
  // Estados para la nueva reservación
  const [newReservation, setNewReservation] = useState<Partial<Reservation>>({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    guests: 2,
    status: "pending",
  });

  // Obtener todas las reservaciones de la fecha actual
  const todayReservations = reservations.filter(
    res => res.date === "2025-05-15" && ["confirmed", "pending"].includes(res.status)
  );

  // Obtener mesas filtradas por sección
  const filteredTables = tables.filter(table => 
    activeSection === "todos" || table.section === activeSection
  );

  // Función para manejar la creación de una nueva reservación
  const handleCreateReservation = () => {
    toast({
      title: "Reservación creada",
      description: `La reservación para ${newReservation.name} ha sido creada exitosamente.`,
    });
    setShowNewReservationDialog(false);
    // Aquí se implementaría la lógica para crear la reservación en la base de datos
  };

  // Colores y textos para el estado de las mesas
  const getTableStatusStyle = (status: Table["status"]) => {
    switch (status) {
      case "available":
        return "bg-restaurant-secondary/20 border-restaurant-secondary/30 hover:bg-restaurant-secondary/30";
      case "occupied":
        return "bg-restaurant-danger/20 border-restaurant-danger/30 hover:bg-restaurant-danger/30";
      case "reserved":
        return "bg-restaurant-accent/20 border-restaurant-accent/30 hover:bg-restaurant-accent/30";
      case "cleaning":
        return "bg-gray-200 border-gray-300 hover:bg-gray-300";
      default:
        return "bg-gray-100 border-gray-200";
    }
  };

  const getTableStatusText = (status: Table["status"]) => {
    switch (status) {
      case "available": return "Disponible";
      case "occupied": return "Ocupada";
      case "reserved": return "Reservada";
      case "cleaning": return "Limpieza";
      default: return "";
    }
  };

  const getReservationStatusColor = (status: Reservation["status"]) => {
    switch (status) {
      case "confirmed": return "bg-restaurant-secondary/20 text-restaurant-secondary";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-gray-100 text-gray-800";
      case "completed": return "bg-blue-100 text-blue-800";
      case "no-show": return "bg-restaurant-danger/20 text-restaurant-danger";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getReservationStatusText = (status: Reservation["status"]) => {
    switch (status) {
      case "confirmed": return "Confirmada";
      case "pending": return "Pendiente";
      case "cancelled": return "Cancelada";
      case "completed": return "Completada";
      case "no-show": return "No asistió";
      default: return "";
    }
  };

  return (
    <AppShell>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Reservaciones y Mesas</h1>
        <Button
          className="bg-restaurant-primary hover:bg-restaurant-primary/90"
          onClick={() => setShowNewReservationDialog(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Nueva Reservación
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        <Card className="lg:col-span-5">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarDays className="mr-2 h-5 w-5" /> Reservaciones de Hoy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayReservations.length > 0 ? (
                todayReservations.map((reservation) => (
                  <div key={reservation.id} className="p-4 rounded-lg border flex justify-between items-center">
                    <div>
                      <div className="font-medium">{reservation.name}</div>
                      <div className="text-sm text-gray-500">
                        {reservation.time} · {reservation.guests} personas
                        {reservation.table && ` · Mesa ${reservation.table}`}
                      </div>
                      {reservation.notes && (
                        <div className="text-xs text-gray-500 mt-1">{reservation.notes}</div>
                      )}
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge variant="outline" className={getReservationStatusColor(reservation.status)}>
                        {getReservationStatusText(reservation.status)}
                      </Badge>
                      <div className="text-xs mt-1">
                        {reservation.phone}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                  <p>No hay reservaciones para hoy</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-7">
          <CardHeader>
            <CardTitle>Plano de Mesas</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="todos" value={activeSection} onValueChange={setActiveSection}>
              <TabsList className="mb-4">
                <TabsTrigger value="todos">Todas</TabsTrigger>
                <TabsTrigger value="ventana">Ventana</TabsTrigger>
                <TabsTrigger value="centro">Centro</TabsTrigger>
                <TabsTrigger value="terraza">Terraza</TabsTrigger>
                <TabsTrigger value="privado">Privado</TabsTrigger>
                <TabsTrigger value="barra">Barra</TabsTrigger>
              </TabsList>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filteredTables.map((table) => {
                  const reservation = table.currentReservation 
                    ? reservations.find(r => r.id === table.currentReservation)
                    : null;
                  
                  return (
                    <div 
                      key={table.id} 
                      className={`border rounded-lg p-3 cursor-pointer transition-colors ${getTableStatusStyle(table.status)}`}
                    >
                      <div className="font-medium">Mesa {table.number}</div>
                      <div className="text-xs flex items-center mt-1">
                        <Users className="h-3 w-3 mr-1" /> {table.capacity} personas
                      </div>
                      <div className="text-xs flex items-center mt-1">
                        <MapPin className="h-3 w-3 mr-1" /> {table.section.charAt(0).toUpperCase() + table.section.slice(1)}
                      </div>
                      <div className="mt-2 text-xs inline-flex px-2 py-1 rounded-full font-medium">
                        {getTableStatusText(table.status)}
                      </div>
                      {reservation && (
                        <div className="mt-1 text-xs text-gray-600">
                          {reservation.name} · {reservation.time}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Tabs>
            
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-restaurant-secondary/50 mr-1"></div>
                <span className="text-xs">Disponible</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-restaurant-danger/50 mr-1"></div>
                <span className="text-xs">Ocupada</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-restaurant-accent/50 mr-1"></div>
                <span className="text-xs">Reservada</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-gray-300 mr-1"></div>
                <span className="text-xs">Limpieza</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Próximas Reservaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <div className="grid grid-cols-12 gap-2 p-3 bg-gray-50 font-medium text-sm">
              <div className="col-span-2">Fecha</div>
              <div className="col-span-2">Hora</div>
              <div className="col-span-2">Cliente</div>
              <div className="col-span-2">Contacto</div>
              <div className="col-span-1 text-center">Personas</div>
              <div className="col-span-1 text-center">Mesa</div>
              <div className="col-span-2 text-center">Estado</div>
            </div>
            
            {reservations
              .filter(res => res.date >= "2025-05-15")
              .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
              .map(reservation => (
                <div key={reservation.id} className="grid grid-cols-12 gap-2 p-3 border-t items-center text-sm">
                  <div className="col-span-2 flex items-center">
                    <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                    {reservation.date.split("-").reverse().slice(0, 2).join("/")}
                  </div>
                  <div className="col-span-2 flex items-center">
                    <Clock className="h-3 w-3 mr-1 text-gray-500" />
                    {reservation.time}
                  </div>
                  <div className="col-span-2">{reservation.name}</div>
                  <div className="col-span-2">
                    <div>{reservation.phone}</div>
                    <div className="text-xs text-gray-500">{reservation.email}</div>
                  </div>
                  <div className="col-span-1 text-center">
                    <Badge variant="outline">
                      <Users className="h-3 w-3 mr-1" /> {reservation.guests}
                    </Badge>
                  </div>
                  <div className="col-span-1 text-center">
                    {reservation.table || "-"}
                  </div>
                  <div className="col-span-2 text-center">
                    <Badge variant="outline" className={getReservationStatusColor(reservation.status)}>
                      {getReservationStatusText(reservation.status)}
                    </Badge>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showNewReservationDialog} onOpenChange={setShowNewReservationDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Nueva Reservación</DialogTitle>
            <DialogDescription>
              Completa los datos para realizar una nueva reservación.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="name">Nombre completo</Label>
                <Input
                  id="name"
                  value={newReservation.name}
                  onChange={(e) => setNewReservation({...newReservation, name: e.target.value})}
                  placeholder="Nombre del cliente"
                />
              </div>
              <div className="col-span-1">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  value={newReservation.phone}
                  onChange={(e) => setNewReservation({...newReservation, phone: e.target.value})}
                  placeholder="555-123-4567"
                />
              </div>
              <div className="col-span-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newReservation.email}
                  onChange={(e) => setNewReservation({...newReservation, email: e.target.value})}
                  placeholder="cliente@email.com"
                />
              </div>
              <div className="col-span-1">
                <Label htmlFor="date">Fecha</Label>
                <Input
                  id="date"
                  type="date"
                  value={newReservation.date}
                  onChange={(e) => setNewReservation({...newReservation, date: e.target.value})}
                />
              </div>
              <div className="col-span-1">
                <Label htmlFor="time">Hora</Label>
                <Input
                  id="time"
                  type="time"
                  value={newReservation.time}
                  onChange={(e) => setNewReservation({...newReservation, time: e.target.value})}
                />
              </div>
              <div className="col-span-1">
                <Label htmlFor="guests">Personas</Label>
                <Select 
                  value={String(newReservation.guests)} 
                  onValueChange={(value) => setNewReservation({...newReservation, guests: Number(value)})}
                >
                  <SelectTrigger id="guests">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <SelectItem key={num} value={String(num)}>{num} personas</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-1">
                <Label htmlFor="table">Mesa (Opcional)</Label>
                <Select 
                  value={newReservation.table?.toString() || ""} 
                  onValueChange={(value) => setNewReservation({...newReservation, table: Number(value) || undefined})}
                >
                  <SelectTrigger id="table">
                    <SelectValue placeholder="Automático" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Asignación automática</SelectItem>
                    {tables
                      .filter(table => table.status === "available" && table.capacity >= (newReservation.guests || 1))
                      .map((table) => (
                        <SelectItem key={table.id} value={String(table.number)}>
                          Mesa {table.number} ({table.capacity} personas)
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Label htmlFor="notes">Notas</Label>
                <Input
                  id="notes"
                  value={newReservation.notes || ""}
                  onChange={(e) => setNewReservation({...newReservation, notes: e.target.value})}
                  placeholder="Información adicional (alergias, ocasión especial, etc.)"
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewReservationDialog(false)}>
              Cancelar
            </Button>
            <Button
              className="bg-restaurant-primary hover:bg-restaurant-primary/90"
              onClick={handleCreateReservation}
            >
              Crear Reservación
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
};

// Componente Label para usar en el formulario
const Label = ({ htmlFor, children }: { htmlFor: string, children: React.ReactNode }) => (
  <label htmlFor={htmlFor} className="text-sm font-medium mb-1 block">
    {children}
  </label>
);

export default Reservations;
