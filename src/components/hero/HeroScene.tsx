'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { AdditiveBlending, Color, MathUtils, NormalBlending } from 'three';
import type { Group, Points, ShaderMaterial } from 'three';

import { blobFragmentShader, blobVertexShader } from './blobShader';

const palette = {
  blue: '#6f86ff',
  pink: '#ff6fae',
  orange: '#ffb56b',
};

interface SceneProps {
  /** 0 at the top of the page, 1 once the hero has scrolled out of view. */
  scrollRef: React.RefObject<number>;
  light: boolean;
}

function Blob({ scrollRef }: Pick<SceneProps, 'scrollRef'>) {
  const material = useRef<ShaderMaterial>(null);
  const group = useRef<Group>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmplitude: { value: 0.28 },
      uColorA: { value: new Color(palette.blue) },
      uColorB: { value: new Color(palette.pink) },
      uColorC: { value: new Color(palette.orange) },
    }),
    [],
  );

  useFrame((state, delta) => {
    const scroll = scrollRef.current ?? 0;
    if (material.current) {
      material.current.uniforms.uTime!.value += delta;
      // The blob gets more restless as the visitor scrolls away.
      material.current.uniforms.uAmplitude!.value = MathUtils.lerp(
        material.current.uniforms.uAmplitude!.value as number,
        0.28 + scroll * 0.35,
        0.05,
      );
    }
    if (group.current) {
      const { x, y } = state.pointer;
      group.current.rotation.y = MathUtils.lerp(group.current.rotation.y, x * 0.6, 0.04);
      group.current.rotation.x = MathUtils.lerp(group.current.rotation.x, -y * 0.4, 0.04);
      group.current.rotation.z += delta * 0.05;
      group.current.position.y = MathUtils.lerp(group.current.position.y, scroll * 1.2, 0.08);
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.2, 48]} />
        <shaderMaterial
          ref={material}
          uniforms={uniforms}
          vertexShader={blobVertexShader}
          fragmentShader={blobFragmentShader}
        />
      </mesh>
    </group>
  );
}

function Rings({ light }: Pick<SceneProps, 'light'>) {
  const group = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.z += delta * 0.08;
    group.current.rotation.x = MathUtils.lerp(
      group.current.rotation.x,
      1.15 + state.pointer.y * 0.15,
      0.03,
    );
  });

  return (
    <group ref={group} rotation={[1.15, 0.2, 0]}>
      <mesh>
        <torusGeometry args={[2.25, 0.006, 8, 160]} />
        <meshBasicMaterial color={palette.pink} transparent opacity={light ? 0.5 : 0.45} />
      </mesh>
      <mesh rotation={[0.35, 0.4, 0]}>
        <torusGeometry args={[2.7, 0.004, 8, 160]} />
        <meshBasicMaterial color={palette.blue} transparent opacity={light ? 0.45 : 0.35} />
      </mesh>
    </group>
  );
}

/** Small seeded PRNG so the particle cloud is deterministic across renders. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function createParticleShell(count: number): [Float32Array, Float32Array] {
  const random = mulberry32(1986);
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const tones = [new Color(palette.blue), new Color(palette.pink), new Color(palette.orange)];
  for (let i = 0; i < count; i++) {
    // Points on a thick spherical shell around the blob.
    const radius = 2.4 + random() * 2.6;
    const theta = random() * Math.PI * 2;
    const phi = Math.acos(2 * random() - 1);
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
    const tone = tones[i % tones.length]!;
    colors[i * 3] = tone.r;
    colors[i * 3 + 1] = tone.g;
    colors[i * 3 + 2] = tone.b;
  }
  return [positions, colors];
}

function Particles({ light, count = 900 }: Pick<SceneProps, 'light'> & { count?: number }) {
  const points = useRef<Points>(null);
  const [positions, colors] = useMemo(() => createParticleShell(count), [count]);

  useFrame((state, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.03;
    points.current.rotation.x = MathUtils.lerp(
      points.current.rotation.x,
      state.pointer.y * 0.2,
      0.02,
    );
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        vertexColors
        transparent
        opacity={light ? 0.9 : 0.8}
        sizeAttenuation
        depthWrite={false}
        blending={light ? NormalBlending : AdditiveBlending}
      />
    </points>
  );
}

interface HeroSceneProps extends SceneProps {
  active: boolean;
}

export default function HeroScene({ scrollRef, light, active }: HeroSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={active ? 'always' : 'never'}
      // Track the pointer across the whole page, so the canvas itself never blocks clicks.
      eventSource={document.body}
      eventPrefix="client"
      aria-hidden
    >
      <Blob scrollRef={scrollRef} />
      <Rings light={light} />
      <Particles light={light} />
    </Canvas>
  );
}
