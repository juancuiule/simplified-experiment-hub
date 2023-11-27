"use client";
import { VideoWidget } from "@/lib/widgets/content";
import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "react-feather";

export default function Video(props: { widget: VideoWidget }) {
  const {
    widget: {
      props: { url, autoplay, muted },
    },
  } = props;

  const videoRef = useRef<HTMLVideoElement>(null);

  const [playing, setPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const play = () => setPlaying(true);
    const pause = () => setPlaying(false);
    const timeupdate = () => {
      const currentTime = videoRef.current?.currentTime || 0;
      const duration = videoRef.current?.duration || 1;
      const p = Math.round(
        Math.max(0, Math.min(100, (currentTime / duration) * 100))
      );
      setProgress(p);
    };

    if (videoRef.current) {
      videoRef.current.addEventListener("play", play);
      videoRef.current.addEventListener("pause", pause);
      videoRef.current.addEventListener("timeupdate", timeupdate);
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("play", play);
        videoRef.current.removeEventListener("pause", pause);
        videoRef.current.removeEventListener("timeupdate", timeupdate);
      }
    };
  }, [videoRef]);

  return (
    <div className="flex flex-col gap-2">
      <video ref={videoRef} src={url} autoPlay={autoplay} muted={isMuted} />
      <div className="flex gap-2 items-center">
        <button
          type="button"
          className="h-10 w-10 aspect-square shrink-0 rounded-full bg-gray-200 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
          onClick={() => {
            if (videoRef.current) {
              if (playing) {
                videoRef.current.pause();
              } else {
                videoRef.current.play();
              }
            }
          }}
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <div
          className="w-full h-2 rounded bg-gray-200 overflow-hidden relative cursor-pointer"
          onClick={(e) => {
            if (videoRef.current) {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const p = Math.round(
                Math.max(0, Math.min(100, (x / rect.width) * 100))
              );
              const duration = videoRef.current.duration;
              const currentTime = (p / 100) * duration;
              videoRef.current.currentTime = currentTime;
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
        {muted && (
          <button
            type="button"
            className="h-10 w-10 aspect-square shrink-0 rounded-full bg-gray-200 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
            onClick={() => {
              setIsMuted((m) => !m);
            }}
          >
            {isMuted ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        )}
      </div>
    </div>
  );
}
