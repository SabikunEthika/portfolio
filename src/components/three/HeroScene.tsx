
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { Group, MathUtils } from "three";

function Sculpture() {
  const group = useRef<Group>(null);

  useFrame(({ pointer }, delta) => {
    if (!group.current) return;

    group.current.rotation.y = MathUtils.damp(
      group.current.rotation.y,
      pointer.x * 0.45,
      3,
      delta
    );

    group.current.rotation.x = MathUtils.damp(
      group.current.rotation.x,
      -pointer.y * 0.3,
      3,
      delta
    );

    group.current.rotation.z += delta * 0.08;
  });

  return (
    <group ref={group}>
      <Float
        speed={1.5}
        rotationIntensity={0.25}
        floatIntensity={0.45}
      >
        {/* Main metallic sculpture */}
        <mesh>
          <torusKnotGeometry args={[0.85, 0.25, 180, 24]} />
          <meshPhysicalMaterial
            color="#81434A"
            metalness={0.8}
            roughness={0.2}
            clearcoat={1}
          />
        </mesh>

        {/* Outer brass ring */}
        <mesh rotation={[0.8, 0.2, 0.4]}>
          <torusGeometry args={[1.45, 0.012, 16, 120]} />
          <meshStandardMaterial
            color="#A48A65"
            metalness={0.9}
            roughness={0.25}
          />
        </mesh>

        {/* Second orbit */}
        <mesh rotation={[1.2, 0.8, 0.2]}>
          <torusGeometry args={[1.7, 0.008, 12, 120]} />
          <meshStandardMaterial
            color="#925D61"
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>

        {/* Central sphere */}
        <mesh scale={0.3}>
          <icosahedronGeometry args={[1, 2]} />
          <meshPhysicalMaterial
            color="#D8CBB5"
            metalness={0.65}
            roughness={0.18}
          />
        </mesh>
      </Float>
    </group>
  );
}

function HeroScene() {
  return (
    <div className="hero-3d-scene">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.2} />

        <pointLight
          position={[4, 4, 4]}
          intensity={35}
          color="#D8CBB5"
        />

        <pointLight
          position={[-4, -2, 2]}
          intensity={20}
          color="#81434A"
        />

        <Sculpture />

        <Stars
          radius={5}
          depth={2}
          count={100}
          factor={1.2}
          saturation={0}
          fade
          speed={0.5}
        />
      </Canvas>
    </div>
  );
}

export default HeroScene;
