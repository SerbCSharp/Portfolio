import * as THREE from "three";
import { Text } from "troika-three-text";

export const Plane = function () {
  const planeGeometry = new THREE.PlaneGeometry();
  const planeMaterial = new THREE.MeshBasicMaterial({
    color: "slategrey",
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  plane.scale.setScalar(6);
  plane.rotateX(THREE.MathUtils.degToRad(-90));
  return plane;
};

export const Meshs = function () {
  const portfolio = Frame(-2.3, 0.85, 0, "balance");
  const siteViewAnalysis = Frame(-1.15, 0.85, 0, "");
  const configurator3D = Frame(0, 0.85, 0, "");
  const map3D = Frame(1.15, 0.85, 0, "");
  const airFight = Frame(2.3, 0.85, 0, "");

  const group = new THREE.Group();
  group.add(portfolio);
  group.add(siteViewAnalysis);
  group.add(configurator3D);
  group.add(map3D);
  group.add(airFight);
  return group;
};

function Frame(x, y, z, name) {
  const portalGeometry = new THREE.PlaneGeometry(1.1, 1.6);
  const portalMaterial = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
  });
  const frame = new THREE.Mesh(portalGeometry, portalMaterial);
  frame.castShadow = true;
  frame.position.set(x, y, z);
  frame.add(FrameText(name));
  return frame;
}

const FrameText = function (name) {
  const frameText = new Text();
  frameText.fontSize = 0.1;
  frameText.position.z = 0.01;
  frameText.color = "black";
  frameText.anchorX = "center";
  frameText.anchorY = -0.7;
  frameText.text = name;
  frameText.sync();
  return frameText;
};
