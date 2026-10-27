import type { Metadata } from "next";
import AreaBand from "@/components/AreaBand";
import { PageHeader } from "@/components/ui";
import { areas } from "@/content/expertise";

export const metadata: Metadata = {
  title: "Areas of Expertise",
  description:
    "Computer vision, data science and IoT: topics Manirajan works on.",
};

export default function ExpertisePage() {
  return (
    <>
      <PageHeader
        title="Areas of Expertise"
        intro="From computer vision and data science to IoT and edge computing, I combine AI, statistical thinking, and connected technologies to build intelligent systems that solve real-world challenges."
      />
      <div className="mt-4">
        {areas.map((area, i) => (
          <AreaBand key={area.slug} area={area} index={i} />
        ))}
      </div>
    </>
  );
}
