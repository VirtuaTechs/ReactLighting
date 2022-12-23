/* eslint-disable */
import * as THREE from 'three'
import * as React from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { OrbitControls, SpotLight, useGLTF } from '@react-three/drei'


export class ModelLoader extends React.Component {
   Box({ ...props }) {

    const fbx = useGLTF('./Cup3.glb');
    fbx.scene.position.set({ ...props }.position[0], { ...props }.position[1], { ...props }.position[2]);
    fbx.scene.scale.set({ ...props }.scale[0], { ...props }.scale[1], { ...props }.scale[2]);
  
    return <primitive object={fbx.scene} />
  
  }
  
  render() {
    return (
      <Canvas shadows dpr={[1, 2]} camera={{ position: [-1, 2, 6], fov: 50, near: 1, far: 20 }}>
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#222222', 5, 20]} />
        <ambientLight intensity={0.015} />
        <this.Box position={[0, -1, 0]} scale={[10, 10, 10]} />
        <this.SpotLightMoving color="#0c8cbf" position={[-3, 3, 2]} />
        <this.SpotLightMoving color="#b00c3f" position={[1, 3, 0]} />
 
        <OrbitControls maxPolarAngle={Math.PI / 2} minPolarAngle={0} />
  
      </Canvas>
    )
  }
  
  SpotLightMoving({ vec = new THREE.Vector3(), ...props }) {
    const light = React.useRef(null!)
    const viewport = useThree((state) => state.viewport)
    useFrame((state) => {
      const lightObject = light.current as THREE.SpotLight;
      lightObject.target.position.lerp(vec.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0), 0.1)
      lightObject.target.updateMatrixWorld()
    })
    return <SpotLight getWorldDirection={undefined} updateMatrixWorld={undefined} toJSON={undefined} visible={undefined} id={undefined} uuid={undefined} name={undefined} parent={undefined} modelViewMatrix={undefined} normalMatrix={undefined} matrixWorld={undefined} matrixAutoUpdate={undefined} matrixWorldNeedsUpdate={undefined} receiveShadow={undefined} frustumCulled={undefined} renderOrder={undefined} animations={undefined} userData={undefined} customDepthMaterial={undefined} customDistanceMaterial={undefined} isObject3D={undefined} onBeforeRender={undefined} onAfterRender={undefined} applyMatrix4={undefined} applyQuaternion={undefined} setRotationFromAxisAngle={undefined} setRotationFromEuler={undefined} setRotationFromMatrix={undefined} setRotationFromQuaternion={undefined} rotateOnAxis={undefined} rotateOnWorldAxis={undefined} rotateX={undefined} rotateY={undefined} rotateZ={undefined} translateOnAxis={undefined} translateX={undefined} translateY={undefined} translateZ={undefined} localToWorld={undefined} worldToLocal={undefined} lookAt={undefined} add={undefined} remove={undefined} removeFromParent={undefined} clear={undefined} getObjectById={undefined} getObjectByName={undefined} getObjectByProperty={undefined} getWorldPosition={undefined} getWorldQuaternion={undefined} getWorldScale={undefined} raycast={undefined} traverse={undefined} traverseVisible={undefined} traverseAncestors={undefined} updateMatrix={undefined} updateWorldMatrix={undefined} clone={undefined} copy={undefined} addEventListener={undefined} hasEventListener={undefined} removeEventListener={undefined} dispatchEvent={undefined} ref={light} castShadow penumbra={1} distance={6} angle={0.35} attenuation={5} anglePower={4} intensity={2} {...props} />
  }

}

export default ModelLoader;
