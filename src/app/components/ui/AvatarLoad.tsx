'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const Avatar = () => {
  const [smilePos, setSmilePos] = useState({ x: 0, y: 0 });
  const [facePos, setFacePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const steps = [
      { x: -45, y: 20, duration: 600},
    //   { x: -45/3, y: 25/3, duration: 1000},
      { x: -45, y: -40, duration: 600 },
      { x: -45/3, y: -50/3, duration: 1000 },
      { x: 45, y: 25, duration: 600 },
    //   { x: 45/3, y: 25/3, duration: 1000 },
      { x: 45, y: -50, duration: 600 },
      { x: 45/3, y: -50/3, duration: 1000 },
      { x: 0, y: 0, duration: 600 },
      { x: 0, y: 0, duration: 1000 },
    ];

    let animationFrame: number;
    let currentStep = 0;
    let startTime = performance.now();

    const runLoopingIntro = (timestamp: number) => {
        const { x: targetX, y: targetY, duration } = steps[currentStep];
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
      
        const prevIndex = currentStep === 0 ? steps.length - 1 : currentStep - 1;
        const prevX = steps[prevIndex].x;
        const prevY = steps[prevIndex].y;
      
        const easeOut = Math.sin((progress * Math.PI) / 2);
        const isStill = prevX === targetX && prevY === targetY;
        const wiggle = isStill ? 0 : Math.sin(progress * Math.PI * 3) * 2 * (1 - progress);
      
        const x = prevX + (targetX - prevX) * easeOut + wiggle;
        const y = prevY + (targetY - prevY) * easeOut;
      
        setSmilePos({ x, y });
        setFacePos({ x: x * 0.5, y: y * 0.5 });
      
        if (progress < 0.5) {
          animationFrame = requestAnimationFrame(runLoopingIntro);
        } else {
          currentStep = (currentStep + 1) % steps.length;
          startTime = performance.now();
          animationFrame = requestAnimationFrame(runLoopingIntro);
        }
      };
      

    animationFrame = requestAnimationFrame(runLoopingIntro);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="relative flex flex-col items-center">
      <Image
        src="/body.png"
        alt="Avatar"
        width={128}
        height={128}
        className="rounded-full bg-gray-100"
      />
      <div
        className="absolute bottom-[-2] transition-transform duration-150 ease-in-out"
        style={{
          transform: `translate(${facePos.x}px, ${facePos.y}px)`,
        }}
      >
        <Image src="/face.png" alt="Face" width={128} height={128} />
      </div>
      <div
        className="absolute bottom-[-2] transition-transform duration-150 ease-in-out"
        style={{
          transform: `translate(${smilePos.x}px, ${smilePos.y}px)`,
        }}
      >
        <Image src="/smile.png" alt="Smile" width={128} height={128} />
      </div>
    </div>
  );
};

export default Avatar;
