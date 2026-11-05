import { BatteryCharging, EvCharger, LifeBuoy, Package, Ruler, Wrench } from "lucide-react";
import type { Service } from "@/content/shared";

export const serviceIcons: Record<Service["icon"], typeof Package> = {
  package: Package,
  ruler: Ruler,
  wrench: Wrench,
  battery: BatteryCharging,
  "ev-charger": EvCharger,
  "life-buoy": LifeBuoy,
};
