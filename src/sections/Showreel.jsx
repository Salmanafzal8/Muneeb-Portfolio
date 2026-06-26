import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, MapPin } from "lucide-react";
import SectionHeading from "../components/ui/SectionHeading";
import Reveal from "../components/ui/Reveal";
import { staggerContainer, fadeUp } from "../animations/variants";
import { cn } from "../utils/cn";

const GALLERY = [
  { src: "/gallery/cabins.jpg", title: "Autumn in the woods", place: "Harz, Germany", span: "md:row-span-2" },
  { src: "/gallery/oktoberfest.jpg", title: "Through the heart", place: "Oktoberfest, Munich", span: "" },
  { src: "/gallery/sunset.jpg", title: "Golden hour", place: "Bavaria", span: "" },
  { src: "/gallery/paris.jpg", title: "City of light", place: "Paris, France", span: "md:row-span-2" },
];

export default function Showreel() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [portrait, setPortrait] = useState(false);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const onMeta = (e) => {
    const { videoWidth, videoHeight } = e.currentTarget;
    setPortrait(videoHeight > videoWidth);
  };

  return (
    <section
      id="showreel"
      className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-28 md:py-36"
    >
      <SectionHeading
        eyebrow="Showreel"
        title="Content that grabs attention."
        description="Less talking, more showing. Here's a taste of the kind of work I love to create."
        align="center"
      />

      <Reveal
        as="div"
        delay={2}
        className={cn(
          "group relative mx-auto mt-14 overflow-hidden rounded-[2rem] border border-line bg-black shadow-card",
          portrait ? "aspect-[9/16] max-w-sm" : "aspect-video w-full"
        )}
      >
        {/* Ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-10 -z-10 opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--color-accent) 35%, transparent), transparent 70%)",
          }}
        />

        <video
          ref={videoRef}
          src="/showreel.mp4"
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedMetadata={onMeta}
          onClick={togglePlay}
          aria-label="Muneeb content showreel"
        />

        {/* Click-to-play hint overlay (only when paused) */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Pause video" : "Play video"}
          className={cn(
            "absolute inset-0 grid place-items-center bg-black/30 transition-opacity duration-300",
            playing ? "pointer-events-none opacity-0" : "opacity-100"
          )}
        >
          <span className="grid h-20 w-20 place-items-center rounded-full glass border border-white/30 text-white backdrop-blur-md">
            <Play size={28} className="ml-1" />
          </span>
        </button>

        {/* Controls */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pause video" : "Play video"}
            className="grid h-10 w-10 place-items-center rounded-full glass border border-white/30 text-white backdrop-blur-md transition-transform hover:scale-110"
          >
            {playing ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
          </button>
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Unmute video" : "Mute video"}
            className="grid h-10 w-10 place-items-center rounded-full glass border border-white/30 text-white backdrop-blur-md transition-transform hover:scale-110"
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>

        {/* Tap for sound hint */}
        {muted && (
          <motion.button
            type="button"
            onClick={toggleMute}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full glass border border-white/30 px-3 py-1.5 text-xs text-white backdrop-blur-md transition-transform hover:scale-105"
          >
            <VolumeX size={13} /> Tap for sound
          </motion.button>
        )}
      </Reveal>

      {/* Photo gallery — through my lens */}
      <Reveal as="div" className="mt-20 flex items-center gap-3">
        <span className="h-px w-8 bg-[var(--color-accent)]" />
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--color-accent)]">
          Through my lens
        </span>
      </Reveal>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mt-6 grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-4 md:auto-rows-[230px]"
      >
        {GALLERY.map((photo) => (
          <motion.figure
            key={photo.src}
            variants={fadeUp}
            className={cn(
              "group relative overflow-hidden rounded-2xl border border-line bg-[var(--card)]",
              photo.span
            )}
          >
            <img
              src={photo.src}
              alt={photo.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <figcaption className="absolute bottom-0 left-0 right-0 translate-y-2 p-4 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="font-display text-sm font-semibold">{photo.title}</p>
              <p className="flex items-center gap-1 text-xs text-white/70">
                <MapPin size={11} /> {photo.place}
              </p>
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </section>
  );
}
