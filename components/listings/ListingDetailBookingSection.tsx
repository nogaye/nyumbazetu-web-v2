"use client";

/**
 * Client section below the photo gallery: amenities on the left; on the right, a booking/contact card.
 * When listing_purpose is short_stay, also shows a date calendar and check-in/check-out on the card.
 * When rent or buy, shows only price (monthly rent or sale price) and contact CTA.
 */

import { useState, useMemo } from "react";
import { ListingAmenities } from "@/components/listings/ListingAmenities";
import {
  ListingBookingCard,
  ListingDateRangeCalendar,
} from "@/components/listings/ListingBookingCard";
import { ListingPurpose } from "@/lib/listings/enums";

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
  /** Listing purpose: short_stay shows check-in/out and nightly price; rent/buy show price only. */
  listingPurpose?: string;
  /** Monthly rent (used when listingPurpose is 'rent'). */
  monthlyRent: number;
  /** Base price per night (short_stay) or sale price (buy). */
  basePrice?: number;
  /** ISO currency code for display (e.g. KES, USD). */
  currencyCode?: string;
  /** City or area name for "X nights in {location}". */
  locationName: string;
  /** Optional list of amenity labels; defaults to a standard set. */
  amenities?: string[];
  /** Optional cancellation policy text (typically for short_stay). */
  cancellationPolicy?: string;
  /** Optional primary CTA label (e.g. "Schedule a viewing", "Request to book"). */
  buttonLabel?: string;
  className?: string;
}

/**
 * Renders a two-column section: left = amenities, and if short_stay a date calendar;
 * right = sticky booking card with price (and check-in/out + guests only for short_stay) and Reserve CTA.
 */
export function ListingDetailBookingSection({
  propertyTitle,
  propertyId,
  propertySlug,
  listingPurpose = ListingPurpose.Rent,
  monthlyRent,
  basePrice,
  currencyCode = "KES",
  locationName,
  amenities,
  cancellationPolicy,
  buttonLabel,
  className,
}: ListingDetailBookingSectionProps) {
  const isShortStay = listingPurpose === ListingPurpose.ShortStay;
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
        {/* Left: amenities; calendar only for short_stay */}
        <div className="lg:col-span-2 space-y-8">
          <ListingAmenities amenities={amenities} initialCount={10} />
          {isShortStay && (
            <ListingDateRangeCalendar
              checkIn={checkIn}
              checkOut={checkOut}
              onCheckInChange={setCheckIn}
              onCheckOutChange={setCheckOut}
              locationName={locationName}
            />
          )}
        </div>
        {/* Right: sticky booking card (price; check-in/out + guests only for short_stay) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <ListingBookingCard
              propertyTitle={propertyTitle}
              propertyId={propertyId}
              propertySlug={propertySlug}
              listingPurpose={listingPurpose}
              monthlyRent={monthlyRent}
              basePrice={basePrice ?? monthlyRent}
              currencyCode={currencyCode}
              locationName={locationName}
              cancellationPolicy={cancellationPolicy}
              buttonLabel={buttonLabel}
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
