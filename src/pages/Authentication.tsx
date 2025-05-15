
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { LogIn, UserPlus } from "lucide-react";

const Authentication = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Estado para formularios
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerRole, setRegisterRole] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Aquí se implementará la lógica de autenticación con Supabase
      console.log("Iniciando sesión con:", loginEmail);
      
      // Simular inicio de sesión exitoso
      setTimeout(() => {
        toast({
          title: "Inicio de sesión exitoso",
          description: "Bienvenido al sistema administrativo",
        });
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      toast({
        title: "Error al iniciar sesión",
        description: "Credenciales incorrectas",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerPassword !== registerConfirmPassword) {
      toast({
        title: "Las contraseñas no coinciden",
        description: "Por favor verifica que ambas contraseñas sean iguales",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Aquí se implementará el registro con Supabase
      console.log("Registrando usuario:", { registerEmail, registerName, registerRole });
      
      // Simular registro exitoso
      setTimeout(() => {
        toast({
          title: "Registro exitoso",
          description: "Tu cuenta ha sido creada. Un administrador debe aprobarla.",
        });
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error al registrar:", error);
      toast({
        title: "Error al registrar",
        description: "No se pudo crear la cuenta",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-4">
        <div className="text-center mb-6">
          <div className="inline-block bg-restaurant-primary rounded-md p-2 mb-2">
            <span className="text-white font-bold text-2xl">R</span>
          </div>
          <h1 className="text-2xl font-bold">RestaurantOS</h1>
          <p className="text-gray-500">Sistema Administrativo para Restaurantes</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Bienvenido</CardTitle>
            <CardDescription>
              Inicia sesión con tu cuenta o regístrate para acceder al sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="login">Iniciar sesión</TabsTrigger>
                <TabsTrigger value="register">Registrarse</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Contraseña</Label>
                      <a href="#" className="text-xs text-restaurant-primary hover:underline">
                        ¿Olvidaste tu contraseña?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-restaurant-primary hover:bg-restaurant-primary/90"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Procesando...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <LogIn className="mr-2 h-4 w-4" /> Iniciar sesión
                      </span>
                    )}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Nombre completo</Label>
                    <Input
                      id="register-name"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      placeholder="Juan Pérez"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Correo electrónico</Label>
                    <Input
                      id="register-email"
                      type="email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Contraseña</Label>
                    <Input
                      id="register-password"
                      type="password"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm-password">Confirmar contraseña</Label>
                    <Input
                      id="register-confirm-password"
                      type="password"
                      value={registerConfirmPassword}
                      onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-role">Rol</Label>
                    <Select value={registerRole} onValueChange={setRegisterRole} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un rol" />
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
                  <Button 
                    type="submit" 
                    className="w-full bg-restaurant-primary hover:bg-restaurant-primary/90"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Procesando...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <UserPlus className="mr-2 h-4 w-4" /> Registrarse
                      </span>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-4">
            <p className="text-sm text-gray-500">© 2025 RestaurantOS. Todos los derechos reservados.</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Authentication;
