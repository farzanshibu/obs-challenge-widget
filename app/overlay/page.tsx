"use client";
import CustomParticles from "@/components/Particles";
import ProgressBar from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { useChallengeStore } from "@/store/fetchstore";
import { useEffect } from "react";

export default function Overlay() {
  const {
    loading,
    challenge,
    animation,
    play,
    setPlay,
    setAnimation,
    Increment,
  } = useChallengeStore((state) => ({
    loading: state.loading,
    challenge: state.challenge,
    animation: state.animation,
    play: state.play,
    setPlay: state.setPlay,
    setAnimation: state.setAnimation,
    Increment: state.Increment,
  }));

  useEffect(() => {}, [setAnimation, challenge, Increment]);

  return (
    <div className="w-full h-full">
      {!loading && challenge ? (
        <>
          <Button onClick={() => setPlay(true)}>Click</Button>
          <CustomParticles play={play} setPlay={setPlay} variant={animation} />
          <div className="absolute bottom-24 right-4">
            <ProgressBar
              title={challenge.title}
              maxValue={challenge.maxValue}
              minValue={0}
              currentValue={challenge.currentValue}
              endofDate={challenge.endDate}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}
