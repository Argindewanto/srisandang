interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <img 
      src="/images/logo.webp" 
      alt="SriSandang Logo" 
      className={className}
      width={150}  // Adjust this based on your logo's ideal size
      height={40}  // Adjust this based on your logo's ideal size
    />
  );
} 