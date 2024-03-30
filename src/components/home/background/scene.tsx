import { Center, useHelper } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { getProject } from '@theatre/core';
import { SheetProvider, editable as e } from '@theatre/r3f';
import extension from '@theatre/r3f/dist/extension';
import studio from '@theatre/studio';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { SpotLight, SpotLightHelper } from 'three';
import state from './theatre-state.json';

if (import.meta.env.DEV) {
    studio.initialize();
    studio.extend(extension);
}

const sheet = getProject('rileyflynn.me', { state }).sheet('home');

function Scene() {
    const lightRef = useRef<SpotLight>();
    // @ts-ignore
    useHelper(lightRef, SpotLightHelper);
    const meshRef = useRef<THREE.Mesh>();

    const [intensity, setIntensity] = useState(0);

    useFrame(() => {
        if (intensity === 2) {
            return;
        }

        setIntensity((prev) => Math.min(prev + 0.05, 2));
    });

    useEffect(() => {
        const contentDiv = document.getElementById('content')!;

        if (contentDiv === null) {
            return;
        }

        sheet.sequence.position = contentDiv.scrollTop / window.innerHeight;

        function handleScroll() {
            sheet.sequence.position = contentDiv.scrollTop / window.innerHeight;
        }

        contentDiv.addEventListener('scroll', handleScroll);
        return () => contentDiv.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <SheetProvider sheet={sheet}>
            <e.spotLight
                position={[5, 3, 0]}
                scale={[1, 1, 1]}
                theatreKey="test"
                castShadow
                // @ts-ignore
                ref={lightRef}
                target={meshRef.current}
                intensity={intensity}
                penumbra={1}
                angle={0.25}
            />

            <Center>
                {/* @ts-ignore */}
                <e.mesh theatreKey="cube" castShadow ref={meshRef}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color="orange" />
                </e.mesh>
            </Center>
            <e.mesh theatreKey="floor" position={[0, -0.5, 0]} receiveShadow>
                <boxGeometry args={[10, 0.1, 10]} />
                <meshStandardMaterial color="#303030" />
            </e.mesh>
        </SheetProvider>
    );
}

export default function BackgroundCanvas() {
    return (
        <Canvas shadows camera={{ position: [2.5, 1.5, -1.5] }}>
            <Scene />
        </Canvas>
    );
}
