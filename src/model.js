import * as THREE from "three";

export const texting = function () {
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const cubeMaterial = new THREE.MeshBasicMaterial({
    color: "red",
    wireframe: true,
  });
  return new THREE.Mesh(cubeGeometry, cubeMaterial);
};
