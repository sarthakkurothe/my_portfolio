"use client";

import { ReactNode, useEffect, useState } from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { STACKS } from "@/data/stacks";

export function SkillsScrolling() {
  const [shuffledSkillsChunks, setShuffledSkillsChunks] = useState<
    Array<Array<[string, ReactNode]>>
  >([]);

  useEffect(() => {
    const skillsArr = Object.entries(STACKS);
    const shuffledArray = [...skillsArr].sort(() => Math.random() - 0.5);
    const chunkSize = Math.ceil(shuffledArray.length / 4); 
    const chunkedArray = Array.from({ length: 4 }, (_, index) =>
      shuffledArray.slice(index * chunkSize, (index + 1) * chunkSize)
    );
    setShuffledSkillsChunks(chunkedArray);
  }, []);

  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      {shuffledSkillsChunks.map((chunk, index) => (
        <InfiniteMovingCards
          key={index}
          skills={chunk}
          direction={index % 2 === 0 ? "right" : "left"} 
          speed="slow"
        />
      ))}
    </div>
  );
}
