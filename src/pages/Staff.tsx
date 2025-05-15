
import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, Clock, Calendar, Users, Search, MoreHorizontal, CheckCircle2, FileBarChart2, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Tipos para la gestión de personal
interface StaffMember {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "on-leave";
  hourlyRate: number;
  startDate: string;
  avatar?: string;
}

interface Shift {
  id: number;
  staffId: number;
  date: string;
  startTime: string;
  endTime: string;
  position: string;
  status: "scheduled" | "completed" | "missed" | "in-progress";
}

interface Task {
  id: number;
  staffId: number;
  title: string;
  description?: string;
  status: "pending" | "completed" | "in-progress";
  priority: "low" | "medium" | "high";
  createdAt: string;
  dueDate?: string;
}

// Datos de ejemplo
const staffData: StaffMember[] = [
  { id: 1, name: "Carlos Ramírez", role: "gerente", email: "carlos@restaurantos.com", phone: "555-123-4567", status: "active", hourlyRate: 18.50, startDate: "2023-02-15" },
  { id: 2, name: "Luisa Martinez", role: "mesero", email: "luisa@restaurantos.com", phone: "555-234-5678", status: "active", hourlyRate: 12.00, startDate: "2024-01-10" },
  { id: 3, name: "Antonio Gómez", role: "cocina", email: "antonio@restaurantos.com", phone: "555-345-6789", status: "active", hourlyRate: 14.50, startDate: "2023-07-05" },
  { id: 4, name: "Elena Torres", role: "recepcion", email: "elena@restaurantos.com", phone: "555-456-7890", status: "on-leave", hourlyRate: 13.00, startDate: "2024-03-20" },
  { id: 5, name: "Miguel Flores", role: "repartidor", email: "miguel@restaurantos.com", phone: "555-567-8901", status: "active", hourlyRate: 11.50, startDate: "2024-04-01" },
  { id: 6, name: "Patricia Blanco", role: "contabilidad", email: "patricia@restaurantos.com", phone: "555-678-9012", status: "active", hourlyRate: 16.50, startDate: "2023-05-12" },
  { id: 7, name: "Javier Soto", role: "mesero", email: "javier@restaurantos.com", phone: "555-789-0123", status: "inactive", hourlyRate: 12.00, startDate: "2023-08-15" },
  { id: 8, name: "María Navarro", role: "cocina", email: "maria@restaurantos.com", phone: "555-890-1234", status: "active", hourlyRate: 14.00, startDate: "2023-11-20" },
];

const shiftsData: Shift[] = [
  { id: 1, staffId: 1, date: "2025-05-15", startTime: "08:00", endTime: "17:00", position: "gerente", status: "in-progress" },
  { id: 2, staffId: 2, date: "2025-05-15", startTime: "10:00", endTime: "19:00", position: "mesero", status: "in-progress" },
  { id: 3, staffId: 3, date: "2025-05-15", startTime: "09:00", endTime: "18:00", position: "cocina", status: "in-progress" },
  { id: 4, staffId: 5, date: "2025-05-15", startTime: "11:00", endTime: "20:00", position: "repartidor", status: "scheduled" },
  { id: 5, staffId: 6, date: "2025-05-15", startTime: "09:00", endTime: "16:00", position: "contabilidad", status: "scheduled" },
  { id: 6, staffId: 8, date: "2025-05-15", startTime: "14:00", endTime: "23:00", position: "cocina", status: "scheduled" },
  { id: 7, staffId: 2, date: "2025-05-16", startTime: "10:00", endTime: "19:00", position: "mesero", status: "scheduled" },
  { id: 8, staffId: 3, date: "2025-05-16", startTime: "09:00", endTime: "18:00", position: "cocina", status: "scheduled" },
];

const tasksData: Task[] = [
  { id: 1, staffId: 2, title: "Limpiar mesa 5", description: "Mesa de la esquina requiere limpieza urgente", status: "pending", priority: "high", createdAt: "2025-05-15T10:30:00" },
  { id: 2, staffId: 3, title: "Reabastecer café", description: "Se acabó el café en la estación 2", status: "completed", priority: "medium", createdAt: "2025-05-15T09:45:00" },
  { id: 3, staffId: 5, title: "Nuevo pedido delivery", description: "Entregar pedido #1234 en Av. Principal 123", status: "in-progress", priority: "high", createdAt: "2025-05-15T12:15:00", dueDate: "2025-05-15T13:00:00" },
  { id: 4, staffId: 2, title: "Ayudar en la mesa 3", description: "Cliente solicitó recomendaciones de vino", status: "pending", priority: "low", createdAt: "2025-05-15T13:10:00" },
  { id: 5, staffId: 8, title: "Preparar mise en place", description: "Organizar ingredientes para servicio de la noche", status: "in-progress", priority: "medium", createdAt: "2025-05-15T14:30:00" },
];

const Staff = () => {
  const { toast } = useToast();
  const [staff] = useState<StaffMember[]>(staffData);
  const [shifts] = useState<Shift[]>(shiftsData);
  const [tasks] = useState<Task[]>(tasksData);
  const [showNewStaffDialog, setShowNewStaffDialog] = useState(false);
  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false);
  const [showNewShiftDialog, setShowNewShiftDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeRole, setActiveRole] = useState("todos");
  
  // Estados para nuevo personal
  const [newStaff, setNewStaff] = useState<Partial<StaffMember>>({
    name: "",
    role: "",
    email: "",
    phone: "",
    status: "active",
    hourlyRate: 12,
    startDate: new Date().toISOString().split("T")[0],
  });
  
  // Estados para nueva tarea
  const [newTask, setNewTask] = useState<Partial<Task>>({
    staffId: 0,
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    createdAt: new Date().toISOString(),
  });

  // Estados para nuevo turno
  const [newShift, setNewShift] = useState<Partial<Shift>>({
    staffId: 0,
    date: new Date().toISOString().split("T")[0],
    startTime: "09:00",
    endTime: "18:00",
    position: "",
    status: "scheduled",
  });

  // Filtrar personal según búsqueda y rol
  const filteredStaff = staff.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = activeRole === "todos" || member.role === activeRole;
    return matchesSearch && matchesRole;
  });

  // Encontrar turnos de hoy
  const todayShifts = shifts.filter(shift => shift.date === "2025-05-15");
  
  // Encontrar tareas pendientes
  const pendingTasks = tasks.filter(task => task.status !== "completed");

  // Función para manejar la creación de nuevo personal
  const handleCreateStaff = () => {
    toast({
      title: "Personal agregado",
      description: `${newStaff.name} ha sido agregado exitosamente.`,
    });
    setShowNewStaffDialog(false);
    // Aquí se implementaría la lógica para crear el personal en la base de datos
  };

  // Función para manejar la creación de nueva tarea
  const handleCreateTask = () => {
    toast({
      title: "Tarea creada",
      description: `La tarea "${newTask.title}" ha sido asignada.`,
    });
    setShowNewTaskDialog(false);
    // Aquí se implementaría la lógica para crear la tarea en la base de datos
  };

  // Función para manejar la creación de nuevo turno
  const handleCreateShift = () => {
    toast({
      title: "Turno programado",
      description: `El turno ha sido programado exitosamente.`,
    });
    setShowNewShiftDialog(false);
    // Aquí se implementaría la lógica para crear el turno en la base de datos
  };

  // Funciones para obtener textos y colores
  const getRoleLabel = (role: string) => {
    const roles: Record<string, string> = {
      "administrador": "Administrador",
      "gerente": "Gerente",
      "mesero": "Mesero",
      "cocina": "Cocina",
      "recepcion": "Recepción/Host",
      "repartidor": "Repartidor",
      "contabilidad": "Contabilidad"
    };
    return roles[role] || role;
  };

  const getStatusColor = (status: StaffMember["status"]) => {
    switch (status) {
      case "active": return "bg-restaurant-secondary/20 text-restaurant-secondary";
      case "inactive": return "bg-gray-100 text-gray-800";
      case "on-leave": return "bg-restaurant-accent/20 text-restaurant-accent";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: StaffMember["status"]) => {
    switch (status) {
      case "active": return "Activo";
      case "inactive": return "Inactivo";
      case "on-leave": return "Permiso";
      default: return "";
    }
  };

  const getShiftStatusColor = (status: Shift["status"]) => {
    switch (status) {
      case "scheduled": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-restaurant-secondary/20 text-restaurant-secondary";
      case "missed": return "bg-restaurant-danger/20 text-restaurant-danger";
      case "in-progress": return "bg-restaurant-accent/20 text-restaurant-accent";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getShiftStatusLabel = (status: Shift["status"]) => {
    switch (status) {
      case "scheduled": return "Programado";
      case "completed": return "Completado";
      case "missed": return "Ausente";
      case "in-progress": return "En progreso";
      default: return "";
    }
  };

  const getTaskPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "low": return "bg-blue-100 text-blue-800";
      case "medium": return "bg-restaurant-accent/20 text-restaurant-accent";
      case "high": return "bg-restaurant-danger/20 text-restaurant-danger";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTaskStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "pending": return "bg-gray-100 text-gray-800";
      case "completed": return "bg-restaurant-secondary/20 text-restaurant-secondary";
      case "in-progress": return "bg-restaurant-accent/20 text-restaurant-accent";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTaskStatusLabel = (status: Task["status"]) => {
    switch (status) {
      case "pending": return "Pendiente";
      case "completed": return "Completado";
      case "in-progress": return "En progreso";
      default: return "";
    }
  };

  // Obtener iniciales para avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Obtener color de avatar basado en el rol
  const getAvatarColor = (role: string) => {
    const colors: Record<string, string> = {
      "administrador": "bg-purple-500",
      "gerente": "bg-blue-500",
      "mesero": "bg-green-500",
      "cocina": "bg-yellow-500",
      "recepcion": "bg-pink-500",
      "repartidor": "bg-orange-500",
      "contabilidad": "bg-teal-500"
    };
    return colors[role] || "bg-gray-500";
  };

  return (
    <AppShell>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Personal</h1>
        <div className="space-x-2">
          <Button 
            variant="outline"
            onClick={() => setShowNewTaskDialog(true)}
          >
            Asignar Tarea
          </Button>
          <Button 
            variant="outline"
            onClick={() => setShowNewShiftDialog(true)}
          >
            Programar Turno
          </Button>
          <Button
            className="bg-restaurant-primary hover:bg-restaurant-primary/90"
            onClick={() => setShowNewStaffDialog(true)}
          >
            <UserPlus className="mr-2 h-4 w-4" /> Nuevo Personal
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        <Card className="lg:col-span-8">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" /> Personal
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input 
                  placeholder="Buscar personal..." 
                  className="pl-8 w-full sm:w-64 md:w-80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="todos" className="w-full" value={activeRole} onValueChange={setActiveRole}>
              <TabsList className="mb-4 w-full justify-start overflow-auto">
                <TabsTrigger value="todos">Todos</TabsTrigger>
                <TabsTrigger value="administrador">Administradores</TabsTrigger>
                <TabsTrigger value="gerente">Gerentes</TabsTrigger>
                <TabsTrigger value="mesero">Meseros</TabsTrigger>
                <TabsTrigger value="cocina">Cocina</TabsTrigger>
                <TabsTrigger value="recepcion">Recepción</TabsTrigger>
                <TabsTrigger value="repartidor">Repartidores</TabsTrigger>
                <TabsTrigger value="contabilidad">Contabilidad</TabsTrigger>
              </TabsList>
              
              <div className="rounded-md border overflow-hidden">
                <div className="grid grid-cols-12 gap-2 p-3 bg-gray-50 font-medium text-sm">
                  <div className="col-span-3">Nombre</div>
                  <div className="col-span-2">Rol</div>
                  <div className="col-span-3">Contacto</div>
                  <div className="col-span-2">Tarifa</div>
                  <div className="col-span-1">Estado</div>
                  <div className="col-span-1 text-right">Acciones</div>
                </div>
                
                {filteredStaff.length > 0 ? (
                  filteredStaff.map((member) => (
                    <div key={member.id} className="grid grid-cols-12 gap-2 p-3 border-t items-center">
                      <div className="col-span-3 flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${getAvatarColor(member.role)}`}>
                          {getInitials(member.name)}
                        </div>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-xs text-gray-500">Desde {member.startDate}</div>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <Badge variant="outline">{getRoleLabel(member.role)}</Badge>
                      </div>
                      <div className="col-span-3">
                        <div className="text-sm">{member.email}</div>
                        <div className="text-xs text-gray-500">{member.phone}</div>
                      </div>
                      <div className="col-span-2">${member.hourlyRate.toFixed(2)}/hora</div>
                      <div className="col-span-1">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                          {getStatusLabel(member.status)}
                        </span>
                      </div>
                      <div className="col-span-1 text-right">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-40 p-0" align="end">
                            <div className="p-1">
                              <Button variant="ghost" size="sm" className="w-full justify-start text-left">
                                <FileBarChart2 className="mr-2 h-4 w-4" /> Ver perfil
                              </Button>
                              <Button variant="ghost" size="sm" className="w-full justify-start text-left">
                                <Clock className="mr-2 h-4 w-4" /> Turnos
                              </Button>
                              <Button variant="ghost" size="sm" className="w-full justify-start text-left">
                                <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-gray-500">No se encontró personal que coincida con los criterios de búsqueda.</p>
                  </div>
                )}
              </div>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="lg:col-span-4">
          <Tabs defaultValue="turnos">
            <CardHeader className="pb-0">
              <div className="flex justify-between items-center">
                <CardTitle>Horarios y Tareas</CardTitle>
                <TabsList>
                  <TabsTrigger value="turnos">Turnos</TabsTrigger>
                  <TabsTrigger value="tareas">Tareas</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value="turnos" className="mt-3">
                <div className="space-y-3">
                  <div className="font-medium text-sm flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Turnos de hoy
                  </div>
                  <div className="space-y-3">
                    {todayShifts.map((shift) => {
                      const staffMember = staff.find(s => s.id === shift.staffId);
                      return (
                        <div key={shift.id} className="border rounded-lg p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">{staffMember?.name}</div>
                              <div className="text-sm text-gray-500">{getRoleLabel(shift.position)}</div>
                              <div className="text-xs mt-1">
                                {shift.startTime} - {shift.endTime}
                              </div>
                            </div>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getShiftStatusColor(shift.status)}`}>
                              {getShiftStatusLabel(shift.status)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                    {todayShifts.length === 0 && (
                      <div className="text-center py-4">
                        <Clock className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                        <p className="text-gray-500">No hay turnos programados para hoy</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="tareas" className="mt-3">
                <div className="space-y-3">
                  <div className="font-medium text-sm flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" /> Tareas pendientes
                  </div>
                  <div className="space-y-3">
                    {pendingTasks.map((task) => {
                      const staffMember = staff.find(s => s.id === task.staffId);
                      return (
                        <div key={task.id} className="border rounded-lg p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">{task.title}</div>
                              <div className="text-sm text-gray-500">Asignado a: {staffMember?.name}</div>
                              {task.description && (
                                <div className="text-xs mt-1">{task.description}</div>
                              )}
                            </div>
                            <div className="flex flex-col items-end gap-1">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTaskStatusColor(task.status)}`}>
                                {getTaskStatusLabel(task.status)}
                              </span>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTaskPriorityColor(task.priority)}`}>
                                {task.priority === "high" ? "Alta" : task.priority === "medium" ? "Media" : "Baja"}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    {pendingTasks.length === 0 && (
                      <div className="text-center py-4">
                        <CheckCircle2 className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                        <p className="text-gray-500">No hay tareas pendientes</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>

      {/* Nuevo Personal Dialog */}
      <Dialog open={showNewStaffDialog} onOpenChange={setShowNewStaffDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Agregar Nuevo Personal</DialogTitle>
            <DialogDescription>
              Ingresa los datos del nuevo miembro del personal.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="name">Nombre completo</Label>
                <Input
                  id="name"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                  placeholder="Nombre y apellidos"
                />
              </div>
              
              <div className="col-span-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                  placeholder="email@restaurante.com"
                />
              </div>
              
              <div className="col-span-1">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  value={newStaff.phone}
                  onChange={(e) => setNewStaff({...newStaff, phone: e.target.value})}
                  placeholder="555-123-4567"
                />
              </div>
              
              <div className="col-span-1">
                <Label htmlFor="role">Rol</Label>
                <Select 
                  value={newStaff.role} 
                  onValueChange={(value) => setNewStaff({...newStaff, role: value})}
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Seleccionar rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="administrador">Administrador</SelectItem>
                    <SelectItem value="gerente">Gerente</SelectItem>
                    <SelectItem value="mesero">Mesero</SelectItem>
                    <SelectItem value="cocina">Cocina</SelectItem>
                    <SelectItem value="recepcion">Recepción/Host</SelectItem>
                    <SelectItem value="repartidor">Repartidor</SelectItem>
                    <SelectItem value="contabilidad">Contabilidad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="col-span-1">
                <Label htmlFor="status">Estado</Label>
                <Select 
                  value={newStaff.status} 
                  onValueChange={(value: StaffMember["status"]) => setNewStaff({...newStaff, status: value})}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="inactive">Inactivo</SelectItem>
                    <SelectItem value="on-leave">Permiso</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="col-span-1">
                <Label htmlFor="hourlyRate">Tarifa por hora ($)</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  step="0.5"
                  value={newStaff.hourlyRate}
                  onChange={(e) => setNewStaff({...newStaff, hourlyRate: Number(e.target.value)})}
                />
              </div>
              
              <div className="col-span-1">
                <Label htmlFor="startDate">Fecha de inicio</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newStaff.startDate}
                  onChange={(e) => setNewStaff({...newStaff, startDate: e.target.value})}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewStaffDialog(false)}>
              Cancelar
            </Button>
            <Button
              className="bg-restaurant-primary hover:bg-restaurant-primary/90"
              onClick={handleCreateStaff}
            >
              Agregar Personal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Nueva Tarea Dialog */}
      <Dialog open={showNewTaskDialog} onOpenChange={setShowNewTaskDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Asignar Nueva Tarea</DialogTitle>
            <DialogDescription>
              Crea una tarea y asígnala a un miembro del personal.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="task-title">Título de la tarea</Label>
                <Input
                  id="task-title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  placeholder="Ej: Limpiar mesa 5"
                />
              </div>
              
              <div>
                <Label htmlFor="task-staff">Asignar a</Label>
                <Select 
                  value={newTask.staffId?.toString() || ""} 
                  onValueChange={(value) => setNewTask({...newTask, staffId: Number(value)})}
                >
                  <SelectTrigger id="task-staff">
                    <SelectValue placeholder="Seleccionar personal" />
                  </SelectTrigger>
                  <SelectContent>
                    {staff
                      .filter(member => member.status === "active")
                      .map((member) => (
                        <SelectItem key={member.id} value={member.id.toString()}>
                          {member.name} ({getRoleLabel(member.role)})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="task-description">Descripción (opcional)</Label>
                <Input
                  id="task-description"
                  value={newTask.description || ""}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  placeholder="Instrucciones adicionales"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="task-priority">Prioridad</Label>
                  <Select 
                    value={newTask.priority} 
                    onValueChange={(value: Task["priority"]) => setNewTask({...newTask, priority: value})}
                  >
                    <SelectTrigger id="task-priority">
                      <SelectValue placeholder="Seleccionar prioridad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baja</SelectItem>
                      <SelectItem value="medium">Media</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="task-dueDate">Fecha límite (opcional)</Label>
                  <Input
                    id="task-dueDate"
                    type="datetime-local"
                    value={newTask.dueDate?.split("Z")[0] || ""}
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewTaskDialog(false)}>
              Cancelar
            </Button>
            <Button
              className="bg-restaurant-primary hover:bg-restaurant-primary/90"
              onClick={handleCreateTask}
              disabled={!newTask.title || !newTask.staffId}
            >
              Asignar Tarea
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Nuevo Turno Dialog */}
      <Dialog open={showNewShiftDialog} onOpenChange={setShowNewShiftDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Programar Nuevo Turno</DialogTitle>
            <DialogDescription>
              Programa un turno para un miembro del personal.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="shift-staff">Personal</Label>
                <Select 
                  value={newShift.staffId?.toString() || ""} 
                  onValueChange={(value) => {
                    const staffId = Number(value);
                    const staffMember = staff.find(s => s.id === staffId);
                    setNewShift({
                      ...newShift, 
                      staffId: staffId,
                      position: staffMember?.role || ""
                    });
                  }}
                >
                  <SelectTrigger id="shift-staff">
                    <SelectValue placeholder="Seleccionar personal" />
                  </SelectTrigger>
                  <SelectContent>
                    {staff
                      .filter(member => member.status === "active")
                      .map((member) => (
                        <SelectItem key={member.id} value={member.id.toString()}>
                          {member.name} ({getRoleLabel(member.role)})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="shift-date">Fecha</Label>
                <Input
                  id="shift-date"
                  type="date"
                  value={newShift.date}
                  onChange={(e) => setNewShift({...newShift, date: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="shift-startTime">Hora inicio</Label>
                  <Input
                    id="shift-startTime"
                    type="time"
                    value={newShift.startTime}
                    onChange={(e) => setNewShift({...newShift, startTime: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="shift-endTime">Hora fin</Label>
                  <Input
                    id="shift-endTime"
                    type="time"
                    value={newShift.endTime}
                    onChange={(e) => setNewShift({...newShift, endTime: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="shift-position">Posición</Label>
                <Select 
                  value={newShift.position} 
                  onValueChange={(value) => setNewShift({...newShift, position: value})}
                >
                  <SelectTrigger id="shift-position">
                    <SelectValue placeholder="Seleccionar posición" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="administrador">Administrador</SelectItem>
                    <SelectItem value="gerente">Gerente</SelectItem>
                    <SelectItem value="mesero">Mesero</SelectItem>
                    <SelectItem value="cocina">Cocina</SelectItem>
                    <SelectItem value="recepcion">Recepción/Host</SelectItem>
                    <SelectItem value="repartidor">Repartidor</SelectItem>
                    <SelectItem value="contabilidad">Contabilidad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewShiftDialog(false)}>
              Cancelar
            </Button>
            <Button
              className="bg-restaurant-primary hover:bg-restaurant-primary/90"
              onClick={handleCreateShift}
              disabled={!newShift.staffId || !newShift.date || !newShift.startTime || !newShift.endTime || !newShift.position}
            >
              Programar Turno
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

export default Staff;
