"use client";
import React, { useEffect } from "react";

import { useChallengeStore } from "../../store/fetchstore";
import {socket} from "../socket";

import CustomParticles from "../../components/Particles";
import ProgressBar from "../../components/ProgressBar";


export default function Overlay() {
  const {
    loading,
    animation,
    play,
    challenge,
    setChallenge,
    setPlay,
    setAnimation,
  } = useChallengeStore((state) => ({
    loading: state.loading,
    animation: state.animation,
    play: state.play,
    challenge: state.challenge,
    setChallenge: state.setChallenge,
    setPlay: state.setPlay,
    setAnimation: state.setAnimation,
  }));

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("addSent", (data) => {
      setChallenge(data);
    });
    socket.on("updateSend", (data) => {
      setChallenge(data.challenge);
      setAnimation(data.animation);
      setPlay(data.play);
    });
    socket.on("removeSent", () => {
      setChallenge(null);
    });
  }, [setAnimation, setChallenge, setPlay]);

  useEffect(() => {
    let winner = new Audio("./winner.mp3");
    let lose = new Audio("./loser.mp3");
    if (animation === "Confetti" && play) {
      winner.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
    } else {
      if (challenge && challenge.currentValue === 0 && play) {
        lose.play().catch((error) => {
          console.error("Audio playback failed:", error);
        });
      }
    }
  }, [animation, challenge, play]);

  return (
    <div className="w-full h-full">
      {!loading && challenge ? (
        <>
          <CustomParticles play={play} setPlay={setPlay} variant={animation} />
          <div className="absolute bottom-24 right-4">
            <ProgressBar
              title={challenge.title}
              maxValue={challenge.maxValue}
              minValue={0}
              currentValue={challenge.currentValue}
              endDate={challenge.endDate}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}
