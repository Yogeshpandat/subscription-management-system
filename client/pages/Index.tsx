import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts";
import { ArrowUpRight, ArrowDownRight, Download, Upload, Plus, Users, DollarSign, Percent } from "lucide-react";

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"] as const;

const baseData = months.map((m, i) => ({ month: m, mrr: 42000 + Math.round(i * 1800 + Math.sin(i) * 1200), active: 1200 + i * 25, churn: 2.2 + Math.cos(i) }));
const revenueData = months.map((m, i) => ({ month: m, mrr: 35000 + Math.round(i * 2200 + Math.cos(i) * 1600) }));
const churnData = months.map((m, i) => ({ month: m, mrr: 2.4 + Math.sin(i) * 0.6 }));

export default function Index() {
  const [tab, setTab] = useState("overview");
  const data = useMemo(() => (tab === "revenue" ? revenueData : tab === "churn" ? churnData : baseData), [tab]);

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-gradient-to-br from-violet-500/[0.08] via-transparent to-indigo-500/[0.08] p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <h1 className="text-3xl font-bold tracking-tight">Subscription Management</h1>
            <p className="mt-1 text-muted-foreground">Monitor revenue, track churn, and manage plans in one place.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="h-4 w-4" />
              Import Customers
            </Button>
            <Button>
              <Plus className="h-4 w-4" />
              Create Plan
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Monthly Recurring Revenue" value="$58,420" change="12.4%" positive icon={<DollarSign className="h-5 w-5" />} />
        <MetricCard title="Active Subscriptions" value="1,482" change="+64" positive icon={<Users className="h-5 w-5" />} />
        <MetricCard title="Churn Rate" value="2.1%" change="0.3%" positive={false} icon={<Percent className="h-5 w-5" />} />
        <MetricCard title="ARPU" value="$39.45" change="5.2%" positive icon={<DollarSign className="h-5 w-5" />} />
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-base">{tab === "revenue" ? "Revenue" : tab === "churn" ? "Churn" : "Overview"}</CardTitle>
                <CardDescription>Last 12 months</CardDescription>
              </div>
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
                <TabsTrigger value="churn">Churn</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{ mrr: { label: tab === "churn" ? "Churn %" : "MRR", color: "hsl(var(--primary))" } }}
                className="w-full h-80"
              >
                <LineChart data={data as any} margin={{ left: 8, right: 8, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} dy={8} />
                  <YAxis tickLine={false} axisLine={false} width={40} />
                  <Line type="monotone" dataKey="mrr" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Upcoming Renewals</CardTitle>
              <CardDescription>Contracts renewing in the next 30 days</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead className="text-right">Renews</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { customer: "Acme Inc", plan: "Pro Annual", renews: "Jan 08" },
                    { customer: "Globex", plan: "Starter", renews: "Jan 12" },
                    { customer: "Initech", plan: "Business", renews: "Jan 21" },
                    { customer: "Umbrella", plan: "Enterprise", renews: "Jan 28" },
                  ].map((i) => (
                    <TableRow key={i.customer}>
                      <TableCell className="font-medium">{i.customer}</TableCell>
                      <TableCell>{i.plan}</TableCell>
                      <TableCell className="text-right text-muted-foreground">{i.renews}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </Tabs>

      <Card>
        <CardHeader className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-base">Recent Invoices</CardTitle>
            <CardDescription>Latest billing activity</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4" /> Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { id: "INV-1048", customer: "Acme Inc", status: "Paid", amount: "$1,200.00", date: "Jan 02, 2025" },
                { id: "INV-1047", customer: "Globex", status: "Open", amount: "$240.00", date: "Dec 30, 2024" },
                { id: "INV-1046", customer: "Initech", status: "Paid", amount: "$560.00", date: "Dec 29, 2024" },
                { id: "INV-1045", customer: "Umbrella", status: "Failed", amount: "$2,400.00", date: "Dec 28, 2024" },
              ].map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="font-mono text-xs">{inv.id}</TableCell>
                  <TableCell className="font-medium">{inv.customer}</TableCell>
                  <TableCell>
                    {inv.status === "Paid" ? (
                      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 ring-1 ring-inset ring-emerald-500/20">Paid</span>
                    ) : inv.status === "Open" ? (
                      <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600 ring-1 ring-inset ring-amber-500/20">Open</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-md bg-rose-500/10 px-2 py-0.5 text-xs font-medium text-rose-600 ring-1 ring-inset ring-rose-500/20">Failed</span>
                    )}
                  </TableCell>
                  <TableCell>{inv.amount}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{inv.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function MetricCard({ title, value, change, positive, icon }: { title: string; value: string; change: string; positive: boolean; icon: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="space-y-0 pb-2">
        <div className="flex items-center justify-between">
          <CardDescription>{title}</CardDescription>
          <div className="text-muted-foreground">{icon}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className={"mt-1 inline-flex items-center gap-1 text-sm " + (positive ? "text-emerald-600" : "text-rose-600")}>
          {positive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />} {change}
        </div>
      </CardContent>
    </Card>
  );
}
