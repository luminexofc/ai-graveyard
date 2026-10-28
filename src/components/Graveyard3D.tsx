"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Float } from "@react-three/drei";
import { useMemo } from "react";

type Cat = { name: string; buried: boolean; votes: number; threshold: number };

export function Graveyard3D({ categories }: { categories: Cat[] }) {
  const positions = useMemo(() => {
    const cols = Math.max(1, Math.ceil(Math.sqrt(categories.length)));
    const spacing = 1.6;
    return categories.map((_, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = (col - (cols - 1) / 2) * spacing;
      const z = (row - (Math.ceil(categories.length / cols) - 1) / 2) * spacing;
      return [x, 0, z] as [number, number, number];
    });
  }, [categories]);

  return (
    <div className="h-[420px] w-full overflow-hidden rounded-2xl border border-[var(--color-rule)] bg-[var(--color-paper)]">
      <Canvas camera={{ position: [0, 4.5, 7], fov: 45 }} dpr={[1, 1.5]}>
        <color attach="background" args={["#0a0a14"]} />
        <fog attach="fog" args={["#0a0a14", 4, 14]} />
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 6, 4]} intensity={0.9} color="#d8ffd8" />
        <directionalLight position={[-4, 3, -4]} intensity={0.25} color="#6080ff" />

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
          <planeGeometry args={[40, 40]} />
          <meshStandardMaterial color="#0a0a14" roughness={1} />
        </mesh>

        {categories.map((c, i) => (
          <Tombstone3D
            key={c.name + i}
            position={positions[i]}
            name={c.name}
            buried={c.buried}
            votes={c.votes}
            threshold={c.threshold}
          />
        ))}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.2}
          autoRotate
          autoRotateSpeed={0.4}
        />
      </Canvas>
    </div>
  );
}

function Tombstone3D({
  position,
  name,
  buried,
  votes,
  threshold,
}: {
  position: [number, number, number];
  name: string;
  buried: boolean;
  votes: number;
  threshold: number;
}) {
  const color = buried ? "#2a2a2a" : "#1a1a22";
  const opacity = buried ? 1 : 0.35;

  return (
    <group position={position}>
      <Float speed={buried ? 0 : 1.2} rotationIntensity={0} floatIntensity={buried ? 0 : 0.15}>
        {/* base */}
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[1.0, 0.1, 0.5]} />
          <meshStandardMaterial color={color} roughness={0.9} metalness={0.05} transparent={!buried} opacity={opacity} />
        </mesh>
        {/* body */}
        <mesh position={[0, 0.7, 0]}>
          <boxGeometry args={[0.9, 1.3, 0.4]} />
          <meshStandardMaterial color={color} roughness={0.85} metalness={0.05} transparent={!buried} opacity={opacity} />
        </mesh>
        {/* rounded top */}
        <mesh position={[0, 1.4, 0]}>
          <cylinderGeometry args={[0.45, 0.45, 0.15, 16, 1, false, 0, Math.PI]} />
          <meshStandardMaterial color={color} roughness={0.85} metalness={0.05} transparent={!buried} opacity={opacity} />
        </mesh>
        {/* name label */}
        <Text
          position={[0, 0.85, 0.21]}
          fontSize={0.16}
          color={buried ? "#d8ffd8" : "#888"}
          anchorX="center"
          anchorY="middle"
          maxWidth={0.8}
          textAlign="center"
        >
          {name}
        </Text>
        {buried && (
          <Text position={[0, 0.55, 0.21]} fontSize={0.14} color="#d8ffd8" anchorX="center" anchorY="middle">
            🪦
          </Text>
        )}
        {!buried && (
          <Text position={[0, 0.5, 0.21]} fontSize={0.1} color="#666" anchorX="center" anchorY="middle">
            {`${votes}/${threshold}`}
          </Text>
        )}
      </Float>
    </group>
  );
}