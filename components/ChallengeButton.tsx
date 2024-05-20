"use client";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useChallengeStore } from "../store/fetchstore";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";
import {socket} from "../app/socket";
import React from "react";

export interface DataFromSupaBase {
  id: number;
  title: string;
  maxValue: number;
  currentValue: number;
  endDate: Date | null;
  is_active: boolean;
  created_at: string;
}

function ChallengeButton({ router }: { router: AppRouterInstance }) {
  const { challenge, loading, Decrement, Increment, Reset, Delete } =
    useChallengeStore((state) => ({
      challenge: state.challenge,
      loading: state.loading,
      Decrement: state.Decrement,
      Increment: state.Increment,
      Reset: state.Reset,
      Delete: state.Delete,
    }));

  return (
    <Card className="bg-zinc-800 border-zinc-950">
      <CardHeader>
        <CardTitle className="text-slate-50">Challenge Update</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center flex-col lg:flex-row gap-5">
          <Button
            variant="secondary"
            size="default"
            type="button"
            className="rounded-full border border-lime-300 bg-lime-200/20 text-lime-500 hover:bg-lime-500 hover:text-white"
            onClick={() => {
              if (challenge) {
                if (challenge.currentValue == challenge.maxValue) {
                  toast.success("Completed");
                  return;
                }
                Increment();
                socket.emit("increaseUpdateChallenge", {
                  ...useChallengeStore.getState().challenge,
                });
              }
            }}
            disabled={loading}
          >
            Increment
          </Button>
          <Button
            variant="secondary"
            className="border rounded-full lg:ml-5 lg:mr-2 border-red-300 bg-rose-200/20 text-rose-500 hover:bg-rose-500 hover:text-white"
            size="default"
            type="button"
            onClick={() => {
              if (challenge) {
                if (challenge.currentValue == 0) {
                  toast.success("Already at 0");
                  return;
                }
                Reset();
                socket.emit("resetUpdateChallenge", {
                  ...useChallengeStore.getState().challenge,
                });
              }
            }}
            disabled={loading}
          >
            Reset
          </Button>
          <Button
            variant="secondary"
            className="border lg:ml-5 lg:mr-2 rounded-full  border-yellow-300 bg-yellow-200/20 text-yellow-500 hover:bg-yellow-500 hover:text-white"
            size="default"
            type="button"
            onClick={() => {
              Delete();
              toast.success("Reset Successfully");
              useChallengeStore.persist.clearStorage();
              socket.emit("removeChallenge", {
                ...useChallengeStore.getState().challenge,
              });
              router.push("/");
            }}
            disabled={loading}
          >
            Delete Challenge
          </Button>
          <Button
            variant="destructive_outline"
            size="default"
            type="button"
            className="rounded-full"
            onClick={() => {
              if (challenge) {
                if (challenge.currentValue <= 0) {
                  toast.error("Minumum Value Reached");
                  return;
                }
                Decrement();
                socket.emit("decreaseUpdateChallenge", {
                  ...useChallengeStore.getState().challenge,
                });
              }
            }}
            disabled={loading}
          >
            Decrement
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default ChallengeButton;
