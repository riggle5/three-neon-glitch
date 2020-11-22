import * as THREE from 'three'
import React, { forwardRef, useMemo } from 'react'
import { useLoader, useUpdate } from 'react-three-fiber'
// import bold from './resources/Italic.blob'
// import bold from './resources/halftone_Italic.blob'
import bold from './resources/3d_italic.blob'
// import bold from './resources/chrome_italic.blob'
// import bold from './resources/laser_italic.blob'

const Text = forwardRef(({ children, size = 1, ...props }, ref) => {
  const font = useLoader(THREE.FontLoader, bold)
  const config = useMemo(() => ({ font, size: 37, height: 50, curveSegments: 25, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelOffset: 1, bevelSegments: 0 }), [font])
  const mesh = useUpdate(
    (self) => {
      const windowSize = new THREE.Vector3();
      self.geometry.computeBoundingBox();
      self.geometry.boundingBox.getSize(windowSize);
      // centering
      self.position.x = -windowSize.x / 2;
      self.position.y =  -windowSize.y / 2;
    },
    [children]
  )
  return (
    <group ref={ref} {...props} scale={[0.1 * size, 0.1 * size, 0.1]}>
      <mesh ref={mesh}>
        <textGeometry attach="geometry" args={[children, config]} />
        <meshNormalMaterial />
      </mesh>
    </group>
  )
})

export default Text
