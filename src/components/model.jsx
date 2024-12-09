/* eslint-disable react/no-unknown-property */
import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  PerspectiveCamera,
  Environment,
  Center,
  Float,
} from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

function Model() {
  const { scene } = useGLTF("./bunny_can.glb");
  const container = useRef();
  const [isLoading, setIsLoading] = useState(true);

  useGSAP(
    () => {
      if (scene) {
        setIsLoading(false);
        gsap.to(scene.scale, {
          x: 1.2,
          y: 1.2,
          z: 1.2,
          duration: 2,
          ease: "power2.out",
        });
      }

      ScrollTrigger.create({
        trigger: "#scanner",
        start: "top top",
        end: `${window.innerHeight * 1}px`,
        pin: true,
        scrub: 1,
        onEnter: () => {
          if (scene) {
            const tl = gsap.timeline();
            tl.to(scene.rotation, {
              y: Math.PI * 2,
              duration: 1,
              ease: "power2.inOut",
            });
          }
        },
        onEnterBack: () => {
          if (scene) {
            gsap.to(scene.rotation, {
              y: 0,
              duration: 1,
              ease: "power2.inOut",
            });
          }
        },
      });
    },
    { scope: null }
  );

  return (
    <div
      id="model"
      ref={container}
      className="fixed w-full h-screen bg-[#fefdfd]"
    >
      <Canvas
        id="can"
        shadows
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 2.5,
          shadowMap: {
            enabled: true,
            type: THREE.PCFSoftShadowMap,
          },
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
        <Environment preset="warehouse" intensity={1} />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <spotLight
          position={[-5, 5, 0]}
          intensity={0.8}
          angle={0.5}
          penumbra={1}
        />
        <Center>
          <Float
            speed={1.5}
            rotationIntensity={1}
            floatIntensity={2}
            floatingRange={[-0.1, 0.1]}
          >
            <primitive object={scene} scale={1.2} />
          </Float>
        </Center>
      </Canvas>
    </div>
  );
}

export default Model;
