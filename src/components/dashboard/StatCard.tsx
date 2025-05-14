
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

export default function StatCard({ title, value, description, icon, trend, trendValue }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        <div className="bg-primary/10 p-2 rounded-full">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
        {trend && trendValue && (
          <div className="flex items-center mt-2">
            <span 
              className={`text-xs font-medium ${
                trend === "up" 
                  ? "text-restaurant-secondary" 
                  : trend === "down" 
                    ? "text-restaurant-danger" 
                    : "text-gray-500"
              }`}
            >
              {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
