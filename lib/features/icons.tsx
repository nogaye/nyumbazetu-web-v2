/**
 * Maps feature icon keys to Heroicon components. Used by the central feature registry
 * so grid and nav can render the correct icon from a string key.
 */

import {
  CurrencyDollarIcon,
  CalculatorIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  HomeIcon,
  ChatBubbleLeftRightIcon,
  BuildingOfficeIcon,
  PaintBrushIcon,
  CalendarDaysIcon,
  LinkIcon,
  MagnifyingGlassIcon,
  UserPlusIcon,
  ChartBarSquareIcon,
  ClipboardDocumentListIcon,
  BoltIcon,
  CubeIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType } from "react";

/** Icon key to Heroicon component. Keys must match iconKey in feature data. */
export const FEATURE_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  CurrencyDollar: CurrencyDollarIcon,
  Calculator: CalculatorIcon,
  UserGroup: UserGroupIcon,
  WrenchScrewdriver: WrenchScrewdriverIcon,
  ClipboardDocumentCheck: ClipboardDocumentCheckIcon,
  DocumentText: DocumentTextIcon,
  Home: HomeIcon,
  ChatBubbleLeftRight: ChatBubbleLeftRightIcon,
  BuildingOffice: BuildingOfficeIcon,
  PaintBrush: PaintBrushIcon,
  CalendarDays: CalendarDaysIcon,
  Link: LinkIcon,
  MagnifyingGlass: MagnifyingGlassIcon,
  UserPlus: UserPlusIcon,
  ChartBarSquare: ChartBarSquareIcon,
  ClipboardDocumentList: ClipboardDocumentListIcon,
  Bolt: BoltIcon,
  Cube: CubeIcon,
  Banknotes: BanknotesIcon,
};
