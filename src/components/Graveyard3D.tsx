"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Html, Float } from "@react-three/drei";
import { useMemo, useState } from "react";
import * as THREE from "three";

type Cat = { name: string; buried: boolean; votes: number; threshold: number };

function makeTombstoneGeometry() {
  const shape = new THREE.Shape();
  const w = 0.5;
  const h = 1.5;
  const r = 0.5;
  shape.moveTo(-w, 0);
  shape.lineTo(-w, h - r);
  shape.absarc(0, h - r, r, Math.PI, Math.PI / 2, true);
  shape.absarc(0, h - r, r, Math.PI / 2, 0, true);
  shape.lineTo(w, 0);
  shape.lineTo(-w, 0);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.4,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.03,
    bevelSegments: 4,
  });
  return geo;
}

export function Graveyard3D({ categories }: { categories: Cat[] }) {
  const positions = useMemo(() => {
    const cols = Math.max(1, Math.ceil(Math.sqrt(categories.length)));
    const spacing = 2.0;
    return categories.map((_, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = (col - (cols - 1) / 2) * spacing;
      const z = (row - (Math.ceil(categories.length / cols) - 1) / 2) * spacing;
      return [x, 0, z] as [number, number, number];
    });
  }, [categories]);

  const geometry = useMemo(() => makeTombstoneGeometry(), []);
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="relative h-[560px] w-full overflow-hidden rounded-2xl border border-[var(--color-rule)] bg-[#05050f]">
      <Canvas camera={{ position: [0, 4, 8], fov: 40 }} dpr={[1, 1.5]} shadows>
        <color attach="background" args={["#05050f"]} />
        <fog attach="fog" args={["#05050f", 6, 18]} />
        <ambientLight intensity={0.45} />
        <directionalLight position={[5, 8, 5]} intensity={1.4} color="#e8ffe8" castShadow />
        <directionalLight position={[-6, 4, -4]} intensity={0.4} color="#8090ff" />
        <pointLight position={[0, 6, 0]} intensity={0.6} color="#39ff14" distance={14} />

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
          <planeGeometry args={[80, 80]} />
          <meshStandardMaterial color="#0c0c18" roughness={1} />
        </mesh>
        <gridHelper args={[80, 80, "#1c1c2e", "#0f0f1c"]} position={[0, 0, 0]} />

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
            geometry={geometry}
          />
        ))}

        {selected !== null && (
          <Html position={positions[selected]} distanceFactor={6} center>
            <div className="pointer-events-none -translate-y-24 rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper)]/95 px-3 py-2 text-center text-xs backdrop-blur">
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
          maxDistance={18}
          minPolarAngle={Math.PI / 8}
          maxPolarAngle={Math.PI / 2.4}
          autoRotate
          autoRotateSpeed={0.25}
        />
      </Canvas>
      <div className="pointer-events-none absolute bottom-3 left-3 text-xs opacity-50">
        drag to rotate · scroll to zoom · click a tombstone
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
  geometry,
}: {
  position: [number, number, number];
  name: string;
  buried: boolean;
  votes: number;
  threshold: number;
  selected: boolean;
  onSelect: () => void;
  geometry: THREE.BufferGeometry;
}) {
  const stoneColor = buried ? "#8a8a8a" : "#5a5a68";
  const emissive = buried ? "#39ff14" : "#000000";
  const emissiveIntensity = buried ? 0.18 : 0;
  const opacity = buried ? 1 : 0.6;

  return (
    <group position={position} onClick={(e) => { e.stopPropagation(); onSelect(); }}>
      {/* pedestal base */}
      <mesh position={[0, 0.06, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.3, 0.12, 0.6]} />
        <meshStandardMaterial color="#2a2a34" roughness={0.95} metalness={0.05} />
      </mesh>
      {/* foot */}
      <mesh position={[0, 0.18, 0]} castShadow>
        <boxGeometry args={[1.05, 0.12, 0.48]} />
        <meshStandardMaterial color={stoneColor} roughness={0.9} metalness={0.05} transparent={!buried} opacity={opacity} />
      </mesh>
      {/* tombstone body (arched) */}
      <mesh geometry={geometry} castShadow position={[0, 0, 0.2]} rotation={[0, Math.PI, 0]}>
        <meshStandardMaterial
          color={stoneColor}
          roughness={0.75}
          metalness={0.05}
          transparent={!buried}
          opacity={opacity}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      {/* cross on buried */}
      {buried && (
        <group position={[0, 0.9, 0.02]}>
          <mesh>
            <boxGeometry args={[0.06, 0.45, 0.05]} />
            <meshStandardMaterial color="#d8ffd8" emissive="#39ff14" emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[0, 0.12, 0]}>
            <boxGeometry args={[0.28, 0.06, 0.05]} />
            <meshStandardMaterial color="#d8ffd8" emissive="#39ff14" emissiveIntensity={0.5} />
          </mesh>
        </group>
      )}
      {/* name inscription */}
      <Text
        position={[0, 0.95, 0.02]}
        fontSize={0.15}
        color={buried ? "#d8ffd8" : "#bbb"}
        anchorX="center"
        anchorY="middle"
        maxWidth={0.7}
        textAlign="center"
      >
        {name}
      </Text>
      {!buried && (
        <Text position={[0, 0.55, 0.02]} fontSize={0.11} color="#888" anchorX="center" anchorY="middle">
          {`${votes}/${threshold}`}
        </Text>
      )}
      {selected && (
        <mesh position={[0, 0.85, 0]}>
          <boxGeometry args={[1.15, 1.7, 0.5]} />
          <meshBasicMaterial color="#39ff14" wireframe transparent opacity={0.5} />
        </mesh>
      )}
    </group>
  );
}