'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function KineticAtmosphericCore() {
  const groupRef = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const middleRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
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

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Smooth interactive mouse tilt
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.45,
        0.06
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mouse.y * 0.45,
        0.06
      );
    }

    // Continuous kinetic rotational energy
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.35;
      outerRingRef.current.rotation.x += delta * 0.2;
    }
    if (middleRingRef.current) {
      middleRingRef.current.rotation.y += delta * 0.45;
      middleRingRef.current.rotation.z -= delta * 0.25;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.x -= delta * 0.55;
      innerRingRef.current.rotation.y += delta * 0.3;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Outer Titanium Aerodynamic Gimbal */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[2.0, 0.05, 32, 100]} />
        <meshStandardMaterial
          color="#1A1A1E"
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>

      {/* Outer Orbit Accent Nodes */}
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(angle) * 2.0,
            Math.sin(angle) * 2.0,
            0,
          ]}
        >
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#FF521B" emissive="#FF521B" emissiveIntensity={0.6} />
        </mesh>
      ))}

      {/* 2. Middle Precision Gyroscope Ring */}
      <mesh ref={middleRingRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.6, 0.045, 32, 100]} />
        <meshStandardMaterial
          color="#35353C"
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>

      {/* 3. Inner Concentric Ring with Ember Rim */}
      <mesh ref={innerRingRef} rotation={[0, Math.PI / 3, Math.PI / 6]}>
        <torusGeometry args={[1.2, 0.04, 32, 100]} />
        <meshStandardMaterial
          color="#FF521B"
          metalness={0.7}
          roughness={0.3}
          emissive="#FF521B"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* 4. Floating Kinetic Biomechanical Athletic Core */}
      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.2}>
        <mesh ref={coreRef} position={[0, 0, 0]}>
          <octahedronGeometry args={[0.65, 3]} />
          <MeshDistortMaterial
            color="#FFFFFF"
            emissive="#FF521B"
            emissiveIntensity={0.2}
            roughness={0.15}
            metalness={0.8}
            distort={0.35}
            speed={2.2}
          />
        </mesh>
      </Float>

      {/* Floating Kinetic Beaded Particles */}
      {[
        [-0.9, 0.7, 0.5],
        [1.1, -0.6, -0.4],
        [0.4, 1.2, -0.6],
        [-0.6, -1.1, 0.5],
      ].map((pos, idx) => (
        <Float key={idx} speed={3 + idx * 0.5} rotationIntensity={1} floatIntensity={2}>
          <mesh position={pos as [number, number, number]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshStandardMaterial
              color="#FF521B"
              emissive="#FF521B"
              emissiveIntensity={0.8}
            />
          </mesh>
        </Float>
      ))}
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
        <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-aura-ember/15 to-transparent blur-2xl" />
        <div className="w-48 h-48 rounded-full border border-black/10 bg-white/70 backdrop-blur-xl flex items-center justify-center shadow-lg">
          <span className="font-heading font-black text-xl tracking-[0.25em] text-aura-ink">
            AURA
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing select-none">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[6, 8, 5]} intensity={2.2} color="#FFFFFF" />
        <directionalLight position={[-6, -4, 4]} intensity={1.2} color="#FFF2EC" />
        <pointLight position={[0, 0, 1]} intensity={1.5} color="#FF521B" distance={4} />

        <KineticAtmosphericCore />
      </Canvas>
    </div>
  );
}
