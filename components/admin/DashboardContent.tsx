"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KPICard } from "./KPICard";
import { VisitorsChart } from "./VisitorsChart";
import { DocumentsTable } from "./DocumentsTable";
import { Plus, MoreVertical } from "lucide-react";

export function DashboardContent() {
  return (
    <div className="space-y-6">
      {/* Header with Quick Create */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            Dashboard
          </h1>
        </div>
        <Button className="bg-black text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200">
          <Plus className="mr-2 h-4 w-4" />
          Quick Create
        </Button>
      </div>
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Revenue"
          value="$1,250.00"
          trend={{ value: 12.5, direction: "up" }}
          description="Trending up this month"
          subDescription="Visitors for the last 6 months"
        />
        <KPICard
          title="New Customers"
          value="1,234"
          trend={{ value: 20, direction: "down" }}
          description="Down 20% this period"
          subDescription="Acquisition needs attention"
        />
        <KPICard
          title="Active Accounts"
          value="45,678"
          trend={{ value: 12.5, direction: "up" }}
          description="Strong user retention"
          subDescription="Engagement exceed targets"
        />
        <KPICard
          title="Growth Rate"
          value="4.5%"
          trend={{ value: 4.5, direction: "up" }}
          description="Steady performance increase"
          subDescription="Meets growth projections"
        />
      </div>

      {/* Chart Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Total Visitors</CardTitle>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Total for the last 3 months
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="bg-white dark:bg-slate-900">
                Last 3 months
              </Button>
              <Button variant="ghost" size="sm">
                Last 30 days
              </Button>
              <Button variant="ghost" size="sm">
                Last 7 days
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <VisitorsChart />
        </CardContent>
      </Card>

      {/* Documents Table Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Tabs defaultValue="outline" className="w-full">
              <div className="flex items-center justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="outline">Outline</TabsTrigger>
                  <TabsTrigger value="past-performance">
                    Past Performance
                    <Badge variant="secondary" className="ml-2">
                      3
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="key-personnel">
                    Key Personnel
                    <Badge variant="secondary" className="ml-2">
                      2
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="focus-documents">Focus Documents</TabsTrigger>
                </TabsList>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Customize Columns
                    <MoreVertical className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Section
                  </Button>
                </div>
              </div>
              <TabsContent value="outline" className="mt-0">
                <DocumentsTable />
              </TabsContent>
              <TabsContent value="past-performance" className="mt-0">
                <div className="text-center py-8 text-slate-600 dark:text-slate-400">
                  Past Performance content
                </div>
              </TabsContent>
              <TabsContent value="key-personnel" className="mt-0">
                <div className="text-center py-8 text-slate-600 dark:text-slate-400">
                  Key Personnel content
                </div>
              </TabsContent>
              <TabsContent value="focus-documents" className="mt-0">
                <div className="text-center py-8 text-slate-600 dark:text-slate-400">
                  Focus Documents content
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}

