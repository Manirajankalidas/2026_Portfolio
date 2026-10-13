import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

// Drop your photo at public/profile.jpg (or .webp / .png). Until then, initials are shown.
const candidates = ["profile.jpg", "profile.jpeg", "profile.webp", "profile.png"];

export default function ProfilePhoto({ className = "" }: { className?: string }) {
  const file = candidates.find((f) => fs.existsSync(path.join(process.cwd(), "public", f)));
  return file ? (
    <div className={`relative ${className}`}>
      <div
        aria-hidden="true"
        className="absolute bottom-[8%] left-1/2 aspect-square w-[90%] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl"
      />
      <Image
        src={`/${file}`}
        alt="Portrait of Manirajan"
        width={460}
        height={800}
        priority
        className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 [mask-image:linear-gradient(to_bottom,black_82%,transparent)]"
      />
    </div>
  ) : (
    <div
      role="img"
      aria-label="Profile photo placeholder"
      className={`flex items-center justify-center bg-alt text-6xl font-bold tracking-tight text-muted ${className}`}
    >
      MK
    </div>
  );
}
