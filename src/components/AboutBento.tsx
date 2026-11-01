import Image from "next/image";
import ImagePreview from "./ImagePreview";
import ProfileCard from "./ProfileCard";
import Chip from "./Chip";
import InterestPictures from "./InterestPictures";
import { interests, location, personal } from "@/data/portfolio";

const label =
  "text-[10px] uppercase tracking-[0.18em] text-subtle";

const base =
  "relative overflow-hidden rounded-[28px] border border-line transition-colors hover:border-white/25";

type MediaProps = {
  label: string;
  tag?: string;
  title: string;
  note: string;
  image?: string;
  imageRatio?: number;
  imagePosition?: string;
  className?: string;
};

function MediaCard({
  label: l,
  tag,
  title,
  note,
  image,
  imageRatio,
  imagePosition,
  className = "",
}: MediaProps) {
  const card = (
    <div
      className={`${base} flex min-h-[11rem] flex-col justify-between bg-[#0e0e0e] p-5 sm:min-h-[15rem] ${
        image ? "w-full" : className
      }`}
    >
      {image && (
        <>
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 640px) 360px, 100vw"
            className="object-cover"
            style={{ objectPosition: imagePosition }}
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
        </>
      )}
      <div className="relative flex items-start justify-between">
        <p className={label}>{l}</p>
        {tag && <p className={label}>{tag}</p>}
      </div>
      <div className="relative">
        <p className="text-[24px] font-medium leading-tight tracking-tight">
          {title}
        </p>
        <p className="mt-1 text-[13px] text-muted">{note}</p>
      </div>
    </div>
  );

  return image ? (
    <ImagePreview
      src={image}
      title={title}
      ratio={imageRatio}
      className={className}
    >
      {card}
    </ImagePreview>
  ) : (
    card
  );
}

export default function AboutBento() {
  return (
    <section id="about" className="flex scroll-mt-20 flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-semibold tracking-tight">More about me</h2>
        <p className="text-sm text-muted">
          A quick look at who I am and what I&apos;m building.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:auto-rows-[minmax(15rem,auto)] sm:grid-cols-4">
        <ProfileCard className="col-span-2 sm:row-span-2" />

        <MediaCard
          label={personal.shipped.label}
          tag={personal.shipped.tag}
          title={personal.shipped.title}
          note={personal.shipped.note}
          image={personal.shipped.image}
          className="col-span-1"
        />
        <MediaCard
          label={personal.building.label}
          title={personal.building.title}
          note={personal.building.note}
          image={personal.building.image}
          imageRatio={personal.building.imageRatio}
          imagePosition={personal.building.imagePosition}
          className="col-span-1"
        />
        <MediaCard
          label={personal.focus.label}
          title={personal.focus.title}
          note={personal.focus.note}
          image={personal.focus.image}
          className="col-span-2"
        />

        <MediaCard
          label={personal.acquired.label}
          tag={personal.acquired.tag}
          title={personal.acquired.title}
          note={personal.acquired.note}
          image={personal.acquired.image}
          imageRatio={personal.acquired.imageRatio}
          imagePosition={personal.acquired.imagePosition}
          className="col-span-2"
        />

        <MediaCard
          label="Somewhere in"
          tag="PH"
          title={personal.place.name}
          note={location}
          image={personal.place.image}
          imageRatio={personal.place.imageRatio}
          imagePosition={personal.place.imagePosition}
          className="col-span-2"
        />
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-[13px] text-muted">Interests</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {interests.map((g) => (
            <div
              key={g.label}
              className={`${base} flex flex-col gap-4 bg-surface p-5`}
            >
              <p className={label}>{g.label}</p>
              {g.pictures ? (
                <InterestPictures pictures={g.pictures} />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {g.items.map((item, i) => (
                    <Chip key={`${item}-${i}`}>{item}</Chip>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
