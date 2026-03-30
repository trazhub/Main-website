import { useEffect, useState, useRef } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

import Marquee from "react-fast-marquee";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);
  const hasStartedExit = useRef(false);

  useEffect(() => {
    if (percent >= 100 && !loaded) {
      const timer = setTimeout(() => {
        setLoaded(true);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [percent, loaded]);

  useEffect(() => {
    if (loaded && !isLoaded) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [loaded, isLoaded]);

  useEffect(() => {
    if (isLoaded && !hasStartedExit.current) {
      hasStartedExit.current = true;
      setClicked(true);
      
      import("./utils/initialFX").then((module) => {
        setTimeout(() => {
          if (module.initialFX) {
            try {
              module.initialFX();
            } catch (error) {
              console.error("Error in initialFX:", error);
            }
          }
          setIsLoading(false);
        }, 300);
      }).catch(err => {
        console.error("Failed to load initialFX module:", err);
        setIsLoading(false);
      });
    }
  }, [isLoaded, setIsLoading]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  return (
    <>
      <div className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">
          Logo
        </a>
        <div className={`loaderGame ${clicked ? "loader-out" : ""}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, index) => (
                <div className="loaderGame-line" key={index}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </div>
      <div className="loading-screen">
        <div className="loading-marquee">
          <Marquee>
            <span> A Creative Developer</span> <span>A Creative Designer</span>
            <span> A Creative Developer</span> <span>A Creative Designer</span>
          </Marquee>
        </div>
        <div
          className={`loading-wrap ${clicked ? "loading-clicked" : ""}`}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${loaded ? "loading-complete" : ""}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{percent}%</span>
                  {percent >= 90 && percent < 100 && (
                    <div style={{ 
                      fontSize: '12px', 
                      marginTop: '10px', 
                      opacity: 0.7,
                      position: 'absolute',
                      bottom: '-25px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '100%',
                      textAlign: 'center'
                    }}>
                      Starting Experience...
                    </div>
                  )}
                </div>
              </div>
              <div className="loading-box"></div>
            </div>
            <div className="loading-content2">
              <span>Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;
  let hasFinished = false;

  const interval = setInterval(() => {
    if (hasFinished) return;

    if (percent < 92) {
      // Fast progress to 92%
      percent += Math.round(Math.random() * 5);
      if (percent > 92) percent = 92;
      setLoading(percent);
    } else if (percent < 99) {
      // Very slow progress from 92 to 99% (waiting for assets)
      if (Math.random() > 0.8) {
        percent += 1;
        setLoading(percent);
      }
    }
  }, 150);

  function clear() {
    hasFinished = true;
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      hasFinished = true;
      clearInterval(interval);
      let current = percent;
      const finishInterval = setInterval(() => {
        if (current < 100) {
          current++;
          setLoading(current);
        } else {
          clearInterval(finishInterval);
          resolve(100);
        }
      }, 10);
    });
  }
  
  // Auto-finish after 8 seconds if not triggered
  setTimeout(() => {
    if (!hasFinished) loaded();
  }, 8000);

  return { loaded, percent, clear };
};
