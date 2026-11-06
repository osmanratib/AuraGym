'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function MinimalGymBarbell() {
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
      // Gentle studio idle rotation
      groupRef.current.rotation.y += delta * 0.25;

      // Subtle, refined interactive tilt (minimal, not jarring)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        0.2 - mouse.y * 0.2,
        0.05
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        -mouse.x * 0.15,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.1, 0]}>
      {/* 1. Barbell Shaft (Stainless Steel with knurling accents) */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.07, 0.07, 4.4, 32]} />
        <meshStandardMaterial
          color="#222226"
          metalness={0.92}
          roughness={0.18}
        />
      </mesh>

      {/* Knurled Grip Texture Marks (precision rings) */}
      {[-0.9, -0.45, 0.45, 0.9].map((pos, idx) => (
        <mesh key={idx} position={[pos, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.075, 0.008, 16, 32]} />
          <meshStandardMaterial color="#FF521B" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}

      {/* Center Centerpiece Knurling Mark */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.074, 0.006, 16, 32]} />
        <meshStandardMaterial color="#FF521B" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Left Sleeve Collar */}
      <mesh position={[-1.25, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.13, 0.13, 0.06, 32]} />
        <meshStandardMaterial color="#111114" metalness={0.9} roughness={0.25} />
      </mesh>

      {/* Right Sleeve Collar */}
      <mesh position={[1.25, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.13, 0.13, 0.06, 32]} />
        <meshStandardMaterial color="#111114" metalness={0.9} roughness={0.25} />
      </mesh>

      {/* Left Calibrated Competition Plates */}
      <group position={[-1.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        {/* Outer 25KG Bumper Plate */}
        <mesh position={[0, -0.06, 0]}>
          <cylinderGeometry args={[0.88, 0.88, 0.14, 48]} />
          <meshStandardMaterial color="#16161A" metalness={0.7} roughness={0.35} />
        </mesh>
        {/* Inner Plate Bezel */}
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.76, 0.76, 0.12, 48]} />
          <meshStandardMaterial color="#202026" metalness={0.65} roughness={0.4} />
        </mesh>
        {/* Chrome Hub Ring */}
        <mesh position={[0, -0.06, 0]}>
          <torusGeometry args={[0.3, 0.02, 16, 32]} />
          <meshStandardMaterial color="#E0E0E6" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Ember Accent Calibration Band */}
        <mesh position={[0, -0.06, 0]}>
          <torusGeometry args={[0.87, 0.015, 16, 48]} />
          <meshStandardMaterial color="#FF521B" emissive="#FF521B" emissiveIntensity={0.6} />
        </mesh>
      </group>

      {/* Right Calibrated Competition Plates */}
      <group position={[1.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        {/* Outer 25KG Bumper Plate */}
        <mesh position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.88, 0.88, 0.14, 48]} />
          <meshStandardMaterial color="#16161A" metalness={0.7} roughness={0.35} />
        </mesh>
        {/* Inner Plate Bezel */}
        <mesh position={[0, -0.04, 0]}>
          <cylinderGeometry args={[0.76, 0.76, 0.12, 48]} />
          <meshStandardMaterial color="#202026" metalness={0.65} roughness={0.4} />
        </mesh>
        {/* Chrome Hub Ring */}
        <mesh position={[0, 0.06, 0]}>
          <torusGeometry args={[0.3, 0.02, 16, 32]} />
          <meshStandardMaterial color="#E0E0E6" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Ember Accent Calibration Band */}
        <mesh position={[0, 0.06, 0]}>
          <torusGeometry args={[0.87, 0.015, 16, 48]} />
          <meshStandardMaterial color="#FF521B" emissive="#FF521B" emissiveIntensity={0.6} />
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
        <div className="w-24 h-24 rounded-full border border-black/10 flex items-center justify-center">
          <span className="font-heading font-bold text-xs uppercase tracking-widest text-aura-ink">
            AURA 25KG
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing select-none">
      <Canvas
        camera={{ position: [0, 0.6, 3.8], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.6} />
        <directionalLight position={[4, 6, 4]} intensity={2.2} color="#FFFFFF" />
        <directionalLight position={[-4, -2, 2]} intensity={1.0} color="#F5F5F0" />
        <pointLight position={[0, 0.5, 1.5]} intensity={1.2} color="#FF521B" distance={3.5} />

        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
          <MinimalGymBarbell />
        </Float>

        <ContactShadows
          position={[0, -0.85, 0]}
          opacity={0.35}
          scale={5}
          blur={2.2}
          far={2.5}
        />
      </Canvas>
    </div>
  );
}
