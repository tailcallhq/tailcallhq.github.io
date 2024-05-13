import React, { useEffect, useState } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import type { LottieComponentProps } from "lottie-light-react";

const LottieContainer: React.FC<LottieComponentProps> = ({ animationData, loop = true, className = "" }) => {
  const [lottie, setLottie] = useState<any>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://unpkg.com/lottie-web-light@1.1.0/build/player/lottie_light.min.js";
    script.onload = () => {
      // @ts-ignore
      setLottie(window.lottie);
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <BrowserOnly>
      {() => (
        lottie ? (
          <div className={className} ref={container => {
            if (container && !container.firstChild) {
              lottie.loadAnimation({
                container: container,
                renderer: 'svg',
                loop: loop,
                autoplay: true,
                animationData: animationData
              });
            }
          }} />
        ) : <></>
      )}
    </BrowserOnly>
  );
};

export default LottieContainer;