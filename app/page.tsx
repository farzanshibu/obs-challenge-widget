"use client";
import Link from "next/link";

import ChallengeButton from "@/components/ChallengeButton";
import ChallengeForm from "@/components/ChallengeForm";
import ProgressBar from "@/components/ProgressBar";
import Spinner from "@/components/Spinner";
import { useChallengeStore } from "@/store/fetchstore";
import { useRouter } from "next/navigation";

export default function Config() {
  const router = useRouter();

  const { challenge, loading, setLoading } = useChallengeStore((state) => ({
    challenge: state.challenge,
    loading: state.loading,
    setLoading: state.setLoading,
  }));

  return (
    <main className="bg-zinc-950 h-screen flex items-center">
      <div className="container mx-auto max-w-md md:max-w-2xl p-10 bg-zinc-900 rounded-2xl ">
        <h1 className="text-center font-bold text-neutral-200 text-2xl">
          <Link href={"/overlay"}>Config the Challenges</Link>
        </h1>
        {!loading ? (
          <>
            <div className="mt-5 w-full">
              {challenge && challenge.is_active ? (
                <ProgressBar
                  title={challenge.title}
                  maxValue={challenge.maxValue}
                  minValue={0}
                  currentValue={challenge.currentValue}
                  endofDate={challenge.endDate}
                  className="w-full"
                />
              ) : null}
            </div>
            <div className="mt-5">
              {challenge && challenge.is_active ? (
                <ChallengeButton router={router} />
              ) : (
                <ChallengeForm />
              )}
            </div>
          </>
        ) : (
          <div className="mt-5">
            <Spinner />
          </div>
        )}
      </div>
    </main>
  );
}
