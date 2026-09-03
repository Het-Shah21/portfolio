"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";

function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create random nodes for the AI/Data pipeline visualization
  const particleCount = 75;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 8; // Spread across an 8x8x8 area
    }
    return pos;
  }, [particleCount]);

  // Create connections (lines) between close nodes to form a mesh
  const linesGeometry = useMemo(() => {
    const points = [];
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const x1 = positions[i * 3], y1 = positions[i * 3 + 1], z1 = positions[i * 3 + 2];
        const x2 = positions[j * 3], y2 = positions[j * 3 + 1], z2 = positions[j * 3 + 2];
        const dist = Math.sqrt((x1-x2)**2 + (y1-y2)**2 + (z1-z2)**2);
        
        if (dist < 2.5) { // Only connect if close enough
          points.push(new THREE.Vector3(x1, y1, z1));
          points.push(new THREE.Vector3(x2, y2, z2));
        }
      }
    }
    const geom = new THREE.BufferGeometry().setFromPoints(points);
    return geom;
  }, [positions, particleCount]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
      groupRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Neural Nodes / Data Points */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.12} color="#0ea5e9" transparent opacity={0.8} />
      </points>
      
      {/* Pipeline Connections */}
      <lineSegments geometry={linesGeometry}>
        <lineBasicMaterial color="#0284c7" transparent opacity={0.25} />
      </lineSegments>
    </group>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0 bg-slate-950">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <NeuralNetwork />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.5} 
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
