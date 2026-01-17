// src/components/Logo.tsx
import Image from "next/image";

export function Logo({ size = 80 }) {
  return (
    <Image
      src="C:\Project Pweb2\BBQ-ARRRAHMAN\web\public\images\bbq logoArtboard 1.png"
      alt="Logo BBQ Ar-Rahman"
      width={size}
      height={size}
    />
  );
}
