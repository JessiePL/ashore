'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// TreePage renders a 3D canvas with a glowing emoji-like sphere
export default function TreePage() {
  return (
    <div style={{ height: '100vh', backgroundColor: '#eef' }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        {/* Ambient light for soft overall lighting */}
        <ambientLight intensity={0.5} />

        {/* Point light to give directional lighting */}
        <pointLight position={[10, 10, 10]} />

        {/* 3D sphere to represent a mood bubble */}
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="lightblue" />
        </mesh>

        {/* Enable orbit controls to allow mouse interaction */}
        <OrbitControls />
      </Canvas>
    </div>
  );
}
