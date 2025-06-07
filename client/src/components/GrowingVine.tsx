'use client'
import React, { useMemo, useRef, useState, useEffect } from 'react'
import { OrbitControls, Billboard, Text } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// === Emoji Bubble Component ===
function Bubble({ position, emoji }: { position: [number, number, number], emoji: string }) {
  return (
    <group position={position}>
      {/* Transparent bubble sphere */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial
          color="white"
          transparent={true}
          opacity={0.5}
          transmission={1}
          roughness={0.005}
          thickness={0.05}
          metalness={0}
          clearcoat={0.5}
          clearcoatRoughness={0.1}
          depthWrite={false} // Prevent the bubble from occluding the emoji inside
        />
      </mesh>

      {/* Emoji text always facing camera */}
      <Billboard>
        <mesh renderOrder={999}> {/* Force emoji to render on top */}
          <Text
            fontSize={1}
            color="yellow"
            anchorX="center"
            anchorY="middle"
          >
            {emoji}
          </Text>
        </mesh>
      </Billboard>
    </group>
  )
}

// === Twisted Vine Generator ===
function TwistedVine({
  strandCount = 3,
  radius = 0.8,
  tubeRadius = 0.9,
  height = 20,
  onMainCurveReady
}: {
  strandCount?: number
  radius?: number
  tubeRadius?: number
  height?: number
  onMainCurveReady?: (curve: THREE.Curve<THREE.Vector3>) => void
}) {
  const segments = 400
  const mainCurveRef = useRef<THREE.Curve<THREE.Vector3> | null>(null)

  const meshes = useMemo(() => {
    const group: JSX.Element[] = []

    for (let j = 0; j < strandCount; j++) {
      const offset = (Math.PI * 2 * j) / strandCount
      const points: THREE.Vector3[] = []

      for (let i = 0; i < segments; i++) {
        const t = i / segments

        const globalX = Math.sin(t * Math.PI * 2) * 1.0
        const globalZ = Math.cos(t * Math.PI * 3) * 0.6

        const wiggleX = Math.sin(t * Math.PI * 12 + j) * 0.1
        const wiggleZ = Math.cos(t * Math.PI * 8 + j) * 0.1

        const angle = t * Math.PI * 6 + offset
        const spiralX = Math.cos(angle) * radius
        const spiralZ = Math.sin(angle) * radius

        const x = spiralX + wiggleX + globalX
        const y = t * height - height / 2
        const z = spiralZ + wiggleZ + globalZ

        points.push(new THREE.Vector3(x, y, z))
      }

      const curve = new THREE.CatmullRomCurve3(points)
      if (j === 0) mainCurveRef.current = curve

      const geometry = new THREE.TubeGeometry(curve, segments, tubeRadius, 12, false)
      const posAttr = geometry.attributes.position

      for (let i = 0; i < posAttr.count; i++) {
        const y = posAttr.getY(i)
        const offset = Math.sin(y * 5) * 0.5 + Math.random() * 0.16
        posAttr.setX(i, posAttr.getX(i) + offset * 0.2)
        posAttr.setZ(i, posAttr.getZ(i) + offset * 0.2)
      }

      posAttr.needsUpdate = true
      geometry.computeVertexNormals()

      const material = new THREE.MeshStandardMaterial({
        color: 'darkgreen',
        roughness: 0.85,
        metalness: 0.05,
        flatShading: false
      })

      group.push(<mesh key={j} geometry={geometry} material={material} />)
    }

    return group
  }, [strandCount, radius, tubeRadius, height])

  useEffect(() => {
    if (mainCurveRef.current && onMainCurveReady) {
      onMainCurveReady(mainCurveRef.current)
    }
  }, [onMainCurveReady])

  return <>{meshes}</>
}

// === Scene Root ===
export default function GrowingVine() {
  const controlsRef = useRef<any>(null)
  const lightRef = useRef<THREE.DirectionalLight>(null!)
  const camera = useThree((state) => state.camera)
  const [mainCurve, setMainCurve] = useState<THREE.Curve<THREE.Vector3> | null>(null)

  // Keep light in top-left relative to camera
  useFrame(() => {
    if (lightRef.current && camera) {
      const direction = new THREE.Vector3()
      camera.getWorldDirection(direction)

      const up = new THREE.Vector3(0, 1, 0)
      const left = new THREE.Vector3().crossVectors(up, direction).normalize()
      const topLeft = new THREE.Vector3().addVectors(left.multiplyScalar(10), up.clone().multiplyScalar(10))
      const lightPos = camera.position.clone().add(direction).add(topLeft)

      lightRef.current.position.copy(lightPos)
      lightRef.current.target.position.copy(camera.position)
      lightRef.current.target.updateMatrixWorld()
    }
  })

  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight ref={lightRef} intensity={1.5} castShadow />
      <directionalLight position={[10, 10, -10]} intensity={0.3} />

      <OrbitControls
        ref={controlsRef}
        enableRotate
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />

      <TwistedVine onMainCurveReady={setMainCurve} />

      {/* Bubbles spiraling around the vine */}
      {mainCurve &&
        ['😊', '😢', '😴', '🤯', '❤️'].map((emoji, i) => {
          const t = i / 5
          const pos = mainCurve.getPointAt(t)
          const tangent = mainCurve.getTangentAt(t).normalize()

          const up = new THREE.Vector3(5, 1, 0)
          const normal = new THREE.Vector3().crossVectors(tangent, up).normalize()
          const binormal = new THREE.Vector3().crossVectors(tangent, normal).normalize()

          const angle = i * Math.PI * 0.7
          const radius = 4

          const offset = new THREE.Vector3()
            .addScaledVector(normal, Math.cos(angle) * radius)
            .addScaledVector(binormal, Math.sin(angle) * radius)

          const bubblePos = pos.clone().add(offset)

          return <Bubble key={i} position={[bubblePos.x, bubblePos.y, bubblePos.z]} emoji={emoji} />
        })}
    </>
  )
}
