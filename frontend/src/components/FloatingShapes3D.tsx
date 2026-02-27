import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Wireframe Shape ──────────────────────────────────────── */
const WireframeShape = ({
  geometry,
  position,
  color,
  rotationSpeed,
  floatAmplitude,
  scrollMultiplier,
}: {
  geometry: 'torus' | 'octahedron' | 'icosahedron';
  position: [number, number, number];
  color: string;
  rotationSpeed: number;
  floatAmplitude: number;
  scrollMultiplier: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const scrollFactor = scrollRef.current * 0.001 * scrollMultiplier;

    // Rotation linked to scroll + time
    meshRef.current.rotation.x = t * rotationSpeed * 0.3 + scrollFactor;
    meshRef.current.rotation.y = t * rotationSpeed * 0.5 + scrollFactor * 0.7;
    meshRef.current.rotation.z = t * rotationSpeed * 0.2;

    // Floating motion
    meshRef.current.position.y =
      position[1] + Math.sin(t * 0.5 + position[0]) * floatAmplitude;
    meshRef.current.position.x =
      position[0] + Math.cos(t * 0.3 + position[1]) * floatAmplitude * 0.5;
  });

  const geomElement = useMemo(() => {
    switch (geometry) {
      case 'torus':
        return <torusKnotGeometry args={[0.6, 0.2, 64, 16]} />;
      case 'octahedron':
        return <octahedronGeometry args={[0.8, 0]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[0.7, 0]} />;
    }
  }, [geometry]);

  return (
    <mesh ref={meshRef} position={position}>
      {geomElement}
      <meshBasicMaterial color={color} wireframe transparent opacity={0.12} />
    </mesh>
  );
};

/* ── Connecting Lines (subtle grid network) ───────────────── */
const ConnectionLines = () => {
  const ref = useRef<THREE.LineSegments>(null!);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        ref.current.rotation.z = window.scrollY * 0.0002;
        ref.current.rotation.x = window.scrollY * 0.0001;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const lineGeo = useMemo(() => {
    const points: THREE.Vector3[] = [];
    // Create random connecting lines
    for (let i = 0; i < 15; i++) {
      const x1 = (Math.random() - 0.5) * 12;
      const y1 = (Math.random() - 0.5) * 8;
      const z1 = (Math.random() - 0.5) * 4 - 2;
      const x2 = x1 + (Math.random() - 0.5) * 4;
      const y2 = y1 + (Math.random() - 0.5) * 3;
      const z2 = z1 + (Math.random() - 0.5) * 2;
      points.push(new THREE.Vector3(x1, y1, z1), new THREE.Vector3(x2, y2, z2));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, []);

  return (
    <lineSegments ref={ref}>
      <primitive object={lineGeo} attach="geometry" />
      <lineBasicMaterial color="#0081C9" transparent opacity={0.06} />
    </lineSegments>
  );
};

/* ── Scene Content ────────────────────────────────────────── */
const SceneContent = () => {
  return (
    <>
      {/* Wireframe shapes at different positions */}
      <WireframeShape
        geometry="torus"
        position={[-5, 1, -2]}
        color="#93D8FF"
        rotationSpeed={0.4}
        floatAmplitude={0.5}
        scrollMultiplier={1.2}
      />
      <WireframeShape
        geometry="octahedron"
        position={[5.5, -0.5, -1]}
        color="#0081C9"
        rotationSpeed={0.3}
        floatAmplitude={0.4}
        scrollMultiplier={0.8}
      />
      <WireframeShape
        geometry="icosahedron"
        position={[-3, -2, -3]}
        color="#00AEFF"
        rotationSpeed={0.35}
        floatAmplitude={0.3}
        scrollMultiplier={1.0}
      />
      <WireframeShape
        geometry="torus"
        position={[4, 2.5, -2.5]}
        color="#93D8FF"
        rotationSpeed={0.25}
        floatAmplitude={0.6}
        scrollMultiplier={1.5}
      />
      <WireframeShape
        geometry="octahedron"
        position={[0, 3, -4]}
        color="#0081C9"
        rotationSpeed={0.5}
        floatAmplitude={0.35}
        scrollMultiplier={0.6}
      />

      {/* Subtle connecting lines */}
      <ConnectionLines />
    </>
  );
};

/* ── Main Component ───────────────────────────────────────── */
const FloatingShapes3D = () => {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Only render Canvas when it enters viewport (performance)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { rootMargin: '200px', threshold: 0 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.45 }}
    >
      {visible && (
        <Canvas
          camera={{ position: [0, 0, 6], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          style={{ background: 'transparent' }}
        >
          <SceneContent />
        </Canvas>
      )}
    </div>
  );
};

export default FloatingShapes3D;
