"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="flex justify-center items-center p-2 bg-black text-white shadow-md">
      <nav>
        <ul className="flex gap-8 items-center">
          {/* ✅ Apple Logo */}
          <li>
            <Link href="/">
              <Image
                src="/ma_2.png" // from public/
                alt="Apple Logo"
                width={35}
                height={35}
                className="hover:scale-110 transition-transform duration-200"
              />
            </Link>
          </li>

          {/* ✅ Centered navigation links */}
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/skills">Skills</Link></li>
          <li><Link href="/experience">Experience</Link></li>
          <li><Link href="/research">Research</Link></li>
          <li><Link href="/projects">Projects</Link></li>
          <li><Link href="/events">Events</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}
