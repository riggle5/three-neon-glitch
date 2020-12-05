import React, { useRef, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
import { extend, useFrame, useThree } from 'react-three-fiber';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';
import { GlitchPass } from './GlitchPass';

extend({ EffectComposer, RenderPass, UnrealBloomPass, GlitchPass, FilmPass });

const Effect = ({ grayScale }) => {
  const composer = useRef();
  const [glitch, setGlitch] = useState(false);
  const { scene, gl, size, camera } = useThree();
  const aspect = useMemo(() => new THREE.Vector2(512, 512), []);
  useEffect(() => void composer.current.setSize(size.width, size.height), [size]);
  useFrame(() => composer.current.render(), 1);
  const glitchTimer = setInterval(() => {
    if (!glitch) {
      setGlitch(true);
    } else {
      setGlitch(false);
    }
    clearInterval(glitchTimer);
  }, Math.round(Math.random() * 1200));

  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <unrealBloomPass attachArray="passes" args={[aspect, 1.5, 0.2, 0.5]} />
      {glitch && <filmPass attachArray="passes" args={[0.3, 1, 1800, grayScale]} />}
      <glitchPass attachArray="passes" factor={glitch ? 1 : 0} />
    </effectComposer>
  );
};

export default Effect;
