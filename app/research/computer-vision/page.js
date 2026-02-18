import Image from "next/image";

export default function ComputerVisionResearch() {
  return (
    <section className="bg-white text-black min-h-screen pt-24 pb-16">
      <div className="max-w-[1200px] mx-auto px-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

          {/* LEFT SIDE – TEXT */}
          <div>
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-tight">
              Custom AI <br /> Vision Systems
            </h1>

            <p className="mt-8 text-lg text-black leading-relaxed max-w-xl">
              Developing scalable computer vision solutions for real-world
              industrial and enterprise applications. From video analytics and
              object detection to behavior monitoring and safety compliance,
              our research focuses on building end-to-end intelligent systems.
            </p>

          </div>

          {/* RIGHT SIDE – IMAGE */}
          <div className="relative w-full h-[420px] md:h-[500px]">
            <Image
              src="/research/video_analytics.jpg"
              alt="Video Analytics Research"
              fill
              className="object-cover rounded-xl"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  );
}