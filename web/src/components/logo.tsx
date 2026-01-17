import Image from "next/image";

type LogoProps = {
  size?: number;
};

export function Logo({ size = 80 }: LogoProps) {
  return (
    <Image
      src="/images/logo_bbq.png"
      alt="Logo BBQ Ar-Rahman"
      width={size}
      height={size}
      priority
    />
  );
}
