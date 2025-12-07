"use client";

/**
 * Admin component to view and manage property inquiries
 * 
 * This is a simple client component for viewing inquiries.
 * For production, you'd want to add:
 * - Authentication/authorization
 * - Better filtering and search
 * - Export functionality
 * - Email integration
 */

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge"; // Not used, using custom badge
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

interface Inquiry {
  id: string;
  property_id: string | null;
  property_title: string | null;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: "new" | "contacted" | "viewing_scheduled" | "closed";
  source: string;
  created_at: string;
}

interface InquiriesListProps {
  limit?: number;
}

export function InquiriesList({ limit = 50 }: InquiriesListProps) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [total, setTotal] = useState(0);

  const fetchInquiries = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({ limit: limit.toString() });
      if (statusFilter !== "all") {
        params.set("status", statusFilter);
      }

      const response = await fetch(`/api/property-inquiry/admin?${params.toString()}`);
      const data = await response.json();

      if (response.ok) {
        setInquiries(data.inquiries || []);
        setTotal(data.total || 0);
      } else {
        setError(data.error || "Failed to fetch inquiries");
      }
    } catch (err) {
      setError("Network error. Make sure the API is accessible.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch("/api/property-inquiry/admin", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status: newStatus }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update local state
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus as Inquiry["status"] } : inq))
        );
      } else {
        alert(`Failed to update status: ${data.error}`);
      }
    } catch (err) {
      alert("Error updating status");
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [statusFilter, limit]);

  const getStatusBadge = (status: Inquiry["status"]) => {
    const variants = {
      new: "default",
      contacted: "secondary",
      viewing_scheduled: "outline",
      closed: "outline",
    };

    const colors = {
      new: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      contacted: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      viewing_scheduled: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      closed: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
    };

    return (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[status]}`}
      >
        {status.replace("_", " ").toUpperCase()}
      </span>
    );
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-slate-600 dark:text-slate-400">
            Loading inquiries...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600 dark:text-red-400">
            {error}
          </div>
          <Button onClick={fetchInquiries} className="mt-4">
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Property Inquiries ({total})</CardTitle>
            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="viewing_scheduled">Viewing Scheduled</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={fetchInquiries} variant="outline" size="sm">
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {inquiries.length === 0 ? (
            <div className="text-center py-8 text-slate-600 dark:text-slate-400">
              No inquiries found
            </div>
          ) : (
            <div className="space-y-4">
              {inquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className="border border-slate-200 dark:border-slate-800 rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-slate-900 dark:text-slate-50">
                          {inquiry.name}
                        </h3>
                        {getStatusBadge(inquiry.status)}
                      </div>
                      {inquiry.property_title && (
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          Property: {inquiry.property_title}
                        </p>
                      )}
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        {inquiry.message}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                    <a
                      href={`mailto:${inquiry.email}`}
                      className="flex items-center gap-1 hover:text-primary"
                    >
                      <EnvelopeIcon className="h-4 w-4" />
                      {inquiry.email}
                    </a>
                    {inquiry.phone && (
                      <a
                        href={`tel:${inquiry.phone}`}
                        className="flex items-center gap-1 hover:text-primary"
                      >
                        <PhoneIcon className="h-4 w-4" />
                        {inquiry.phone}
                      </a>
                    )}
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4" />
                      {new Date(inquiry.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <span className="text-xs text-slate-500">Update status:</span>
                    <Select
                      value={inquiry.status}
                      onValueChange={(value) => updateStatus(inquiry.id, value)}
                    >
                      <SelectTrigger className="w-48 h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="viewing_scheduled">Viewing Scheduled</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

