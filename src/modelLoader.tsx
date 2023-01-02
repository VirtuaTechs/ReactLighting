/* eslint-disable */
import * as THREE from 'three'
import * as React from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { OrbitControls, SpotLight, useGLTF } from '@react-three/drei'

export class ModelLoader extends React.Component {

  state: {
    how: string;
    model: any;
  };

  constructor(props: any) {
    super(props);
    this.state = { how: "how", model: null };
    this.eventFunction = this.eventFunction.bind(this);
  }

  eventFunction() {
    console.log("The model loaded is: ");
    console.log(this.state.model);
  }

  update(props: any) {
    useFrame(() => {

    });

    return null;
  }

  Box({ ...props }) {
    const fbx = useGLTF('./Cup3.glb');
    fbx.scene.position.set({ ...props }.position[0], { ...props }.position[1], { ...props }.position[2]);
    fbx.scene.scale.set({ ...props }.scale[0], { ...props }.scale[1], { ...props }.scale[2]);

    props.state.model = fbx.scene;

    return <primitive object={fbx.scene} />
  }


  render() {
    return (
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 2, 6], fov: 30, near: 1, far: 200 }}>
        <color attach="background" args={['#dfdfdf']} />
        <ambientLight intensity={0.15} />
        <this.Box position={[0, -1, 0]} scale={[10, 10, 10]} state={this.state} />

        {/* <this.SpotLightMoving color="#0c8cbf" position={[-3, 3, 2]} />
        <this.SpotLightMoving color="#b00c3f" position={[1, 3, 0]} />
        <fog attach="fog" args={['#222222', 5, 20]} /> */}

        <this.update state={this.state} />

        <pointLight color="white" intensity={1} position={[1, 1, 1]} />
        <OrbitControls maxPolarAngle={Math.PI / 2} minPolarAngle={0} />
      </Canvas >
    )
  }

  SpotLightMoving({ vec = new THREE.Vector3(), ...props }) {
    const light = React.useRef(null!)
    const viewport = useThree((state) => state.viewport)
    useFrame((state) => {
      const lightObject = light.current as THREE.SpotLight;
      lightObject.target.position.lerp(vec.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0), 0.1)
      lightObject.target.updateMatrixWorld();
    })
    return <SpotLight ref={light} castShadow penumbra={1} distance={6} angle={0.35} attenuation={5} anglePower={4} intensity={2} {...props} />
  }

}

export default ModelLoader;
