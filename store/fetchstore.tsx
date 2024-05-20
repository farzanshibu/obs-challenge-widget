import { create } from "zustand";
import {
  createJSONStorage,
  persist,
  subscribeWithSelector,
} from "zustand/middleware";

import type { FormSchema } from "../schema/formSchema";

type Store = {
  loading: boolean;
  play: boolean;
  animation: "AmongUs" | "Confetti";
  challenge: FormSchema | null;
  setLoading: (loading: boolean) => void;
  setPlay: (value: boolean) => void;
  setAnimation: (payload: "AmongUs" | "Confetti") => void;
  setChallenge: (challenge: FormSchema | null) => void;
  Increment: () => void;
  Decrement: () => void;
  Reset: () => void;
  Delete: () => void;
};

export const useChallengeStore = create<Store>()(
  subscribeWithSelector(
    persist(
      (set) => ({
        loading: false,
        play: false,
        animation: "Confetti",
        challenge: null,
        setLoading: (loading) => set({ loading }),
        setPlay: (play) => set({ play }),
        setAnimation: (animation) => set({ animation }),
        setChallenge: (challenge) => set({ challenge }),
        Increment: () =>
          set((state) => ({
            challenge: state.challenge
              ? {
                  ...state.challenge,
                  currentValue: state.challenge.currentValue + 1,
                }
              : null,
          })),
        Decrement: () =>
          set((state) => ({
            challenge: state.challenge
              ? {
                  ...state.challenge,
                  currentValue: state.challenge.currentValue - 1,
                }
              : null,
          })),
        Reset: () =>
          set((state) => ({
            play: true,
            animation: "AmongUs",
            challenge: state.challenge
              ? {
                  ...state.challenge,
                  currentValue: 0,
                }
              : null,
          })),
        Delete: () =>
          set((state) => ({
            challenge: state.challenge
              ? {
                  ...state.challenge,
                  currentValue: 0,
                  is_active: false,
                }
              : null,
          })),
      }),
      {
        name: "challenge-store", // unique name for the storage
        storage: createJSONStorage(() => localStorage), // (optional) use `sessionStorage` instead of `localStorage`
      }
    )
  )
);
