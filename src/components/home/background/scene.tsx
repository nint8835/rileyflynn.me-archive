import { CameraControls, Center, PerspectiveCamera, useHelper } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { getProject } from '@theatre/core';
import { SheetProvider, editable as e } from '@theatre/r3f';
import extension from '@theatre/r3f/dist/extension';
import studio from '@theatre/studio';
import { useRef } from 'react';
import * as THREE from 'three';
import { SpotLight, SpotLightHelper } from 'three';

if (import.meta.env.DEV) {
    studio.initialize();
    studio.extend(extension);
}

const sheet = getProject('rileyflynn.me').sheet('home');

function TestScene({
    canvasRef,
    cameraRef,
}: {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    cameraRef: React.RefObject<THREE.PerspectiveCamera>;
}) {
    const lightRef = useRef<SpotLight>();
    useHelper(lightRef, SpotLightHelper);
    const meshRef = useRef<THREE.Mesh>();

    return (
        <SheetProvider sheet={sheet}>
            <e.spotLight
                position={[5, 3, 0]}
                scale={[1, 0.8, 1]}
                theatreKey="test"
                castShadow
                ref={lightRef}
                target={meshRef.current}
                intensity={2}
                penumbra={1}
                angle={0.25}
            />
            <Center>
                <mesh castShadow ref={meshRef}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color="orange" />
                </mesh>
            </Center>
            <e.mesh theatreKey="floor" position={[0, -0.5, 0]} receiveShadow>
                <boxGeometry args={[10, 0.1, 10]} />
                <meshStandardMaterial color="grey" />
            </e.mesh>
        </SheetProvider>
    );
}

export function Scene() {
    return (
        <Canvas shadows>
            <CameraControls makeDefault />
            <PerspectiveCamera makeDefault position={[5, 10, 0]} />
            <TestScene />
        </Canvas>
    );
}
