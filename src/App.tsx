/* eslint-disable */
import * as THREE from 'three'
import * as React from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { OrbitControls, SpotLight, useGLTF } from '@react-three/drei'

function Box({ ...props }) {

  const fbx = useGLTF('./Cup3.glb')
  fbx.scene.position.set({ ...props }.position[0], { ...props }.position[1], { ...props }.position[2]);
  fbx.scene.scale.set({ ...props }.scale[0], { ...props }.scale[1], { ...props }.scale[2]);

  console.log(fbx.scene.scale);
  return <primitive object={fbx.scene} />

}

export default function App() {
  const [video] = React.useState(() => {
    const vid = document.createElement("video");
    vid.src = './video.mp4';
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    vid.play();
    return vid;
  });

  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [-1, 2, 6], fov: 50, near: 1, far: 20 }}>
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#222222', 5, 20]} />
      <ambientLight intensity={0.015} />
      <Box position={[0, -1, 0]} scale={[10, 10, 10]} />
      <SpotLightMoving color="#0c8cbf" position={[-3, 3, 2]} />
      <SpotLightMoving color="#b00c3f" position={[1, 3, 0]} />
      <mesh rotation={[0, 0, 0]} position={[0, 0, -1.1]}>
        <planeGeometry args={[3, 2]} />
        <meshStandardMaterial emissive={"white"} side={THREE.DoubleSide}>
          <videoTexture attach="map" args={[video]} />
          <videoTexture attach="emissiveMap" args={[video]} />
        </meshStandardMaterial>
      </mesh>

      <OrbitControls maxPolarAngle={Math.PI / 2} minPolarAngle={0} />

    </Canvas>
  )
}

function SpotLightMoving({ vec = new THREE.Vector3(), ...props }) {
  const light = React.useRef(null!)
  const viewport = useThree((state) => state.viewport)
  useFrame((state) => {
    const lightObject = light.current as THREE.SpotLight;
    lightObject.target.position.lerp(vec.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0), 0.1)
    lightObject.target.updateMatrixWorld()
  })
  return <SpotLight ref={light} castShadow penumbra={1} distance={6} angle={0.35} attenuation={5} anglePower={4} intensity={2} {...props} />
}