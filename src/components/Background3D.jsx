import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

function StarField(props) {
    const ref = useRef();
    // Generate 2000 random points in a sphere
    // Using Float32Array for performance
    const sphere = useMemo(() => {
        const data = new Float32Array(5000 * 3);
        // maath random generator
        return random.inSphere(data, { radius: 1.2 });
    }, []);

    useFrame((state, delta) => {
        // Rotate the entire starfield slowly
        // Check if ref.current exists to avoid errors on unmount
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#8b5cf6" // Violet to match theme
                    size={0.003} // Slightly larger for visibility
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={2} // Additive blending
                />
            </Points>
        </group>
    );
}

const Background3D = () => {
    return (
        <div className="canvas-container">
            <Canvas camera={{ position: [0, 0, 1] }}>
                {/* Add fog to fade out distant particles for depth */}
                {/* <fog attach="fog" args={['#0f0f1a', 1, 3]} /> */}
                <StarField />
            </Canvas>
        </div>
    );
};

export default Background3D;
