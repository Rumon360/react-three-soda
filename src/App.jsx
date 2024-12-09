import LocomotiveScroll from "locomotive-scroll";
import { Suspense, useEffect } from "react";
import Model from "./components/model";
import Hero from "./components/hero";
import Scanner from "./components/scanner";
import Info from "./components/info";
import Outro from "./components/outro";
import { useProgress } from "@react-three/drei";

function App() {
  const { progress } = useProgress();

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      smooth: true,
      lerp: 0.08,
    });

    return () => {
      if (scroll) scroll.destroy();
    };
  }, []);

  return (
    <div className="w-full h-full relative uppercase">
      <div className="overflow-x-hidden">
        <Suspense
          fallback={
            <div className="h-screen w-full flex flex-col items-center justify-center">
              <div className="text-4xl font-bold mb-4">Loading...</div>
              <div className="mt-2">{Math.round(progress)}%</div>
            </div>
          }
        >
          <Model />
          <Hero />
          <Info />
          <Scanner />
          <Outro />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
