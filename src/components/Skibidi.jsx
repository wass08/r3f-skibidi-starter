import { useAnimations, useGLTF } from "@react-three/drei";
import React, { useEffect, useRef } from "react";

export function Skibidi({ animation, ...props }) {
  const group = useRef();
  const { nodes, scene, animations } = useGLTF(`/models/skibidi.glb`);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    scene.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
      }
    });
  }, [scene]);

  useEffect(() => {
    actions[animation]?.fadeIn(0.5).play();
    return () => actions[animation]?.fadeOut(0.5).stop();
  }, [actions, animation]);
  return (
    <group {...props}>
      <group ref={group} dispose={null}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

useGLTF.preload(`/models/skibidi.glb`);
