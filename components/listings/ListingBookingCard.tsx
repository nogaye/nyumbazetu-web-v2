"use client";

/**
 * Listing booking/reservation card: price summary, check-in/check-out dates,
 * two-month calendar, guests selector, and Reserve (contact owner) CTA.
 * Renders next to amenities below the photo gallery on the listing detail page.
 */

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContactOwnerButton } from "@/components/listings/ContactOwnerButton";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

function getMonthYear(d: Date) {
  return { month: d.getMonth(), year: d.getFullYear() };
}

function getDaysInMonth(year: number, month: number) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startPad = first.getDay();
  const days = last.getDate();
  return { startPad, days };
}

function addMonths(d: Date, n: number) {
  const out = new Date(d);
  out.setMonth(out.getMonth() + n);
  return out;
}

function formatDateForInput(d: Date) {
  return d.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function formatDisplayDate(d: Date) {
  return d.toLocaleDateString("en-KE", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export interface ListingBookingCardProps {
  /** Property title for contact form context. */
  propertyTitle: string;
  /** Property ID for inquiries. */
  propertyId: string;
  /** Property slug for URLs. */
  propertySlug?: string;
  /** Listing purpose: short_stay shows check-in/out and nightly total; rent/buy show single price. */
  listingPurpose?: string;
  /** Monthly rent (used when listingPurpose is 'rent'). */
  monthlyRent: number;
  /** Base price per night (short_stay) or sale price (buy). */
  basePrice?: number;
  /** ISO currency code for display (e.g. KES, USD). */
  currencyCode?: string;
  /** City/area for "X nights in {location}" summary. */
  locationName: string;
  /** Optional cancellation policy text (typically for short_stay). */
  cancellationPolicy?: string;
  /** Controlled check-in date (only shown when listingPurpose is short_stay). */
  checkIn?: Date;
  /** Controlled check-out date. */
  checkOut?: Date;
  /** Controlled guest count. */
  guests?: number;
  /** Called when check-in changes (e.g. from calendar in left column). */
  onCheckInChange?: (d: Date) => void;
  /** Called when check-out changes. */
  onCheckOutChange?: (d: Date) => void;
  /** Called when guest count changes. */
  onGuestsChange?: (n: number) => void;
  className?: string;
}

/**
 * Renders a sticky card: for short_stay shows nightly total, check-in/out, guests;
 * for rent shows monthly price; for buy shows sale price. Always shows Reserve/Contact CTA.
 */
export function ListingBookingCard({
  propertyTitle,
  propertyId,
  propertySlug,
  listingPurpose = "rent",
  monthlyRent,
  basePrice = monthlyRent,
  currencyCode = "KES",
  locationName,
  cancellationPolicy,
  checkIn: controlledCheckIn,
  checkOut: controlledCheckOut,
  guests: controlledGuests,
  onCheckInChange,
  onCheckOutChange,
  onGuestsChange,
  className,
}: ListingBookingCardProps) {
  const isShortStay = listingPurpose === "short_stay";
  const isBuy = listingPurpose === "buy";

  const today = useMemo(() => {
    const t = new Date();
    return new Date(t.getFullYear(), t.getMonth(), t.getDate());
  }, []);

  const [internalCheckIn, setInternalCheckIn] = useState<Date>(() =>
    addMonths(today, 0),
  );
  const [internalCheckOut, setInternalCheckOut] = useState<Date>(() => {
    const out = addMonths(today, 0);
    out.setDate(out.getDate() + 2);
    return out;
  });
  const [internalGuests, setInternalGuests] = useState(1);

  const isControlled = controlledCheckIn != null && controlledCheckOut != null;
  const checkIn = isControlled ? controlledCheckIn! : internalCheckIn;
  const checkOut = isControlled ? controlledCheckOut! : internalCheckOut;
  const guests = controlledGuests ?? internalGuests;
  const setCheckIn = onCheckInChange ?? setInternalCheckIn;
  const setCheckOut = onCheckOutChange ?? setInternalCheckOut;
  const setGuests = (n: number) => {
    if (onGuestsChange) onGuestsChange(n);
    else setInternalGuests(n);
  };

  const nights = Math.max(
    0,
    Math.ceil((checkOut.getTime() - checkIn.getTime()) / (24 * 60 * 60 * 1000)),
  );
  const nightlyTotal = isShortStay ? Math.round(basePrice * nights) : 0;

  const formatPrice = (n: number, currency = currencyCode) =>
    new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(n);

  const priceLabel = isShortStay
    ? `${formatPrice(nightlyTotal)} for ${nights} ${nights === 1 ? "night" : "nights"}`
    : isBuy
      ? formatPrice(basePrice)
      : `${formatPrice(monthlyRent)}/mo`;

  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80",
        className,
      )}
    >
      {isShortStay && (
        <div className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary dark:bg-primary/20 mb-4 inline-block">
          Prices include all fees
        </div>
      )}

      <div className="mb-4">
        <p className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
          {priceLabel}
        </p>
      </div>

      {/* Check-in / Check-out — only for short_stay */}
      {isShortStay && (
        <>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-600 dark:bg-slate-800/50">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Check-in
              </p>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                {formatDateForInput(checkIn)}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-600 dark:bg-slate-800/50">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Checkout
              </p>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                {formatDateForInput(checkOut)}
              </p>
            </div>
          </div>

          {/* Guests — only for short_stay */}
          <div className="mb-4">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
              Guests
            </label>
            <Select
              value={String(guests)}
              onValueChange={(v) => setGuests(Number(v))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Guests" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n} {n === 1 ? "guest" : "guests"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {cancellationPolicy && (
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          {cancellationPolicy}
        </p>
      )}

      <ContactOwnerButton
        propertyTitle={propertyTitle}
        propertyId={propertyId}
        propertySlug={propertySlug}
        buttonLabel={isBuy ? "Contact" : "Reserve"}
      />

      <p className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
        You won&apos;t be charged yet
      </p>

      <button
        type="button"
        className="mt-4 flex w-full items-center justify-center gap-2 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
      >
        <Flag className="h-4 w-4" aria-hidden />
        Report this listing
      </button>
    </div>
  );
}

/**
 * Two-month calendar for selecting check-in/check-out range.
 * Used below the booking card or inline in the left column.
 */
export function ListingDateRangeCalendar({
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
  locationName,
  className,
}: {
  checkIn: Date;
  checkOut: Date;
  onCheckInChange: (d: Date) => void;
  onCheckOutChange: (d: Date) => void;
  locationName: string;
  className?: string;
}) {
  const today = useMemo(() => {
    const t = new Date();
    return new Date(t.getFullYear(), t.getMonth(), t.getDate());
  }, []);
  const [calendarMonth, setCalendarMonth] = useState<Date>(
    () => new Date(checkIn),
  );

  const nights = Math.max(
    0,
    Math.ceil((checkOut.getTime() - checkIn.getTime()) / (24 * 60 * 60 * 1000)),
  );

  const isInRange = (d: Date) => {
    const t = d.getTime();
    return t >= checkIn.getTime() && t < checkOut.getTime();
  };
  const isStart = (d: Date) => d.toDateString() === checkIn.toDateString();
  const isEnd = (d: Date) => d.toDateString() === checkOut.toDateString();
  const isPast = (d: Date) => d.getTime() < today.getTime();

  const handleClick = (d: Date) => {
    if (isPast(d)) return;
    if (d.getTime() <= checkIn.getTime()) {
      onCheckInChange(d);
      const next = new Date(d);
      next.setDate(next.getDate() + 1);
      onCheckOutChange(next);
    } else {
      onCheckOutChange(d);
    }
  };

  const renderMonth = (year: number, month: number) => {
    const { startPad, days } = getDaysInMonth(year, month);
    const name = new Date(year, month).toLocaleDateString("en-KE", {
      month: "long",
      year: "numeric",
    });
    const cells: React.ReactNode[] = [];
    for (let i = 0; i < startPad; i++) cells.push(<div key={`pad-${i}`} />);
    for (let day = 1; day <= days; day++) {
      const d = new Date(year, month, day);
      const past = isPast(d);
      const inRange = isInRange(d);
      const start = isStart(d);
      const end = isEnd(d);
      cells.push(
        <button
          key={day}
          type="button"
          disabled={past}
          onClick={() => handleClick(d)}
          className={cn(
            "h-8 w-8 rounded-full text-sm font-medium transition-colors",
            past && "cursor-not-allowed text-slate-300 dark:text-slate-600",
            !past && "hover:bg-slate-200 dark:hover:bg-slate-600",
            start &&
              end &&
              "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900",
            start &&
              !end &&
              "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900",
            !start &&
              end &&
              "bg-slate-200 text-slate-900 dark:bg-slate-600 dark:text-slate-100",
            inRange && !start && !end && "bg-slate-200 dark:bg-slate-600",
          )}
        >
          {day}
        </button>,
      );
    }
    return (
      <div key={`${year}-${month}`}>
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          {name}
        </p>
        <div className="grid grid-cols-7 gap-1 text-center">
          {WEEKDAYS.map((w, i) => (
            <span
              key={`weekday-${i}`}
              className="text-xs text-slate-500 dark:text-slate-400"
            >
              {w}
            </span>
          ))}
          {cells}
        </div>
      </div>
    );
  };

  const m1 = getMonthYear(calendarMonth);
  const m2 = getMonthYear(addMonths(calendarMonth, 1));

  return (
    <div className={cn("", className)}>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-1">
        {nights} {nights === 1 ? "night" : "nights"} in {locationName}
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
        {formatDisplayDate(checkIn)} – {formatDisplayDate(checkOut)}
      </p>
      <div className="flex gap-2 items-center mb-4">
        <button
          type="button"
          onClick={() => setCalendarMonth((m) => addMonths(m, -1))}
          className="rounded-full p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 min-w-[120px] text-center">
          {calendarMonth.toLocaleDateString("en-KE", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button
          type="button"
          onClick={() => setCalendarMonth((m) => addMonths(m, 1))}
          className="rounded-full p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Next month"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {renderMonth(m1.year, m1.month)}
        {renderMonth(m2.year, m2.month)}
      </div>
    </div>
  );
}
