
import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Settings as SettingsIcon, CreditCard, User, LogOut, Database, Lock, Mail, MessageSquare, GlobeLock, Table, Building, Upload, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const Settings = () => {
  const { toast } = useToast();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState<string>("");
  
  // Estados para configuraciones
  const [appName, setAppName] = useState("RestaurantOS");
  const [appLogo, setAppLogo] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#1E40AF");
  const [secondaryColor, setSecondaryColor] = useState("#10B981");
  const [language, setLanguage] = useState("es");
  const [timezone, setTimezone] = useState("America/Mexico_City");
  const [currency, setCurrency] = useState("MXN");
  const [taxRate, setTaxRate] = useState(16);
  
  // Estados para notificaciones
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [inventoryAlerts, setInventoryAlerts] = useState(true);
  const [reservationAlerts, setReservationAlerts] = useState(true);
  
  // Estados para configuración de mesas
  const [tableLayout, setTableLayout] = useState([
    { id: 1, section: "ventana", tables: 6 },
    { id: 2, section: "centro", tables: 8 },
    { id: 3, section: "terraza", tables: 10 },
    { id: 4, section: "privado", tables: 4 },
    { id: 5, section: "barra", tables: 6 },
  ]);
  
  // Manejar guardado de configuración
  const handleSaveSettings = () => {
    toast({
      title: "Configuración guardada",
      description: "Los cambios han sido guardados correctamente.",
    });
  };
  
  // Manejar restauración de configuración por defecto
  const handleResetSettings = () => {
    // En lugar de hacerlo directamente, mostramos un diálogo de confirmación
    setConfirmAction("reset");
    setShowConfirmDialog(true);
  };
  
  // Manejar exportación de la base de datos
  const handleExportDatabase = () => {
    toast({
      title: "Base de datos exportada",
      description: "La base de datos ha sido exportada correctamente.",
    });
  };
  
  // Manejar la eliminación de datos
  const handleDeleteData = () => {
    // Mostrar diálogo de confirmación
    setConfirmAction("delete");
    setShowConfirmDialog(true);
  };
  
  // Manejar la confirmación de acciones destructivas
  const handleConfirmAction = () => {
    if (confirmAction === "reset") {
      // Aquí restauramos los valores por defecto
      setAppName("RestaurantOS");
      setPrimaryColor("#1E40AF");
      setSecondaryColor("#10B981");
      setLanguage("es");
      setTimezone("America/Mexico_City");
      setCurrency("MXN");
      setTaxRate(16);
      
      toast({
        title: "Configuración restablecida",
        description: "Se ha restaurado la configuración por defecto.",
      });
    } else if (confirmAction === "delete") {
      toast({
        title: "Datos eliminados",
        description: "Todos los datos han sido eliminados correctamente.",
      });
    }
    
    setShowConfirmDialog(false);
  };

  return (
    <AppShell>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Configuración</h1>
        <div className="space-x-2">
          <Button 
            variant="outline"
            onClick={handleResetSettings}
          >
            Restaurar
          </Button>
          <Button
            className="bg-restaurant-primary hover:bg-restaurant-primary/90"
            onClick={handleSaveSettings}
          >
            Guardar cambios
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="sm:w-64">
            <TabsList className="flex flex-col w-full h-auto p-0 bg-transparent space-y-1">
              <TabsTrigger 
                value="general" 
                className="flex justify-start px-3 py-2 h-auto data-[state=active]:bg-muted w-full"
              >
                <SettingsIcon className="mr-2 h-5 w-5" />
                <span>General</span>
              </TabsTrigger>
              <TabsTrigger 
                value="usuario" 
                className="flex justify-start px-3 py-2 h-auto data-[state=active]:bg-muted w-full"
              >
                <User className="mr-2 h-5 w-5" />
                <span>Usuario y Seguridad</span>
              </TabsTrigger>
              <TabsTrigger 
                value="notificaciones" 
                className="flex justify-start px-3 py-2 h-auto data-[state=active]:bg-muted w-full"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                <span>Notificaciones</span>
              </TabsTrigger>
              <TabsTrigger 
                value="pagos" 
                className="flex justify-start px-3 py-2 h-auto data-[state=active]:bg-muted w-full"
              >
                <CreditCard className="mr-2 h-5 w-5" />
                <span>Pagos e Impuestos</span>
              </TabsTrigger>
              <TabsTrigger 
                value="integraciones" 
                className="flex justify-start px-3 py-2 h-auto data-[state=active]:bg-muted w-full"
              >
                <GlobeLock className="mr-2 h-5 w-5" />
                <span>Integraciones</span>
              </TabsTrigger>
              <TabsTrigger 
                value="mesas" 
                className="flex justify-start px-3 py-2 h-auto data-[state=active]:bg-muted w-full"
              >
                <Table className="mr-2 h-5 w-5" />
                <span>Mesas y Secciones</span>
              </TabsTrigger>
              <TabsTrigger 
                value="negocio" 
                className="flex justify-start px-3 py-2 h-auto data-[state=active]:bg-muted w-full"
              >
                <Building className="mr-2 h-5 w-5" />
                <span>Información del Negocio</span>
              </TabsTrigger>
              <TabsTrigger 
                value="datos" 
                className="flex justify-start px-3 py-2 h-auto data-[state=active]:bg-muted w-full"
              >
                <Database className="mr-2 h-5 w-5" />
                <span>Datos y Backups</span>
              </TabsTrigger>
            </TabsList>
            
            <Separator className="my-4" />
            
            <Button variant="ghost" className="w-full justify-start text-restaurant-danger">
              <LogOut className="mr-2 h-5 w-5" />
              <span>Cerrar sesión</span>
            </Button>
          </div>
          
          <div className="flex-1">
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>Configuración General</CardTitle>
                  <CardDescription>
                    Personaliza la apariencia y la configuración general del sistema
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="app-name">Nombre de la aplicación</Label>
                      <Input 
                        id="app-name" 
                        value={appName}
                        onChange={(e) => setAppName(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="app-logo">Logo</Label>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                          {appLogo ? (
                            <img src={appLogo} alt="Logo" className="w-12 h-12 object-contain" />
                          ) : (
                            <div className="bg-restaurant-primary rounded-md p-2">
                              <span className="text-white font-bold text-xl">R</span>
                            </div>
                          )}
                        </div>
                        <Button variant="outline" className="flex gap-2">
                          <Upload className="h-4 w-4" /> Subir logo
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="primary-color">Color primario</Label>
                        <div className="flex gap-2">
                          <Input 
                            id="primary-color" 
                            value={primaryColor}
                            onChange={(e) => setPrimaryColor(e.target.value)}
                          />
                          <Input
                            type="color"
                            value={primaryColor}
                            onChange={(e) => setPrimaryColor(e.target.value)}
                            className="w-10 p-1 h-10"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="secondary-color">Color secundario</Label>
                        <div className="flex gap-2">
                          <Input 
                            id="secondary-color" 
                            value={secondaryColor}
                            onChange={(e) => setSecondaryColor(e.target.value)}
                          />
                          <Input
                            type="color"
                            value={secondaryColor}
                            onChange={(e) => setSecondaryColor(e.target.value)}
                            className="w-10 p-1 h-10"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="language">Idioma</Label>
                        <Select value={language} onValueChange={setLanguage}>
                          <SelectTrigger id="language">
                            <SelectValue placeholder="Seleccionar idioma" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="es">Español</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="fr">Français</SelectItem>
                            <SelectItem value="pt">Português</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Zona horaria</Label>
                        <Select value={timezone} onValueChange={setTimezone}>
                          <SelectTrigger id="timezone">
                            <SelectValue placeholder="Seleccionar zona horaria" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="America/Mexico_City">Ciudad de México (GMT-6)</SelectItem>
                            <SelectItem value="America/Bogota">Bogotá (GMT-5)</SelectItem>
                            <SelectItem value="America/Santiago">Santiago (GMT-4)</SelectItem>
                            <SelectItem value="America/Buenos_Aires">Buenos Aires (GMT-3)</SelectItem>
                            <SelectItem value="Europe/Madrid">Madrid (GMT+1)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="currency">Moneda</Label>
                        <Select value={currency} onValueChange={setCurrency}>
                          <SelectTrigger id="currency">
                            <SelectValue placeholder="Seleccionar moneda" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="MXN">Peso mexicano (MXN)</SelectItem>
                            <SelectItem value="USD">Dólar estadounidense (USD)</SelectItem>
                            <SelectItem value="EUR">Euro (EUR)</SelectItem>
                            <SelectItem value="COP">Peso colombiano (COP)</SelectItem>
                            <SelectItem value="ARS">Peso argentino (ARS)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleResetSettings}>Restaurar valores</Button>
                  <Button className="bg-restaurant-primary hover:bg-restaurant-primary/90" onClick={handleSaveSettings}>Guardar</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="usuario">
              <Card>
                <CardHeader>
                  <CardTitle>Usuario y Seguridad</CardTitle>
                  <CardDescription>
                    Administra tu cuenta y ajusta la configuración de seguridad
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-restaurant-primary flex items-center justify-center text-white text-2xl font-bold">
                      A
                    </div>
                    <div>
                      <div className="font-medium text-lg">Admin User</div>
                      <div className="text-sm text-gray-500">admin@restaurantos.com</div>
                      <div className="mt-1">
                        <Badge>Administrador</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo electrónico</Label>
                      <Input id="email" value="admin@restaurantos.com" disabled />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input id="name" value="Admin" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Apellido</Label>
                        <Input id="last-name" value="User" />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <div className="font-medium">Seguridad</div>
                      <Button variant="outline" className="w-full justify-start">
                        <Lock className="mr-2 h-4 w-4" /> Cambiar contraseña
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Lock className="mr-2 h-4 w-4" /> Activar autenticación de dos factores
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <div className="font-medium mb-2">Sesiones activas</div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 border rounded-md">
                          <div>
                            <div className="font-medium">Chrome en Windows</div>
                            <div className="text-sm text-gray-500">Última actividad: hace 5 minutos</div>
                          </div>
                          <Badge variant="outline" className="bg-restaurant-secondary/20 text-restaurant-secondary">
                            Actual
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 border rounded-md">
                          <div>
                            <div className="font-medium">Safari en iPhone</div>
                            <div className="text-sm text-gray-500">Última actividad: hace 2 días</div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-restaurant-danger hover:text-restaurant-danger/80">
                            Cerrar
                          </Button>
                        </div>
                      </div>
                      <Button variant="outline" className="mt-3">
                        Cerrar todas las sesiones
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button className="bg-restaurant-primary hover:bg-restaurant-primary/90" onClick={handleSaveSettings}>Guardar</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="notificaciones">
              <Card>
                <CardHeader>
                  <CardTitle>Configuración de Notificaciones</CardTitle>
                  <CardDescription>
                    Personaliza cómo y cuándo recibes notificaciones
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Notificaciones por correo electrónico</div>
                        <div className="text-sm text-gray-500">Recibe actualizaciones importantes en tu bandeja de entrada</div>
                      </div>
                      <Switch 
                        checked={emailNotifications} 
                        onCheckedChange={setEmailNotifications} 
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Notificaciones push</div>
                        <div className="text-sm text-gray-500">Recibe alertas en tiempo real en tu navegador</div>
                      </div>
                      <Switch 
                        checked={pushNotifications} 
                        onCheckedChange={setPushNotifications} 
                      />
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <div className="font-medium mb-3">Configuración por tipo de notificación</div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Alertas de inventario bajo</div>
                            <div className="text-sm text-gray-500">Cuando un producto está por agotarse</div>
                          </div>
                          <Switch 
                            checked={inventoryAlerts} 
                            onCheckedChange={setInventoryAlerts} 
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Notificaciones de reservas</div>
                            <div className="text-sm text-gray-500">Nuevas reservas y cambios en reservaciones</div>
                          </div>
                          <Switch 
                            checked={reservationAlerts} 
                            onCheckedChange={setReservationAlerts} 
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Informes de fin de día</div>
                            <div className="text-sm text-gray-500">Resumen diario de ventas y actividad</div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Mensajes internos</div>
                            <div className="text-sm text-gray-500">Comunicaciones del equipo y tareas asignadas</div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <div className="font-medium mb-3">Canales de notificación</div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Input id="email-address" placeholder="correo@ejemplo.com" defaultValue="admin@restaurantos.com" />
                          <Button variant="outline"><Mail className="h-4 w-4" /></Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input id="phone-number" placeholder="Número de teléfono" defaultValue="+52 555 123 4567" />
                          <Button variant="outline"><MessageSquare className="h-4 w-4" /></Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button className="bg-restaurant-primary hover:bg-restaurant-primary/90" onClick={handleSaveSettings}>Guardar</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="pagos">
              <Card>
                <CardHeader>
                  <CardTitle>Pagos e Impuestos</CardTitle>
                  <CardDescription>
                    Configura métodos de pago, impuestos y facturación
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="tax-rate">Tasa de impuestos (%)</Label>
                      <Input 
                        id="tax-rate" 
                        type="number" 
                        value={taxRate}
                        onChange={(e) => setTaxRate(Number(e.target.value))}
                      />
                      <p className="text-sm text-gray-500">Porcentaje de impuesto aplicado a las ventas</p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <div className="font-medium mb-3">Métodos de pago aceptados</div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Efectivo</div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Tarjetas de crédito/débito</div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Transferencia bancaria</div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">PayPal</div>
                          </div>
                          <Switch />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Mercado Pago</div>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <div className="font-medium mb-3">Integración con Stripe</div>
                      <div className="rounded-md border p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <img src="https://www.vectorlogo.zone/logos/stripe/stripe-ar21.svg" alt="Stripe" className="h-8" />
                            <Badge variant="outline" className="bg-amber-100 text-amber-800">No conectado</Badge>
                          </div>
                          <Button className="bg-restaurant-primary hover:bg-restaurant-primary/90">Conectar</Button>
                        </div>
                        <div className="text-sm">
                          <p>Conecta tu cuenta de Stripe para procesar pagos con tarjeta directamente.</p>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <div className="font-medium mb-3">Facturación</div>
                      <div className="space-y-2">
                        <Label htmlFor="business-name">Nombre fiscal</Label>
                        <Input id="business-name" placeholder="Razón social" defaultValue="Restaurante Ejemplo, S.A. de C.V." />
                      </div>
                      <div className="space-y-2 mt-3">
                        <Label htmlFor="tax-id">RFC / NIT</Label>
                        <Input id="tax-id" placeholder="Identificación fiscal" defaultValue="REST123456ABC" />
                      </div>
                      <div className="space-y-2 mt-3">
                        <Label htmlFor="tax-address">Domicilio fiscal</Label>
                        <Input id="tax-address" placeholder="Dirección fiscal" defaultValue="Av. Principal 123, Ciudad" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button className="bg-restaurant-primary hover:bg-restaurant-primary/90" onClick={handleSaveSettings}>Guardar</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="integraciones">
              <Card>
                <CardHeader>
                  <CardTitle>Integraciones</CardTitle>
                  <CardDescription>
                    Conecta tu restaurante con servicios externos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <img src="https://logos-world.net/wp-content/uploads/2021/03/Stripe-Logo.png" alt="Stripe" className="h-8" />
                          <Badge variant="outline" className="bg-amber-100 text-amber-800">No conectado</Badge>
                        </div>
                        <Button className="bg-restaurant-primary hover:bg-restaurant-primary/90">Conectar</Button>
                      </div>
                      <div className="text-sm">
                        <p>Procesa pagos con tarjeta y gestiona suscripciones.</p>
                      </div>
                    </div>
                    
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg" alt="Slack" className="h-8" />
                          <Badge variant="outline" className="bg-green-100 text-green-800">Conectado</Badge>
                        </div>
                        <Button variant="outline">Configurar</Button>
                      </div>
                      <div className="text-sm">
                        <p>Recibe notificaciones y alertas en tu espacio de trabajo de Slack.</p>
                      </div>
                    </div>
                    
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/7/73/Quickbooks-Logo.png" alt="QuickBooks" className="h-8" />
                          <Badge variant="outline" className="bg-amber-100 text-amber-800">No conectado</Badge>
                        </div>
                        <Button className="bg-restaurant-primary hover:bg-restaurant-primary/90">Conectar</Button>
                      </div>
                      <div className="text-sm">
                        <p>Sincroniza tus ventas y gastos con tu sistema de contabilidad.</p>
                      </div>
                    </div>
                    
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Google_Business_Profile_%28cropped%29.svg" alt="Google Business" className="h-8" />
                          <Badge variant="outline" className="bg-amber-100 text-amber-800">No conectado</Badge>
                        </div>
                        <Button className="bg-restaurant-primary hover:bg-restaurant-primary/90">Conectar</Button>
                      </div>
                      <div className="text-sm">
                        <p>Gestiona reservas y reseñas desde Google My Business.</p>
                      </div>
                    </div>
                    
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/5/56/Twilio_logo.svg" alt="Twilio" className="h-8" />
                          <Badge variant="outline" className="bg-amber-100 text-amber-800">No conectado</Badge>
                        </div>
                        <Button className="bg-restaurant-primary hover:bg-restaurant-primary/90">Conectar</Button>
                      </div>
                      <div className="text-sm">
                        <p>Envía SMS y notificaciones por WhatsApp a clientes.</p>
                      </div>
                    </div>
                    
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Tableau_logo.svg" alt="Tableau" className="h-8" />
                          <Badge variant="outline" className="bg-amber-100 text-amber-800">No conectado</Badge>
                        </div>
                        <Button className="bg-restaurant-primary hover:bg-restaurant-primary/90">Conectar</Button>
                      </div>
                      <div className="text-sm">
                        <p>Conecta tus datos con herramientas de BI para análisis avanzados.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="mesas">
              <Card>
                <CardHeader>
                  <CardTitle>Mesas y Secciones</CardTitle>
                  <CardDescription>
                    Configura las secciones del restaurante y la disposición de mesas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="font-medium">Secciones del restaurante</div>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-12 gap-2 p-3 bg-gray-50 font-medium text-sm">
                        <div className="col-span-6">Nombre de la sección</div>
                        <div className="col-span-4 text-center">Número de mesas</div>
                        <div className="col-span-2 text-center">Acciones</div>
                      </div>
                      
                      {tableLayout.map((section) => (
                        <div key={section.id} className="grid grid-cols-12 gap-2 p-3 border-t items-center">
                          <div className="col-span-6 font-medium capitalize">{section.section}</div>
                          <div className="col-span-4 text-center">{section.tables}</div>
                          <div className="col-span-2 text-center">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <SettingsIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button className="bg-restaurant-primary hover:bg-restaurant-primary/90">
                      Agregar sección
                    </Button>
                    
                    <Separator />
                    
                    <div>
                      <div className="font-medium mb-3">Editor visual del plano</div>
                      <div className="rounded-md border p-16 flex items-center justify-center bg-gray-50">
                        <div className="text-center">
                          <div className="mb-2 text-gray-500">El editor visual está en desarrollo</div>
                          <Button variant="outline">Abrir editor</Button>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Asignación automática de mesas</div>
                          <div className="text-sm text-gray-500">El sistema asignará mesas automáticamente según el tamaño del grupo</div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Reservas online</div>
                          <div className="text-sm text-gray-500">Permitir que los clientes reserven mesas online</div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Tiempo de reserva predeterminado</div>
                          <div className="text-sm text-gray-500">Tiempo asignado para cada reserva</div>
                        </div>
                        <Select defaultValue="90">
                          <SelectTrigger className="w-28">
                            <SelectValue placeholder="Minutos" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="60">60 min</SelectItem>
                            <SelectItem value="90">90 min</SelectItem>
                            <SelectItem value="120">120 min</SelectItem>
                            <SelectItem value="150">150 min</SelectItem>
                            <SelectItem value="180">180 min</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button className="bg-restaurant-primary hover:bg-restaurant-primary/90" onClick={handleSaveSettings}>Guardar</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="negocio">
              <Card>
                <CardHeader>
                  <CardTitle>Información del Negocio</CardTitle>
                  <CardDescription>
                    Actualiza la información de tu restaurante
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="business-name">Nombre del restaurante</Label>
                      <Input id="business-name" defaultValue="Restaurante Ejemplo" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="business-phone">Teléfono</Label>
                        <Input id="business-phone" defaultValue="+52 555 123 4567" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="business-email">Correo electrónico</Label>
                        <Input id="business-email" defaultValue="contacto@restaurante-ejemplo.com" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="business-address">Dirección</Label>
                      <Input id="business-address" defaultValue="Av. Principal 123" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="business-city">Ciudad</Label>
                        <Input id="business-city" defaultValue="Ciudad Ejemplo" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="business-state">Estado/Provincia</Label>
                        <Input id="business-state" defaultValue="Estado Ejemplo" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="business-zip">Código postal</Label>
                        <Input id="business-zip" defaultValue="12345" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="business-country">País</Label>
                      <Select defaultValue="MX">
                        <SelectTrigger id="business-country">
                          <SelectValue placeholder="Seleccionar país" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MX">México</SelectItem>
                          <SelectItem value="CO">Colombia</SelectItem>
                          <SelectItem value="AR">Argentina</SelectItem>
                          <SelectItem value="ES">España</SelectItem>
                          <SelectItem value="US">Estados Unidos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <div className="font-medium mb-3">Horario de operación</div>
                      <div className="space-y-2">
                        {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((day) => (
                          <div key={day} className="flex items-center justify-between">
                            <div className="font-medium w-24">{day}</div>
                            <div className="flex items-center gap-2">
                              <Input type="time" defaultValue="11:00" className="w-24" />
                              <span>a</span>
                              <Input type="time" defaultValue="23:00" className="w-24" />
                              <Switch defaultChecked={day !== "Domingo"} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <Label htmlFor="business-description">Descripción del restaurante</Label>
                      <textarea 
                        id="business-description"
                        className="w-full h-24 px-3 py-2 border rounded-md"
                        defaultValue="Restaurante de comida internacional con un ambiente acogedor y servicio de primera calidad."
                      ></textarea>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="business-website">Sitio web</Label>
                      <Input id="business-website" defaultValue="https://www.restaurante-ejemplo.com" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Redes sociales</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <Label htmlFor="business-facebook" className="text-xs">Facebook</Label>
                          <Input id="business-facebook" defaultValue="restauranteejemplo" />
                        </div>
                        
                        <div className="space-y-1">
                          <Label htmlFor="business-instagram" className="text-xs">Instagram</Label>
                          <Input id="business-instagram" defaultValue="@restaurante_ejemplo" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button className="bg-restaurant-primary hover:bg-restaurant-primary/90" onClick={handleSaveSettings}>Guardar</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="datos">
              <Card>
                <CardHeader>
                  <CardTitle>Datos y Backups</CardTitle>
                  <CardDescription>
                    Gestiona tus datos, exporta backups e importa información
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="rounded-md border p-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">Base de datos</div>
                        <Badge variant="outline" className="bg-green-100 text-green-800">Conectado</Badge>
                      </div>
                      <div className="text-sm text-gray-500 mb-4">
                        <p>Tu aplicación está conectada a Supabase para almacenamiento de datos.</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={handleExportDatabase}>
                          <Download className="mr-2 h-4 w-4" /> Exportar datos
                        </Button>
                        <Button variant="outline">
                          <Upload className="mr-2 h-4 w-4" /> Importar datos
                        </Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <div className="font-medium mb-3">Backups automáticos</div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Backups diarios</div>
                            <div className="text-sm text-gray-500">Se guardarán los últimos 7 días</div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Backups semanales</div>
                            <div className="text-sm text-gray-500">Se guardarán las últimas 4 semanas</div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Backups mensuales</div>
                            <div className="text-sm text-gray-500">Se guardarán los últimos 12 meses</div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="rounded-md border p-4">
                      <div className="font-medium mb-2 text-restaurant-danger">Zona de peligro</div>
                      <div className="text-sm text-gray-500 mb-4">
                        <p>Estas acciones no se pueden deshacer. Ten cuidado.</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" className="border-restaurant-danger text-restaurant-danger hover:bg-restaurant-danger/10" onClick={() => handleDeleteData()}>
                          <Trash2 className="mr-2 h-4 w-4" /> Eliminar todos los datos
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>

      {/* Diálogo de confirmación */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar acción</DialogTitle>
            <DialogDescription>
              {confirmAction === "reset" 
                ? "¿Estás seguro de que deseas restablecer la configuración a los valores predeterminados? Esta acción no se puede deshacer."
                : "¿Estás seguro de que deseas eliminar todos los datos? Esta acción no se puede deshacer."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancelar
            </Button>
            <Button 
              variant="destructive"
              onClick={handleConfirmAction}
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
};

export default Settings;
