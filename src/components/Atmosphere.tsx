"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function SparkField({ count = 90 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);

  const { positions, speeds, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      speeds[i] = 0.1 + Math.random() * 0.35;
      phases[i] = Math.random() * Math.PI * 2;
    }

    return { positions, speeds, phases };
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    const arr = points.current.geometry.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      arr[i3 + 1] += speeds[i] * 0.01;
      arr[i3] += Math.sin(t * 0.35 + phases[i]) * 0.0015;

      if (arr[i3 + 1] > 4.5) {
        arr[i3 + 1] = -4.5;
        arr[i3] = (Math.random() - 0.5) * 12;
        arr[i3 + 2] = (Math.random() - 0.5) * 6;
      }
    }

    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#e82545"
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

export default function Atmosphere() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-[2]" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={mobile ? [1, 1.25] : [1, 1.5]}
        gl={{ antialias: !mobile, alpha: true }}
        style={{ background: "transparent" }}
      >
        <SparkField count={mobile ? 40 : 90} />
      </Canvas>
    </div>
  );
}
