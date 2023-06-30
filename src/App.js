import React, { useMemo } from 'react';
import * as THREE from 'three';

import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, Float, Html, OrbitControls } from '@react-three/drei'
import { MathUtils } from 'three'
import {  Project } from './components';
import './style.css';


const material = new THREE.MeshStandardMaterial(); 

// creating a variety of shapes within an array
const geometries = [
  {geometry: new THREE.TetrahedronGeometry(2)},
  {geometry: new THREE.OctahedronGeometry(2)},
  {geometry: new THREE.IcosahedronGeometry(2)},
  {geometry: new THREE.DodecahedronGeometry(2, 0)},
]

// fucntion to randomize 50 different shapes to be rendered onto the screen 
function GEOS () {
  const amount = 45;
  const randomizeGeo = useMemo(() => Array.from({length: amount}, () => geometries[Math.floor(Math.random()*geometries.length)]), []);
  return randomizeGeo.map((prop) => {
    return (
      <Float>
        <mesh 
          scale={MathUtils.randFloat(0.25, 0.5)}
          position={[MathUtils.randFloat(-10, 10), MathUtils.randFloat(-10, 10), MathUtils.randFloat(-10, 10)]}
          geometry={prop.geometry}
          material={material}
        />
      </Float>
    )
  })
}


function App() {
  return (
    <div className="App">
    <Canvas camera={{position: [1, 0, 22.5]}}>
      
      <Float floatIntensity={10} rotationIntensity={1}>
        <Html receiveShadow castShadow transform>
        <iframe title="embed" 
            width={1920} 
            height={1080} 
            src="https://alwesson.github.io/port-simple/" 
            />
        </Html>
      </Float>
      <GEOS />
      <Environment background preset='lobby' blur={0.8} />
      <OrbitControls />
      <ContactShadows position={[0, -9, 0]} opacity={0.7} scale={40} blur={1} />
    </Canvas>
    </div>
  );
}

export default App;
