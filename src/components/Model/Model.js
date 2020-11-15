import React, { useMemo, useState, useRef, useEffect } from 'react';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { useFrame } from 'react-three-fiber';
import * as THREE from 'three';

function Model({ url, color, setIsModelLoaded }) {
  const [obj, set] = useState();
  const ref = useRef();
  useFrame(() => ref.current && (ref.current.rotation.y += 0.02));
  const onModelLoad = (model) => {
    model.traverse(function (child) {
      //This allow us to check if the children is an instance of the Mesh constructor
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial();
        child.material.roughness = 1;
        child.material.metalness = 1;
        child.material.color = new THREE.Color(color);

        //Sometimes there are some vertex normals missing in the .obj files, ThreeJs will compute them
        child.geometry.computeVertexNormals();
        child.castShadow = false;
      }
    });
    set(model);
  };
  useEffect(() => {
    obj &&
      setTimeout(() => {
        setIsModelLoaded(true);
      }, 600);
  }, [obj, setIsModelLoaded]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => new OBJLoader().load(url, onModelLoad), [url]);
  return obj ? <primitive ref={ref} object={obj} position={[0, 0, 0]} /> : null;
}

export default Model;
