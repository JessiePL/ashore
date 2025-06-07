'use client';
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import GrowingVine from '@/components/GrowingVine'

export default function App() {
  return (
    <Canvas 
    camera={{ position: [0, 0, 20], fov: 45 }}
    style={{
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
    zIndex: 0,
    background: 'transparent'
  }}
  >
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} />
      <GrowingVine />
    </Canvas>
  )
}
