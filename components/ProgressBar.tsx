"use client";
import { cn } from "../lib/utils";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface ProgressBarProps {
  title: string;
  maxValue: number;
  minValue: number;
  currentValue: number;
  endDate?: Date;
  className?: string;
}

const ProgressBar = ({
  title,
  maxValue,
  minValue,
  currentValue,
  endDate,
  className,
}: ProgressBarProps) => {
  const [completed, setCompleted] = useState(false);
  const progress = Math.min(Math.max(currentValue, minValue), maxValue); // Clamp value between min and max

  const fillVariants = {
    from: { width: 0 },
    to: { width: `${(progress / maxValue) * 100}%` },
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  const currentTextVariants = {
    initial: { x: 0 },
    wiggle: {
      x: [-5, 5, -3, 3, -2, 2, 0],
      y: [5, -5, 3, -3, 2, -2, 0],
      transition: {
        duration: 0.9,
        repeat: Infinity,
      },
    },
  };
  useEffect(() => {
    if (maxValue === currentValue) {
      setCompleted(true);
    }
    if (currentValue < maxValue) {
      setCompleted(false);
    }
  }, [currentValue, maxValue]);
  const RemainingDaysCalculation = (endDate: Date): string => {
    const currentDate = new Date();
    const diffTime = new Date(endDate).getTime() - currentDate.getTime();

    if (diffTime <= 0) {
      return "Challenge Ended";
    }

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `Remaining Days: ${diffDays}`;
  };

  return (
    <div className={cn("w-96 max-w-lg mx-auto p-4", className)}>
      <h2 className="text-2xl font-bold text-white text-center">{title}</h2>
      <div
        className={cn(
          "relative w-full p-2 border-4  rounded-full mt-3",
          completed ? "border-lime-500" : "border-orange-500"
        )}
      >
        <div className="relative w-full h-8 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            initial="from"
            animate="to"
            variants={fillVariants}
            transition={{ duration: 0.5 }}
            className={cn(
              "absolute top-0 left-0 h-full rounded-full  bg-gradient-to-r",
              completed
                ? "from-lime-500 to-lime-400"
                : "from-orange-500 to-orange-400"
            )}
          />
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative w-full h-full flex justify-between items-center px-2"
          >
            <span className="text-xl text-white font-semibold">{minValue}</span>
            <motion.span
              variants={currentTextVariants}
              initial="initial"
              animate="wiggle"
              className="text-xl text-white font-semibold"
            >
              {currentValue}
            </motion.span>
            <span className="text-xl text-white font-semibold">{maxValue}</span>
          </motion.div>
        </div>
      </div>
      {endDate ? (
        <h2 className="text-md font-bold text-white text-center mt-3">
          {RemainingDaysCalculation(endDate)}
        </h2>
      ) : null}
    </div>
  );
};
export default ProgressBar;
