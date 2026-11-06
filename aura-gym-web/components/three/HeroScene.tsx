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
      // Gentle studio turntable rotation
      groupRef.current.rotation.y += delta * 0.35;

      // Restrained, smooth interactive tilt
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        0.15 - mouse.y * 0.15,
        0.05
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        -mouse.x * 0.1,
        0.05
      );
    }
  });

  return (
    /* Perfectly measured: 1.8 units total width, never overflows */
    <group ref={groupRef} position={[0, 0.05, 0]}>
      {/* 1. Barbell Shaft (Stainless Steel with knurling accents, length 1.8) */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.038, 0.038, 1.8, 32]} />
        <meshStandardMaterial
          color="#1E1E22"
          metalness={0.92}
          roughness={0.18}
        />
      </mesh>

      {/* Knurled Grip Texture Marks (precision rings) */}
      {[-0.38, -0.19, 0.19, 0.38].map((pos, idx) => (
        <mesh key={idx} position={[pos, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.041, 0.004, 16, 32]} />
          <meshStandardMaterial color="#FF521B" metalness={0.85} roughness={0.25} />
        </mesh>
      ))}

      {/* Center Balance Ring */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.04, 0.003, 16, 32]} />
        <meshStandardMaterial color="#FF521B" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Left Inner Collar */}
      <mesh position={[-0.58, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.065, 0.065, 0.04, 32]} />
        <meshStandardMaterial color="#111114" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Right Inner Collar */}
      <mesh position={[0.58, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.065, 0.065, 0.04, 32]} />
        <meshStandardMaterial color="#111114" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Left Calibrated 25KG Competition Plate Stack */}
      <group position={[-0.7, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        {/* Main 25KG Bumper Plate */}
        <mesh position={[0, -0.04, 0]}>
          <cylinderGeometry args={[0.45, 0.45, 0.08, 48]} />
          <meshStandardMaterial color="#141417" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Inner Plate Bezel */}
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.39, 0.39, 0.07, 48]} />
          <meshStandardMaterial color="#1D1D22" metalness={0.65} roughness={0.35} />
        </mesh>
        {/* Chrome Hub Ring */}
        <mesh position={[0, -0.04, 0]}>
          <torusGeometry args={[0.15, 0.012, 16, 32]} />
          <meshStandardMaterial color="#D8D8E0" metalness={0.98} roughness={0.1} />
        </mesh>
        {/* Ember Outer Rim Ring */}
        <mesh position={[0, -0.04, 0]}>
          <torusGeometry args={[0.446, 0.009, 16, 48]} />
          <meshStandardMaterial color="#FF521B" emissive="#FF521B" emissiveIntensity={0.6} />
        </mesh>
        {/* End Bar Cap Nut */}
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.048, 0.048, 0.16, 32]} />
          <meshStandardMaterial color="#282830" metalness={0.85} roughness={0.2} />
        </mesh>
      </group>

      {/* Right Calibrated 25KG Competition Plate Stack */}
      <group position={[0.7, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        {/* Main 25KG Bumper Plate */}
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.45, 0.45, 0.08, 48]} />
          <meshStandardMaterial color="#141417" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Inner Plate Bezel */}
        <mesh position={[0, -0.02, 0]}>
          <cylinderGeometry args={[0.39, 0.39, 0.07, 48]} />
          <meshStandardMaterial color="#1D1D22" metalness={0.65} roughness={0.35} />
        </mesh>
        {/* Chrome Hub Ring */}
        <mesh position={[0, 0.04, 0]}>
          <torusGeometry args={[0.15, 0.012, 16, 32]} />
          <meshStandardMaterial color="#D8D8E0" metalness={0.98} roughness={0.1} />
        </mesh>
        {/* Ember Outer Rim Ring */}
        <mesh position={[0, 0.04, 0]}>
          <torusGeometry args={[0.446, 0.009, 16, 48]} />
          <meshStandardMaterial color="#FF521B" emissive="#FF521B" emissiveIntensity={0.6} />
        </mesh>
        {/* End Bar Cap Nut */}
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.048, 0.048, 0.16, 32]} />
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
        <div className="px-4 py-2 rounded-full border border-black/10 bg-transparent text-xs font-heading font-semibold uppercase tracking-widest text-aura-ink">
          Aura 25KG Eleiko Spec
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing select-none bg-transparent">
      <Canvas
        camera={{ position: [0, 0.25, 2.5], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.8} />
        <directionalLight position={[3, 5, 3]} intensity={2.2} color="#FFFFFF" />
        <directionalLight position={[-3, -2, 2]} intensity={1.0} color="#FAF9F6" />
        <pointLight position={[0, 0.6, 1.2]} intensity={1.2} color="#FF521B" distance={3.0} />

        <Float speed={1.8} rotationIntensity={0.12} floatIntensity={0.2}>
          <PrecisionStudioBarbell />
        </Float>

        <ContactShadows
          position={[0, -0.55, 0]}
          opacity={0.28}
          scale={3.0}
          blur={2.0}
          far={1.8}
        />
      </Canvas>
    </div>
  );
}
