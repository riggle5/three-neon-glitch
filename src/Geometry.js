import React, { useRef, Suspense } from 'react';
import { extend, useFrame, useThree } from 'react-three-fiber';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { GlitchPass } from './GlitchPass';
import Text from './Text';
import lerp from './utils/lerp';

extend({ EffectComposer, RenderPass, UnrealBloomPass, GlitchPass });

const Geometry = ({ mouse }) => {
  const ref = useRef();
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  useFrame(() => {
    if (ref.current) {
      console.log(mouse.current);
      ref.current.position.x = lerp(ref.current.position.x, mouse.current[0] / aspect / 50, 0.1);
      ref.current.rotation.x = lerp(
        ref.current.rotation.x,
        0 + mouse.current[1] / aspect / 100,
        0.1
      );
      ref.current.rotation.y = lerp(
        ref.current.rotation.y,
        0 + mouse.current[0] / aspect / 400,
        0.1
      );
    }
  });
  return (
    <Suspense fallback={null}>
      <group ref={ref}>
        <Text position={[0, 0, 0]} size={5}>
          GLITCH
        </Text>
      </group>
    </Suspense>
  );
};

export default Geometry;
