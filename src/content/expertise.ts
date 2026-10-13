// Each topic is shown as a card. When you write about it, set `href` (for example
// to a blog post) and the "Coming soon" label turns into a link.
export type Topic = { name: string; summary?: string; href?: string };
export type Area = {
  slug: string;
  title: string;
  summary: string;
  topics: Topic[];
};

export const areas: Area[] = [
  {
    slug: "computer-vision",
    title: "Computer Vision",
    summary: "Detection, classification, segmentation and image processing.",
    topics: [
      { name: "Detection" },
      { name: "Classification" },
      { name: "Segmentation" },
      { name: "Image processing" },
    ],
  },
  {
    slug: "data-science",
    title: "Data Science",
    summary: "EDA, pre-processing, cleaning and modelling.",
    topics: [
      { name: "EDA" },
      { name: "Pre-processing" },
      { name: "Data cleaning" },
      { name: "Modelling" },
    ],
  },
  {
    slug: "iot",
    title: "IoT",
    summary: "Jetson, Raspberry Pi, Arduino, ESP and components.",
    topics: [
      { name: "Jetson" },
      { name: "Raspberry Pi" },
      { name: "Arduino and ESP" },
      { name: "Components" },
    ],
  },
];
