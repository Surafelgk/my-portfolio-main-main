"use client";

import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

function MeshComponent() {
  const fileUrl = "/avatar3d/avatar.gltf"; 
  const meshRef = useRef<THREE.Group>(null);
  const gltf = useLoader(GLTFLoader, fileUrl);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <primitive
      object={gltf.scene}
      ref={meshRef}
      scale={1.5}
      position={[0, -1, 0]}
    />
  );
}

export function AvatarCanvas() {
  return (
    <div className='fixed bottom-4 right-4 w-24 h-24'>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls enableZoom={false} />
        <MeshComponent />
      </Canvas>
    </div>
  );
}
