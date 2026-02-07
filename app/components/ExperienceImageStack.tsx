import Image from "next/image";

type ImageItem = {
  src: string;
  alt: string;
  top: string;
  left: string;
  width: string;
  height: string;
  z: number;
  shadow?: boolean;
};

type ExperienceImageStackProps = {
  images: ImageItem[];
  containerHeight?: string;
};

export default function ExperienceImageStack({
  images,
  containerHeight = "h-[520px]",
}: ExperienceImageStackProps) {
  return (
    <div className={`relative w-full ${containerHeight}`}>
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute ${img.top} ${img.left} ${img.width} ${img.height} z-[${img.z}]`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className={`object-cover ${img.shadow ? "shadow-lg" : ""}`}
          />
        </div>
      ))}
    </div>
  );
}

// import Image from "next/image";

// type ExperienceImageStackProps = {
//   images: {
//     src: string;
//     alt: string;
//   }[];
// };

// export default function ExperienceImageStack({
//   images,
// }: ExperienceImageStackProps) {
//   return (
//     <div className="relative w-full h-[560px]">

//       {/* Image 1 */}
//       <div className="absolute top-0 left-0 w-[420px] h-[320px] z-10">
//         <Image
//           src={images[0].src}
//           alt={images[0].alt}
//           fill
//           priority
//           className="object-cover"
//         />
//       </div>

//       {/* Image 2 */}
//       <div className="absolute top-24 left-40 w-[520px] h-[350px] z-30">
//         <Image
//           src={images[1].src}
//           alt={images[1].alt}
//           fill
//           className="object-cover"
//         />
//       </div>

//       {/* Image 3 */}
//       <div className="absolute top-12 left-16 w-[550px] h-[300px] z-20">
//         <Image
//           src={images[2].src}
//           alt={images[2].alt}
//           fill
//           className="object-cover shadow-lg"
//         />
//       </div>

//     </div>
//   );
// }
