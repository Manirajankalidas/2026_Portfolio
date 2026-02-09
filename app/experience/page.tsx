import ExperienceImageStack from "../components/ExperienceImageStack";
import Link from "next/link";



const quanticImages = [
  {
    src: "/experience/multi-camera.png",  
    alt: "Quantic site",
    top: "top-0",
    left: "left-0",
    width: "w-[320px]",
    height: "h-[270px]",
    z: 10,
  },
  {
    src: "/experience/Quantic_1.jpeg",
    alt: "Monitoring",
    top: "top-24",
    left: "left-70",
    width: "w-[420px]",
    height: "h-[300px]",
    z: 30,
  },
  {
    src: "/experience/Quantic_4.jpeg",
    alt: "Dashboard",
    top: "top-80",
    left: "left-0",
    width: "w-[350px]",
    height: "h-[230px]",
    z: 20,
    shadow: true,
  },
];


const mewImages = [
  {
    src: "/experience/mew_4.jpeg",
    alt: "Automation lab",
    top: "top-10",
    left: "left-120",
    width: "w-[430px]",
    height: "h-[300px]",
    z: 10,
    rotate: "rotate-6",
  },
  {
    src: "/experience/mew_2.jpeg",
    alt: "PLC training",
    top: "top-50",
    left: "left-52",
    width: "w-[360px]",
    height: "h-[300px]",
    z: 30,
    rotate: "rotate-2",
  },
  {
    src: "/experience/mew_5.jpeg",
    alt: "Workshop",
    top: "top-10",
    left: "left-0",
    width: "w-[430px]",
    height: "h-[300px]",
    z: 20,
    rotate: "-rotate-6",
  },
];

const lsImages = [
  {
    src: "/experience/ls_python_bootcamp.png",  
    alt: "Content creation",
    top: "top-70",
    left: "left-100",
    width: "w-[430px]",
    height: "h-[240px]",
    z: 20,
  },
  {
    src: "/experience/ls_contents.png",
    alt: "Bootcamp",
    top: "top-40",
    left: "left-30",
    width: "w-[430px]",
    height: "h-[240px]",
    frame: true,
    z: 30,
  },
  {
    src: "/experience/Atlassian_event.jpeg",
    alt: "Event",
    top: "top-0",
    left: "left-0",
    width: "w-[430px]",
    height: "h-[220px]",
    z: 10,
  },
];

export default function ExperiencePage() {
  return (
    <>
      {/* ================= QUANTIC EXPERIENCE ================= */}
      {/* <section className=" bg-white flex items-center"> */}
      <section className="bg-white pt-24 pb-16">
        <div className="max-w-[1440px] mx-auto px-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-10 gap-16 items-center">

            {/* Images – 70% */}
            <div className="md:col-span-6 md:order-1">
              <ExperienceImageStack
                images={quanticImages}
                containerHeight="h-[520px]"
              />
            </div>

            {/* Text – 30% */}
            <div className="md:col-span-4 md:order-2">
              <h1 className="text-5xl font-semibold tracking-tight text-black">
                Computer Vision Engineer
              </h1>

              <p className="mt-6 text-lg text-neutral-700">
                Quantictech Analysis Private Limited
              </p>

              <p className="mt-2 text-sm text-neutral-500">
                Chennai · 2024 – Present
              </p>

              <div className="mt-10 inline-flex items-center group">
                <Link href="/" className="text-sm font-medium text-black hover:opacity-70">
                  Explore Experience
                </Link>
                <span className="ml-3 transform transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ================= MEW EXPERIENCE ================= */}
      <section className="bg-black pt-24 pb-16">
        <div className="max-w-[1440px] mx-auto px-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-10 gap-12 items-center">

            {/* Text – 30% */}
            <div className="md:col-span-4">
              <h1 className="text-5xl font-semibold tracking-tight text-white">
                Application Engineer
              </h1>

              <p className="mt-6 text-lg text-neutral-300">
                Mew Technology
              </p>

              <p className="mt-2 text-sm text-neutral-400">
                Bangalore · March 2023 – May 2024
              </p>
              <div className="mt-10 inline-flex items-center group">
                <Link href="/" className="text-sm font-medium text-white hover:opacity-70">
                  Explore Experience
                </Link>
                <span className="ml-3 transform transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>

            </div>

            {/* Images – 70% */}
            <div className="md:col-span-6">
              <ExperienceImageStack
                images={mewImages}
                containerHeight="h-[500px]"
              />
              {/* <ExperienceImageStack
                images={mewImages}
                containerHeight="h-[480px]"
              /> */}
            </div>

          </div>
        </div>
      </section>


      {/* ================= Least Squares EXPERIENCE ================= */}
      {/* <section className=" bg-white flex items-center"> */}
      <section className="bg-white pt-24 pb-16">
        <div className="max-w-[1440px] mx-auto px-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-10 gap-16 items-center">

            {/* Images – 70% */}
            <div className="md:col-span-7 md:order-1">
              <ExperienceImageStack
                images={lsImages}
                containerHeight="h-[500px]"
              />
            </div>

            {/* Text – 30% */}
            <div className="md:col-span-3 md:order-2">
              <h1 className="text-5xl font-semibold tracking-tight text-black">
              Content Creator
              </h1>

              <p className="mt-6 text-lg text-neutral-700">
              Least Squares
              </p>

              <p className="mt-2 text-sm text-neutral-500">
              Community · 2023 – Present
              </p>

              <div className="mt-10 inline-flex items-center group">
                <Link href="/" className="text-sm font-medium text-black hover:opacity-70">
                  Explore Experience
                </Link>
                <span className="ml-3 transform transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

    </>
  );
}
