import { AudioWidget } from "@/lib/widgets/content";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "react-feather";

export default function Audio(props: { widget: AudioWidget }) {
  const {
    widget: {
      props: { url },
    },
  } = props;

  const audioRef = useRef<HTMLVideoElement>(null);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const play = () => setPlaying(true);
    const pause = () => setPlaying(false);
    const timeupdate = () => {
      const currentTime = audioRef.current?.currentTime || 0;
      const duration = audioRef.current?.duration || 1;
      const p = Math.round(
        Math.max(0, Math.min(100, (currentTime / duration) * 100))
      );
      setProgress(p);
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("play", play);
      audioRef.current.addEventListener("pause", pause);
      audioRef.current.addEventListener("timeupdate", timeupdate);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("play", play);
        audioRef.current.removeEventListener("pause", pause);
        audioRef.current.removeEventListener("timeupdate", timeupdate);
      }
    };
  }, [audioRef]);

  return (
    <div className="flex flex-col gap-2">
      <audio ref={audioRef} src={url}></audio>
      <div className="flex gap-2 items-center">
        <button
          type="button"
          className="h-10 w-10 aspect-square shrink-0 rounded-full bg-gray-200 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
          onClick={() => {
            if (audioRef.current) {
              if (playing) {
                audioRef.current.pause();
              } else {
                audioRef.current.play();
              }
            }
          }}
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <div
          className="w-full h-2 rounded bg-gray-200 overflow-hidden relative cursor-pointer"
          onClick={(e) => {
            if (audioRef.current) {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const p = Math.round(
                Math.max(0, Math.min(100, (x / rect.width) * 100))
              );
              const duration = audioRef.current.duration;
              const currentTime = (p / 100) * duration;
              audioRef.current.currentTime = currentTime;
            }
          }}
        >
          <div
            className="h-2 rounded bg-primary transition-all absolute left-0 w-full"
            style={{
              transform: `translateX(-${100 - progress}%)`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
