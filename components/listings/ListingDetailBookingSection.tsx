"use client";

/**
 * Client section below the photo gallery: amenities + date calendar on the left,
 * booking/contact card on the right. Owns shared state for check-in, check-out, and guests.
 */

import { useState, useMemo } from "react";
import { ListingAmenities } from "@/components/listings/ListingAmenities";
import {
  ListingBookingCard,
  ListingDateRangeCalendar,
} from "@/components/listings/ListingBookingCard";

function addMonthsImpl(d: Date, n: number) {
  const out = new Date(d);
  out.setMonth(out.getMonth() + n);
  return out;
}

export interface ListingDetailBookingSectionProps {
  /** Property title. */
  propertyTitle: string;
  /** Property ID for contact/inquiry. */
  propertyId: string;
  /** Property slug for URLs. */
  propertySlug?: string;
  /** Monthly rent (KES). */
  monthlyRent: number;
  /** City or area name for "X nights in {location}". */
  locationName: string;
  /** Optional list of amenity labels; defaults to a standard set. */
  amenities?: string[];
  /** Optional cancellation policy text. */
  cancellationPolicy?: string;
  className?: string;
}

/**
 * Renders a two-column section: left = amenities + two-month date calendar,
 * right = sticky booking card with price, check-in/out, guests, and Reserve CTA.
 */
export function ListingDetailBookingSection({
  propertyTitle,
  propertyId,
  propertySlug,
  monthlyRent,
  locationName,
  amenities,
  cancellationPolicy,
  className,
}: ListingDetailBookingSectionProps) {
  const today = useMemo(() => {
    const t = new Date();
    return new Date(t.getFullYear(), t.getMonth(), t.getDate());
  }, []);

  const [checkIn, setCheckIn] = useState<Date>(() => addMonthsImpl(today, 0));
  const [checkOut, setCheckOut] = useState<Date>(() => {
    const out = addMonthsImpl(today, 0);
    out.setDate(out.getDate() + 2);
    return out;
  });
  const [guests, setGuests] = useState(1);

  return (
    <div className={className}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: amenities + calendar */}
        <div className="lg:col-span-2 space-y-8">
          <ListingAmenities amenities={amenities} initialCount={10} />
          <ListingDateRangeCalendar
            checkIn={checkIn}
            checkOut={checkOut}
            onCheckInChange={setCheckIn}
            onCheckOutChange={setCheckOut}
            locationName={locationName}
          />
        </div>
        {/* Right: sticky booking card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <ListingBookingCard
              propertyTitle={propertyTitle}
              propertyId={propertyId}
              propertySlug={propertySlug}
              monthlyRent={monthlyRent}
              locationName={locationName}
              cancellationPolicy={cancellationPolicy}
              checkIn={checkIn}
              checkOut={checkOut}
              guests={guests}
              onCheckInChange={setCheckIn}
              onCheckOutChange={setCheckOut}
              onGuestsChange={setGuests}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
