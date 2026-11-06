'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function KineticDumbbellCore() {
  const meshRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
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

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Smooth mouse tracking interpolation
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        mouse.y * 0.4 + 0.3,
        0.05
      );
      meshRef.current.rotation.z = THREE.MathUtils.lerp(
        meshRef.current.rotation.z,
        -mouse.x * 0.4,
        0.05
      );
    }

    if (coreRef.current) {
      coreRef.current.rotation.y -= delta * 0.8;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Central Grip Handle */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.22, 0.22, 3.2, 32]} />
        <meshStandardMaterial
          color="#1e1e24"
          metalness={0.9}
          roughness={0.25}
        />
      </mesh>

      {/* Textured Grip Rings */}
      {[-0.8, -0.4, 0, 0.4, 0.8].map((xOffset, i) => (
        <mesh key={i} position={[xOffset, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.24, 0.02, 16, 32]} />
          <meshStandardMaterial color="#FF5A1F" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}

      {/* Floating Center Kinetic Energy Core */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
        <mesh ref={coreRef} position={[0, 0, 0]}>
          <icosahedronGeometry args={[0.45, 2]} />
          <MeshDistortMaterial
            color="#FF5A1F"
            emissive="#FF5A1F"
            emissiveIntensity={1.2}
            distort={0.4}
            speed={2}
            roughness={0.2}
          />
        </mesh>
      </Float>

      {/* Left Weight Plates */}
      <group position={[-1.7, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        {/* Outer Heavy Plate */}
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[1.35, 1.35, 0.25, 48]} />
          <meshStandardMaterial color="#141418" metalness={0.92} roughness={0.2} />
        </mesh>
        {/* Inner Plate */}
        <mesh position={[0, 0.18, 0]}>
          <cylinderGeometry args={[1.15, 1.15, 0.22, 48]} />
          <meshStandardMaterial color="#22222a" metalness={0.85} roughness={0.3} />
        </mesh>
        {/* Glow Accent Bezel */}
        <mesh position={[0, 0.05, 0]}>
          <torusGeometry args={[1.36, 0.03, 16, 48]} />
          <meshStandardMaterial color="#FF5A1F" emissive="#FF5A1F" emissiveIntensity={0.8} />
        </mesh>
        {/* End Nut */}
        <mesh position={[0, -0.28, 0]}>
          <cylinderGeometry args={[0.38, 0.38, 0.16, 6]} />
          <meshStandardMaterial color="#FF5A1F" metalness={0.7} roughness={0.2} />
        </mesh>
      </group>

      {/* Right Weight Plates */}
      <group position={[1.7, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        {/* Outer Heavy Plate */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[1.35, 1.35, 0.25, 48]} />
          <meshStandardMaterial color="#141418" metalness={0.92} roughness={0.2} />
        </mesh>
        {/* Inner Plate */}
        <mesh position={[0, -0.18, 0]}>
          <cylinderGeometry args={[1.15, 1.15, 0.22, 48]} />
          <meshStandardMaterial color="#22222a" metalness={0.85} roughness={0.3} />
        </mesh>
        {/* Glow Accent Bezel */}
        <mesh position={[0, -0.05, 0]}>
          <torusGeometry args={[1.36, 0.03, 16, 48]} />
          <meshStandardMaterial color="#FF5A1F" emissive="#FF5A1F" emissiveIntensity={0.8} />
        </mesh>
        {/* End Nut */}
        <mesh position={[0, 0.28, 0]}>
          <cylinderGeometry args={[0.38, 0.38, 0.16, 6]} />
          <meshStandardMaterial color="#FF5A1F" metalness={0.7} roughness={0.2} />
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
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="w-72 h-72 rounded-full bg-gradient-to-tr from-aura-ember/30 to-aura-glow/10 blur-3xl animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-56 h-56 rounded-full border border-aura-ember/40 bg-aura-graphite/60 backdrop-blur-xl flex items-center justify-center shadow-aura-glow">
            <span className="font-heading font-black tracking-widest text-2xl text-aura-ember">AURA</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing select-none">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        {/* Atmospheric Lighting */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={2.5} color="#F4F1EA" />
        <directionalLight position={[-6, -4, -3]} intensity={1.5} color="#FF5A1F" />
        <pointLight position={[0, 0, 0]} intensity={3} distance={5} color="#FFB38A" />

        <KineticDumbbellCore />
      </Canvas>
    </div>
  );
}
