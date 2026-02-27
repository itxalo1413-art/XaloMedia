import { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Particle Field ───────────────────────────────────────── */
const PARTICLE_COUNT = 180;

const Particles = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const { viewport } = useThree();

  // Generate random particle positions & properties
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 8,
        ),
        speed: 0.2 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2,
        scale: 0.008 + Math.random() * 0.018,
      });
    }
    return temp;
  }, []);

  // Color palette: #93D8FF → #0081C9 → white
  const colors = useMemo(() => {
    const c1 = new THREE.Color('#93D8FF');
    const c2 = new THREE.Color('#0081C9');
    const c3 = new THREE.Color('#ffffff');
    return [c1, c2, c3];
  }, []);

  // Track mouse
  const handlePointerMove = useCallback(
    (e: { clientX: number; clientY: number }) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    },
    [],
  );

  // Track scroll
  useMemo(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY / window.innerHeight;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handlePointerMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handlePointerMove);
    };
  }, [handlePointerMove]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colorArray = useMemo(() => new Float32Array(PARTICLE_COUNT * 3), []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const scroll = scrollRef.current;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    particles.forEach((p, i) => {
      // Floating motion
      const x =
        p.position.x +
        Math.sin(time * p.speed + p.offset) * 0.3 +
        mx * 0.4 * (1 - i / PARTICLE_COUNT);
      const y =
        p.position.y +
        Math.cos(time * p.speed * 0.7 + p.offset) * 0.2 +
        my * 0.3 * (1 - i / PARTICLE_COUNT);
      const z =
        p.position.z + Math.sin(time * 0.3 + p.offset) * 0.5 - scroll * 3; // Scroll → particles move back

      const scale = p.scale * (1 + Math.sin(time * 0.5 + p.offset) * 0.3);

      dummy.position.set(x, y, z);
      dummy.scale.setScalar(scale * viewport.width * 0.3);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // Color interpolation based on position
      const t = (z + 4) / 8; // normalize z to 0-1
      const colorIdx = Math.max(0, Math.min(1, t));
      const color =
        colorIdx < 0.5
          ? colors[0].clone().lerp(colors[1], colorIdx * 2)
          : colors[1].clone().lerp(colors[2], (colorIdx - 0.5) * 2);

      colorArray[i * 3] = color.r;
      colorArray[i * 3 + 1] = color.g;
      colorArray[i * 3 + 2] = color.b;
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    // Update instance colors
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    } else {
      meshRef.current.instanceColor = new THREE.InstancedBufferAttribute(
        colorArray,
        3,
      );
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial transparent opacity={0.35} />
    </instancedMesh>
  );
};

/* ── Glowing Orb ──────────────────────────────────────────── */
const GlowOrb = ({
  position,
  color,
  size,
  speed,
}: {
  position: [number, number, number];
  color: string;
  size: number;
  speed: number;
}) => {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.position.x = position[0] + Math.sin(t * speed) * 1.5;
    ref.current.position.y = position[1] + Math.cos(t * speed * 0.7) * 1;
    ref.current.position.z = position[2] + Math.sin(t * speed * 0.5) * 0.5;
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.05} />
    </mesh>
  );
};

/* ── Main Canvas Component ────────────────────────────────── */
const HeroScene3D = () => {
  return (
    <div className="absolute inset-0 z-0">
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
        {/* Ambient light for soft illumination */}
        <ambientLight intensity={0.5} />

        {/* Particle system */}
        <Particles />

        {/* Floating glow orbs — replaces CSS orbs */}
        <GlowOrb position={[4, 2, -2]} color="#00AEFF" size={2.5} speed={0.3} />
        <GlowOrb
          position={[-3, -2, -1]}
          color="#0066AA"
          size={2}
          speed={0.25}
        />
        <GlowOrb
          position={[1, 0.5, -3]}
          color="#93D8FF"
          size={1.5}
          speed={0.35}
        />
      </Canvas>
    </div>
  );
};

export default HeroScene3D;
