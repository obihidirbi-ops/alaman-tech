import React from 'react';
import {
  Flame,
  BellRing,
  ShieldCheck,
  ArrowUpDown,
  Camera,
  ShieldAlert,
  Network,
  Volume2,
  FileCheck,
  Signpost,
  FileText,
  Compass,
  Wrench,
  Cpu,
  Layers,
  Award
} from 'lucide-react';

const iconMap = {
  Flame,
  BellRing,
  ShieldCheck,
  ArrowUpDown,
  Camera,
  ShieldAlert,
  Network,
  Volume2,
  FileCheck,
  Signpost,
  FileText,
  Compass,
  Wrench,
  Cpu,
  Layers,
  Award
};

export default function ServiceIcon({ name, className = "w-6 h-6" }) {
  const IconComponent = iconMap[name] || Flame;
  return <IconComponent className={className} />;
}
