"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Html, Float } from "@react-three/drei";
import { useMemo, useState } from "react";
import * as THREE from "three";

type Cat = { name: string; buried: boolean; votes: number; threshold: number };

export function Graveyard3D({ categories }: { categories: Cat[] }) {
  const positions = useMemo(() => {
    const cols = Math.max(1, Math.ceil(Math.sqrt(categories.length)));
    const spacing = 1.9;
    return categories.map((_, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = (col - (cols - 1) / 2) * spacing;
      const z = (row - (Math.ceil(categories.length / cols) - 1) / 2) * spacing;
      return [x, 0, z] as [number, number, number];
    });
  }, [categories]);

  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="relative h-[520px] w-full overflow-hidden rounded-2xl border border-[var(--color-rule)] bg-[#05050f]">
      <Canvas camera={{ position: [0, 5, 9], fov: 42 }} dpr={[1, 1.5]} shadows>
        <color attach="background" args={["#05050f"]} />
        <fog attach="fog" args={["#05050f", 5, 16]} />
        <ambientLight intensity={0.25} />
        <directionalLight position={[5, 8, 5]} intensity={1.1} color="#d8ffd8" castShadow />
        <directionalLight position={[-6, 4, -4]} intensity={0.3} color="#6080ff" />
        <pointLight position={[0, 6, 0]} intensity={0.4} color="#39ff14" distance={12} />

        {/* ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
          <planeGeometry args={[60, 60]} />
          <meshStandardMaterial color="#0a0a14" roughness={1} />
        </mesh>
        {/* ground grid lines */}
        <gridHelper args={[60, 60, "#1a1a2a", "#0f0f1a"]} position={[0, 0, 0]} />

        {categories.map((c, i) => (
          <Tombstone3D
            key={c.name + i}
            position={positions[i]}
            name={c.name}
            buried={c.buried}
            votes={c.votes}
            threshold={c.threshold}
            selected={selected === i}
            onSelect={() => setSelected(selected === i ? null : i)}
          />
        ))}

        {selected !== null && (
          <Html position={positions[selected]} distanceFactor={6} center>
            <div className="pointer-events-none -translate-y-20 rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper)]/90 px-3 py-2 text-center text-xs backdrop-blur">
              <div className="font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                {categories[selected].name}
              </div>
              <div className="opacity-70">
                {categories[selected].buried
                  ? "🪦 buried"
                  : `${categories[selected].votes}/${categories[selected].threshold} votes`}
              </div>
            </div>
          </Html>
        )}

        <OrbitControls
          enableZoom
          enablePan={false}
          minDistance={4}
          maxDistance={16}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.3}
          autoRotate
          autoRotateSpeed={0.3}
        />
      </Canvas>
      <div className="pointer-events-none absolute bottom-3 left-3 text-xs opacity-50">
        drag to rotate · scroll to zoom
      </div>
    </div>
  );
}

function Tombstone3D({
  position,
  name,
  buried,
  votes,
  threshold,
  selected,
  onSelect,
}: {
  position: [number, number, number];
  name: string;
  buried: boolean;
  votes: number;
  threshold: number;
  selected: boolean;
  onSelect: () => void;
}) {
  const stoneColor = buried ? "#3a3a3a" : "#1f1f28";
  const emissive = buried ? "#39ff14" : "#000000";
  const emissiveIntensity = buried ? 0.15 : 0;

  return (
    <group position={position} onClick={(e) => { e.stopPropagation(); onSelect(); }}>
      {/* pedestal base */}
      <mesh position={[0, 0.06, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.15, 0.12, 0.6]} />
        <meshStandardMaterial color="#222" roughness={0.95} metalness={0.05} />
      </mesh>
      {/* wider foot */}
      <mesh position={[0, 0.18, 0]} castShadow>
        <boxGeometry args={[1.0, 0.12, 0.5]} />
        <meshStandardMaterial color={stoneColor} roughness={0.9} metalness={0.05} />
      </mesh>
      {/* main body */}
      <mesh position={[0, 0.95, 0]} castShadow>
        <boxGeometry args={[0.85, 1.4, 0.42]} />
        <meshStandardMaterial
          color={stoneColor}
          roughness={0.85}
          metalness={0.05}
          transparent={!buried}
          opacity={buried ? 1 : 0.4}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      {/* arched cap (half cylinder) */}
      <mesh position={[0, 1.72, 0]} castShadow>
        <cylinderGeometry args={[0.425, 0.425, 0.42, 24, 1, false, 0, Math.PI]} />
        <meshStandardMaterial
          color={stoneColor}
          roughness={0.85}
          metalness={0.05}
          transparent={!buried}
          opacity={buried ? 1 : 0.4}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      {/* cross detail on buried */}
      {buried && (
        <group position={[0, 1.2, 0.22]}>
          <mesh>
            <boxGeometry args={[0.06, 0.4, 0.04]} />
            <meshStandardMaterial color="#d8ffd8" emissive="#39ff14" emissiveIntensity={0.4} />
          </mesh>
          <mesh position={[0, 0.1, 0]}>
            <boxGeometry args={[0.22, 0.06, 0.04]} />
            <meshStandardMaterial color="#d8ffd8" emissive="#39ff14" emissiveIntensity={0.4} />
          </mesh>
        </group>
      )}
      {/* name inscription */}
      <Text
        position={[0, 0.95, 0.22]}
        fontSize={0.13}
        color={buried ? "#d8ffd8" : "#777"}
        anchorX="center"
        anchorY="middle"
        maxWidth={0.75}
        textAlign="center"
      >
        {name}
      </Text>
      {!buried && (
        <Text position={[0, 0.6, 0.22]} fontSize={0.1} color="#555" anchorX="center" anchorY="middle">
          {`${votes}/${threshold}`}
        </Text>
      )}
      {selected && (
        <mesh position={[0, 0.95, 0]}>
          <boxGeometry args={[0.95, 1.5, 0.5]} />
          <meshBasicMaterial color="#39ff14" wireframe transparent opacity={0.6} />
        </mesh>
      )}
    </group>
  );
}