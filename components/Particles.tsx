"use client";
import { loadAll } from "@tsparticles/all";
import { ISourceOptions, type Container } from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import AmongUsOptions from "./AmongUS.json";
import ConfettiOptions from "./Confetti.json";

interface CustomParticlesProps {
  play: boolean;
  custom?: string;
  setPlay: (value: boolean) => void;
  variant: "AmongUs" | "Confetti";
}

export default function CustomParticles({
  play,
  custom = "Once Again",
  setPlay,
  variant,
}: CustomParticlesProps) {
  const [init, setInit] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const options = variant === "AmongUs" ? AmongUsOptions : ConfettiOptions;

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadAll(engine);
    }).then(() => {
      setInit(false);
    });
  }, []);

  useEffect(() => {
    if (play && !animationStarted) {
      setInit(true);
      setAnimationStarted(true);
      setTimeout(() => {
        setPlay(false);
        setAnimationStarted(false);
        setInit(false);
      }, 7000); // 10 seconds
    }
  }, [init, play, setPlay, animationStarted]);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  if (init) {
    return (
      <>
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options as ISourceOptions}
        />
        {variant === "AmongUs" ? (
          animationStarted ? (
            <div className="flex h-screen w-full absolute top-8 items-center justify-center">
              <TypeAnimation
                sequence={[3000, custom]}
                wrapper="span"
                speed={50}
                className="text-4xl font-bold text-white "
                repeat={1}
              />
            </div>
          ) : null
        ) : null}
      </>
    );
  }

  return <></>;
}
