/**
 * Listing enums — mirror of PostgreSQL enum types for tb_listing_properties.
 * Keeps the API strongly typed and aligned with the database.
 * Extend enum_listing_property_type in DB (e.g. hotel, hostel, warehouse) via
 * ALTER TYPE enum_listing_property_type ADD VALUE 'warehouse'; then add here.
 */

/** Property type: apartment, house, villa, land, office, commercial. */
export enum ListingPropertyType {
  Apartment = "apartment",
  House = "house",
  Villa = "villa",
  Land = "land",
  Office = "office",
  Commercial = "commercial",
}

/** Listing purpose: buy, rent, or short_stay (e.g. nightly). */
export enum ListingPurpose {
  Buy = "buy",
  Rent = "rent",
  ShortStay = "short_stay",
}

/** Listing type: entire place, private room, or shared room. */
export enum ListingType {
  EntirePlace = "entire_place",
  PrivateRoom = "private_room",
  SharedRoom = "shared_room",
}

/** Human-readable labels for listing purpose (badges, filters). */
export const LISTING_PURPOSE_LABELS: Record<ListingPurpose, string> = {
  [ListingPurpose.Buy]: "Buy",
  [ListingPurpose.Rent]: "Rent",
  [ListingPurpose.ShortStay]: "Short stay",
};

/** Human-readable labels for property type. */
export const LISTING_PROPERTY_TYPE_LABELS: Record<ListingPropertyType, string> = {
  [ListingPropertyType.Apartment]: "Apartment",
  [ListingPropertyType.House]: "House",
  [ListingPropertyType.Villa]: "Villa",
  [ListingPropertyType.Land]: "Land",
  [ListingPropertyType.Office]: "Office",
  [ListingPropertyType.Commercial]: "Commercial",
};

/** Human-readable labels for listing type. */
export const LISTING_TYPE_LABELS: Record<ListingType, string> = {
  [ListingType.EntirePlace]: "Entire place",
  [ListingType.PrivateRoom]: "Private room",
  [ListingType.SharedRoom]: "Shared room",
};

/**
 * Whether the listing purpose is short_stay (show check-in/check-out and nightly price).
 * @param purpose - listing_purpose value from the listing
 */
export function isShortStayPurpose(purpose: string | undefined): boolean {
  return purpose === ListingPurpose.ShortStay;
}

/** Comment type in tb_listing_comments: comment (Q&A) or review (with rating). */
export type ListingCommentType = "comment" | "review";

/** Moderation status for listing comments. */
export type ListingCommentModerationStatus =
  | "pending"
  | "published"
  | "hidden"
  | "flagged"
  | "rejected";

/** Reaction type for listing comment reactions. */
export type ListingCommentReactionType = "like" | "helpful" | "love";
