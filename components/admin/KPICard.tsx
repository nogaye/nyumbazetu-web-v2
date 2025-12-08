import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  trend: {
    value: number;
    direction: "up" | "down";
  };
  description: string;
  subDescription: string;
}

export function KPICard({
  title,
  value,
  trend,
  description,
  subDescription,
}: KPICardProps) {
  const isPositive = trend.direction === "up";
  const TrendIcon = isPositive ? ArrowUp : ArrowDown;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">
              {value}
            </p>
            <div
              className={`flex items-center gap-1 text-sm font-medium ${
                isPositive
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              <TrendIcon className="h-4 w-4" />
              <span>
                {isPositive ? "+" : "-"}
                {trend.value}%
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {description}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500">
              {subDescription}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


