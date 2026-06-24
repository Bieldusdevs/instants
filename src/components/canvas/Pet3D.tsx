"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { Pet } from "@/types";

interface Pet3DProps {
  pet: Pet;
}

function PetMesh({ pet }: Pet3DProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Animação de respiração orgánica 3D
  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(t * 2) * 0.1;
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.15;
    }
  });

  const petColor = pet.type === "dragon" ? "#ff3300" : pet.type === "cat" ? "#ffaa00" : pet.type === "fox" ? "#ff5500" : "#00f0ff";
  const eyeColor = "#00ffff";

  return (
    <group ref={groupRef}>
      {/* CORPO PRINCIPAL 3D */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial color={petColor} roughness={0.3} metalness={0.2} />
      </mesh>

      {/* BARRIGA SUAVE */}
      <mesh position={[0, -0.2, 0.9]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.8} />
      </mesh>

      {/* OLHOS NEON 3D */}
      <mesh position={[-0.4, 0.3, 1.0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshBasicMaterial color={eyeColor} />
      </mesh>
      <mesh position={[0.4, 0.3, 1.0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshBasicMaterial color={eyeColor} />
      </mesh>

      {/* ORELHAS / CHIFRES 3D */}
      {pet.type === "dragon" ? (
        <>
          <mesh position={[-0.6, 1.1, 0]} rotation={[0, 0, 0.3]}>
            <coneGeometry args={[0.25, 0.8, 16]} />
            <meshStandardMaterial color="#330000" roughness={0.4} />
          </mesh>
          <mesh position={[0.6, 1.1, 0]} rotation={[0, 0, -0.3]}>
            <coneGeometry args={[0.25, 0.8, 16]} />
            <meshStandardMaterial color="#330000" roughness={0.4} />
          </mesh>
        </>
      ) : (
        <>
          <mesh position={[-0.7, 1.0, 0]} rotation={[0, 0, 0.4]}>
            <coneGeometry args={[0.35, 0.7, 4]} />
            <meshStandardMaterial color={petColor} roughness={0.5} />
          </mesh>
          <mesh position={[0.7, 1.0, 0]} rotation={[0, 0, -0.4]}>
            <coneGeometry args={[0.35, 0.7, 4]} />
            <meshStandardMaterial color={petColor} roughness={0.5} />
          </mesh>
        </>
      )}

      {/* ROUPINHAS 3D ACOPLADAS */}
      {/* COROA DE OURO 3D */}
      {pet.hat === "crown" && (
        <group position={[0, 1.25, 0]} rotation={[0.1, 0, 0]}>
          <mesh castShadow>
            <torusGeometry args={[0.5, 0.12, 16, 32]} />
            <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0.2, 0]}>
            <coneGeometry args={[0.55, 0.4, 5]} />
            <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      )}

      {/* CHAPÉU DE MAGO 3D */}
      {pet.hat === "wizard" && (
        <mesh position={[0, 1.5, 0]} rotation={[-0.1, 0, 0.1]}>
          <coneGeometry args={[0.7, 1.5, 32]} />
          <meshStandardMaterial color="#5a189a" roughness={0.4} />
        </mesh>
      )}

      {/* BONÉ 3D */}
      {pet.hat === "cap" && (
        <group position={[0, 1.1, 0.3]}>
          <mesh>
            <cylinderGeometry args={[0.9, 0.9, 0.4, 32]} />
            <meshStandardMaterial color="#ff5500" roughness={0.5} />
          </mesh>
          <mesh position={[0, -0.1, 0.7]}>
            <boxGeometry args={[1.0, 0.08, 0.6]} />
            <meshStandardMaterial color="#222222" roughness={0.5} />
          </mesh>
        </group>
      )}

      {/* ÓCULOS CYBER NEON 3D */}
      {pet.glasses === "cyber" && (
        <mesh position={[0, 0.3, 1.05]}>
          <boxGeometry args={[1.1, 0.28, 0.2]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.85} />
        </mesh>
      )}

      {/* ÓCULOS PIXEL THUG 3D */}
      {pet.glasses === "thug" && (
        <group position={[0, 0.3, 1.1]}>
          <mesh position={[-0.35, 0, 0]}>
            <boxGeometry args={[0.45, 0.25, 0.1]} />
            <meshBasicMaterial color="#111111" />
          </mesh>
          <mesh position={[0.35, 0, 0]}>
            <boxGeometry args={[0.45, 0.25, 0.1]} />
            <meshBasicMaterial color="#111111" />
          </mesh>
          <mesh position={[0, 0.05, 0]}>
            <boxGeometry args={[0.3, 0.08, 0.1]} />
            <meshBasicMaterial color="#111111" />
          </mesh>
        </group>
      )}

      {/* ACESSÓRIO COLAR DE OURO 3D */}
      {pet.accessory === "chain" && (
        <mesh position={[0, -0.6, 0.2]} rotation={[1.5, 0, 0]}>
          <torusGeometry args={[1.0, 0.08, 16, 32]} />
          <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />
        </mesh>
      )}
    </group>
  );
}

export function Pet3D({ pet }: Pet3DProps) {
  return (
    <div className="relative h-full w-full select-none cursor-grab active:cursor-grabbing">
      <Canvas shadows camera={{ position: [0, 0.5, 4.5], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow shadow-mapSize={1024} />
        <pointLight position={[-5, -5, -5]} color="#8a2be2" intensity={1.2} />
        <pointLight position={[5, -5, 5]} color="#00f0ff" intensity={1.0} />

        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
          <PetMesh pet={pet} />
        </Float>

        <ContactShadows position={[0, -1.8, 0]} opacity={0.6} scale={6} blur={2.5} far={4} color="#000000" />
        <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 2 + 0.1} />
      </Canvas>
    </div>
  );
}
