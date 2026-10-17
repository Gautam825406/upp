import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

function AcademyBooks() {
  const books = [
    { position: [-4.2, 0.8, -1.5], color: '#ffc24b', scale: 1 },
    { position: [3.5, -0.5, -2], color: '#8b7bff', scale: 0.85 },
    { position: [-2.5, -1.8, 0.5], color: '#22d3ee', scale: 0.7 },
    { position: [5, 2, -3], color: '#34d399', scale: 0.6 },
    { position: [-5.5, 2.2, -2.5], color: '#ffc24b', scale: 0.75 },
  ] as const;

  return (
    <>
      {books.map((book, i) => (
        <Float
          key={i}
          speed={1.5}
          rotationIntensity={0.6}
          floatIntensity={1.2}
          position={book.position as [number, number, number]}
        >
          <mesh scale={book.scale} rotation={[0.3 * (i % 2), 0, -0.2]}>
            <boxGeometry args={[0.9, 1.3, 0.12]} />
            <meshStandardMaterial
              color={book.color}
              roughness={0.35}
              metalness={0.15}
              transparent
              opacity={0.72}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function AcademyTorusKnot() {
  return (
    <Float speed={0.8} rotationIntensity={0.4} floatIntensity={0.5} position={[0, 0, -4]}>
      <mesh scale={1.6}>
        <torusKnotGeometry args={[0.75, 0.24, 200, 32, 2, 3]} />
        <meshStandardMaterial
          color="#8b7bff"
          roughness={0.2}
          metalness={0.7}
          transparent
          opacity={0.35}
        />
      </mesh>
    </Float>
  );
}

function AcademyParticles() {
  const count = 900;
  const positions = useRef<Float32Array | null>(null);

  if (!positions.current) {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    positions.current = arr;
  }

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.current, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffc24b"
        size={0.025}
        sizeAttenuation
        transparent
        opacity={0.55}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const time = useRef(0);

  useFrame((_, delta) => {
    time.current += delta * 0.04;
    camera.position.x = Math.sin(time.current) * 0.4;
    camera.position.y = Math.cos(time.current * 0.8) * 0.2;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function SceneVisibilityGate() {
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry?.isIntersecting ?? false),
      { threshold: 0.02 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
        frameloop={visible ? 'always' : 'never'}
        camera={{ position: [0, 0, 6], fov: 48 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 8, 6]} intensity={1.1} color="#ffe3a3" />
        <pointLight position={[-5, -3, 4]} intensity={0.5} color="#8b7bff" />
        <AcademyTorusKnot />
        <AcademyBooks />
        <AcademyParticles />
        <CameraRig />
      </Canvas>
    </div>
  );
}

export default function AcademyScene() {
  if (typeof window === 'undefined') return null;
  return <SceneVisibilityGate />;
}
