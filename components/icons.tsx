import { EvCharger, LifeBuoy, Package, Ruler, Wrench } from "lucide-react";
import type { Service } from "@/content/services";

export const serviceIcons: Record<Service["icon"], typeof Package> = {
  package: Package,
  ruler: Ruler,
  wrench: Wrench,
  "ev-charger": EvCharger,
  "life-buoy": LifeBuoy,
};
