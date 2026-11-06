'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';

function PrecisionStudioBarbell() {
  const groupRef = useRef<THREE.Group>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Gentle, continuous studio rotation
      groupRef.current.rotation.y += delta * 0.3;

      // Subtle responsive mouse tilt (smooth, restrained)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        0.18 - mouse.y * 0.18,
        0.06
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        -mouse.x * 0.12,
        0.06
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.05, 0]}>
      {/* Central Shaft (Calibrated 28mm stainless steel, total length 2.8 units for perfect framing) */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.048, 0.048, 2.7, 32]} />
        <meshStandardMaterial
          color="#1C1C20"
          metalness={0.92}
          roughness={0.2}
        />
      </mesh>

      {/* Precision Knurling Ring Bands */}
      {[-0.55, -0.28, 0.28, 0.55].map((pos, idx) => (
        <mesh key={idx} position={[pos, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.052, 0.005, 16, 32]} />
          <meshStandardMaterial color="#FF521B" metalness={0.85} roughness={0.25} />
        </mesh>
      ))}

      {/* Center Balance Ring */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.051, 0.004, 16, 32]} />
        <meshStandardMaterial color="#FF521B" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Left Inner Collar Bushing */}
      <mesh position={[-0.88, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.09, 0.09, 0.05, 32]} />
        <meshStandardMaterial color="#0E0E11" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Right Inner Collar Bushing */}
      <mesh position={[0.88, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.09, 0.09, 0.05, 32]} />
        <meshStandardMaterial color="#0E0E11" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Left Calibrated 25KG Competition Plate Stack */}
      <group position={[-1.05, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        {/* Main 25KG Bumper Plate */}
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[0.62, 0.62, 0.1, 48]} />
          <meshStandardMaterial color="#141417" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Inner Plate Inset */}
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.54, 0.54, 0.09, 48]} />
          <meshStandardMaterial color="#1D1D22" metalness={0.65} roughness={0.35} />
        </mesh>
        {/* Chrome Center Hub */}
        <mesh position={[0, -0.05, 0]}>
          <torusGeometry args={[0.22, 0.015, 16, 32]} />
          <meshStandardMaterial color="#D8D8E0" metalness={0.98} roughness={0.1} />
        </mesh>
        {/* Ember Outer Rim Ring */}
        <mesh position={[0, -0.05, 0]}>
          <torusGeometry args={[0.615, 0.012, 16, 48]} />
          <meshStandardMaterial color="#FF521B" emissive="#FF521B" emissiveIntensity={0.5} />
        </mesh>
        {/* End Bar Cap Nut */}
        <mesh position={[0, -0.22, 0]}>
          <cylinderGeometry args={[0.065, 0.065, 0.24, 32]} />
          <meshStandardMaterial color="#282830" metalness={0.85} roughness={0.2} />
        </mesh>
      </group>

      {/* Right Calibrated 25KG Competition Plate Stack */}
      <group position={[1.05, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        {/* Main 25KG Bumper Plate */}
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.62, 0.62, 0.1, 48]} />
          <meshStandardMaterial color="#141417" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Inner Plate Inset */}
        <mesh position={[0, -0.02, 0]}>
          <cylinderGeometry args={[0.54, 0.54, 0.09, 48]} />
          <meshStandardMaterial color="#1D1D22" metalness={0.65} roughness={0.35} />
        </mesh>
        {/* Chrome Center Hub */}
        <mesh position={[0, 0.05, 0]}>
          <torusGeometry args={[0.22, 0.015, 16, 32]} />
          <meshStandardMaterial color="#D8D8E0" metalness={0.98} roughness={0.1} />
        </mesh>
        {/* Ember Outer Rim Ring */}
        <mesh position={[0, 0.05, 0]}>
          <torusGeometry args={[0.615, 0.012, 16, 48]} />
          <meshStandardMaterial color="#FF521B" emissive="#FF521B" emissiveIntensity={0.5} />
        </mesh>
        {/* End Bar Cap Nut */}
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.065, 0.065, 0.24, 32]} />
          <meshStandardMaterial color="#282830" metalness={0.85} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

export default function HeroScene() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);
  }, []);

  if (reducedMotion) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="px-5 py-2.5 rounded-full border border-black/10 bg-white/80 shadow-sm">
          <span className="font-heading font-bold text-xs uppercase tracking-[0.2em] text-aura-ink">
            Aura Calibrated 25KG
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing select-none">
      <Canvas
        camera={{ position: [0, 0.35, 2.7], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.8} />
        <directionalLight position={[4, 5, 4]} intensity={2.2} color="#FFFFFF" />
        <directionalLight position={[-4, -2, 2]} intensity={1.1} color="#FFF5F0" />
        <pointLight position={[0, 0.8, 1.2]} intensity={1.5} color="#FF521B" distance={3.5} />

        <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.25}>
          <PrecisionStudioBarbell />
        </Float>

        <ContactShadows
          position={[0, -0.65, 0]}
          opacity={0.35}
          scale={3.6}
          blur={2.4}
          far={2.2}
        />
      </Canvas>
    </div>
  );
}
