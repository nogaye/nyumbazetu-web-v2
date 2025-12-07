"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { PropertyFormModal } from "./PropertyFormModal";
import { Property } from "@/lib/listings/types";
import Link from "next/link";

interface PropertiesAdminListProps {}

export function PropertiesAdminList({}: PropertiesAdminListProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCity, setFilterCity] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [total, setTotal] = useState(0);

  const fetchProperties = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set("search", searchQuery);
      if (filterCity !== "all") params.set("city", filterCity);
      if (filterType !== "all") params.set("property_type", filterType);

      const response = await fetch(`/api/admin/properties?${params.toString()}`);
      const data = await response.json();

      if (response.ok) {
        setProperties(data.properties || []);
        setTotal(data.total || 0);
      } else {
        setError(data.error || "Failed to fetch properties");
      }
    } catch (err) {
      setError("Network error. Make sure the API is accessible.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this property?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/properties/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        fetchProperties(); // Refresh list
      } else {
        alert(`Failed to delete: ${data.error}`);
      }
    } catch (err) {
      alert("Error deleting property");
    }
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingProperty(null);
    fetchProperties(); // Refresh list
  };

  useEffect(() => {
    fetchProperties();
  }, [searchQuery, filterCity, filterType]);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-slate-600 dark:text-slate-400">
            Loading properties...
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
          <Button onClick={fetchProperties} className="mt-4">
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header Actions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Properties ({total})</CardTitle>
            <Button onClick={() => setIsFormOpen(true)} className="w-full sm:w-auto">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Property
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCity} onValueChange={setFilterCity}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                <SelectItem value="Nairobi">Nairobi</SelectItem>
                <SelectItem value="Mombasa">Mombasa</SelectItem>
                <SelectItem value="Kisumu">Kisumu</SelectItem>
                <SelectItem value="Nakuru">Nakuru</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="maisonette">Maisonette</SelectItem>
                <SelectItem value="bedsitter">Bedsitter</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="studio">Studio</SelectItem>
                <SelectItem value="office">Office</SelectItem>
                <SelectItem value="shop">Shop</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Properties Table */}
          {properties.length === 0 ? (
            <div className="text-center py-8 text-slate-600 dark:text-slate-400">
              No properties found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-50">
                      Property
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-50">
                      Location
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-50">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-50">
                      Rent
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-50">
                      Status
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-slate-900 dark:text-slate-50">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((property) => (
                    <tr
                      key={property.id}
                      className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900"
                    >
                      <td className="px-4 py-3">
                        <div>
                          <Link
                            href={`/listings/${property.slug}`}
                            className="font-medium text-slate-900 dark:text-slate-50 hover:text-primary"
                          >
                            {property.title}
                          </Link>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {property.bedrooms} bed • {property.bathrooms} bath
                            {property.size_sqm && ` • ${property.size_sqm} m²`}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                        {property.area}, {property.city}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                        <span className="capitalize">{property.property_type}</span>
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-primary">
                        {formatPrice(property.monthly_rent)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          {property.is_verified && (
                            <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                              Verified
                            </span>
                          )}
                          {property.is_tps_available && (
                            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                              TPS
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(property)}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(property.id)}
                            className="text-red-600 hover:text-red-700 dark:text-red-400"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Property Form Modal */}
      <PropertyFormModal
        isOpen={isFormOpen}
        onClose={handleFormClose}
        property={editingProperty}
      />
    </div>
  );
}


