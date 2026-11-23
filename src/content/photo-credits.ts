// Credits for third-party photos (Wikimedia Commons). Keyed by the image path in public/.
// CC BY and CC BY-SA require this attribution: keep it next to the photo or on the page that shows it.
export type PhotoCredit = { author: string; license: string; source: string };

export const photoCredits: Record<string, PhotoCredit> = {
  // Banner: wide crop of a Jetson Orin NX photo.
  "/edge-ai/banner.webp": {
    author: "4300streetcar",
    license: "CC BY 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Nvidia_Jetson_Orin_NX_on_a_motherboard_Computex_2025.jpg",
  },
};
