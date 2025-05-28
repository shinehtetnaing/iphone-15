"use client";

import { heroVideo, smallHeroVideo } from "@/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useState } from "react";

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState("");

  const handleVideoSrcChange = () => {
    if (window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo);
    } else {
      setVideoSrc(heroVideo);
    }
  };

  useEffect(() => {
    handleVideoSrcChange();
    window.addEventListener("resize", handleVideoSrcChange);

    return () => {
      window.removeEventListener("resize", handleVideoSrcChange);
    };
  }, []);

  useGSAP(() => {
    gsap.to("#hero", { opacity: 1, delay: 2 });
    gsap.to("#cta", { opacity: 1, y: -50, delay: 2 });
  }, []);

  return (
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex items-center justify-center flex-col">
        <p id="hero" className="hero-title">
          iPhone 15 Pro
        </p>
        <div className="md:w-10/12 w-9/12">
          {videoSrc && (
            <video
              className="pointer-events-none"
              autoPlay
              muted
              playsInline
              key={videoSrc}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          )}
        </div>
      </div>

      <div
        id="cta"
        className="flex flex-col items-center opacity-0 translate-y-20"
      >
        <a href="#highlights" className="btn">
          Buy
        </a>
        <p className="font-normal text-xl">From $199/month or $999</p>
      </div>
    </section>
  );
};

export default Hero;
