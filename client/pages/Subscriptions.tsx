import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";

export default function Subscriptions() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Subscriptions
          </h1>
          <p className="text-muted-foreground">
            Manage active subscriptions, trials, and cancellations.
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Create Subscription
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Subscriptions</CardTitle>
          <CardDescription>
            A quick glance at your customer base.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Renews</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  customer: "Acme Inc",
                  plan: "Pro Annual",
                  status: "Active",
                  renews: "Jan 08, 2026",
                },
                {
                  customer: "Globex",
                  plan: "Starter",
                  status: "Trialing",
                  renews: "Oct 02, 2025",
                },
                {
                  customer: "Soylent",
                  plan: "Business",
                  status: "Active",
                  renews: "Aug 14, 2025",
                },
              ].map((s) => (
                <TableRow key={s.customer}>
                  <TableCell className="font-medium">{s.customer}</TableCell>
                  <TableCell>{s.plan}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 ring-1 ring-inset ring-emerald-500/20">
                      {s.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {s.renews}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
