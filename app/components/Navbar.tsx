"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex justify-center items-center p-2 bg-black text-white shadow-md">
      <nav>
        <ul className="flex gap-8 items-center relative">
          
          {/* Logo */}
          <li>
            <Link href="/">
              <Image
                src="/ma_2.png"
                alt="Logo"
                width={35}
                height={35}
                className="hover:scale-110 transition-transform duration-200"
              />
            </Link>
          </li>

          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/skills">Skills</Link></li>
          <li><Link href="/experience">Experience</Link></li>

          {/* 🔽 Research Dropdown */}
          <li className="group">
            <span className="cursor-pointer hover:text-gray-300">
              Research
            </span>

            <div className="
              absolute top-full left-1/2 -translate-x-1/2
              w-screen bg-white text-black
              opacity-0 invisible
              group-hover:opacity-100 group-hover:visible
              transition-all duration-300
            ">
              <div className="max-w-7xl mx-auto px-135 py-12">

                <div className="flex flex-col space-y-6">
                  <Link href="/research/Computer-vision" className="text-xl hover:text-gray-600">
                    Computer Vision
                  </Link>
                  <Link href="/research/data-science" className="text-xl hover:text-gray-600">
                    Data Science
                  </Link>
                  <Link href="/research/iot" className="text-xl hover:text-gray-600">
                    IoT
                  </Link>
                </div>

              </div>
            </div>
          </li>
          <li><Link href="/projects">Projects</Link></li>
          <li><Link href="/events">Events</Link></li>
          <li><Link href="/contact">Contact</Link></li>

        </ul>
      </nav>
    </header>
  );
}
