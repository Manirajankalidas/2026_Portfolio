import Image from "next/image";

type ImageItem = {
  src: string;
  alt: string;
  top: string;
  left: string;
  width: string;
  height: string;
  z: number;
  rotate?: string;
  frame?: boolean;
};

type Props = {
  images: ImageItem[];
  containerHeight?: string;
};

export default function ExperienceImageStack({
  images,
  containerHeight = "h-[520px]",
}: Props) {
  return (
    <div className={`relative w-full ${containerHeight}`}>
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute ${img.top} ${img.left} ${img.width} ${img.height} ${
            img.rotate ?? ""
          }`}
          style={{ zIndex: img.z }}
        >
          {/* Frame / Border */}
          <div
            className={`${
              img.frame
                ? "bg-black p-3 border border-neutral-200 shadow-lg"
                : ""
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
}