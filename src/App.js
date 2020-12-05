import React, { useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Canvas, extend } from 'react-three-fiber';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { GlitchPass } from './GlitchPass';
import Effect from './Effect';
import Geometry from './Geometry';

extend({ EffectComposer, RenderPass, UnrealBloomPass, GlitchPass });

const App = () => {
  const mouse = useRef([0, 0]);
  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }) =>
      (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]),
    []
  );
  const [grayScale, setGrayScale] = useState(false);

  return (
    <Canvas
      camera={{ position: [0, 0, 100] }}
      style={{ height: '100vh', width: '100vw' }}
      onMouseMove={onMouseMove}
      onMouseDown={() => setGrayScale(true)}
      onMouseUp={() => setGrayScale(false)}
      onCreated={({ gl }) => {
        gl.setClearColor(new THREE.Color('#2b1b33'));
      }}
    >
      <fog attach="fog" args={['black', 50, 200]} />
      <pointLight distance={100} intensity={4} color="white" />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <Geometry mouse={mouse} />
      <Effect grayScale={grayScale} />
    </Canvas>
  );
};

export default App;
