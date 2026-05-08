import * as THREE from "three";

export const Meshs = function () {
  const planeGeometry = new THREE.PlaneGeometry();
  const planeMaterial = new THREE.MeshBasicMaterial({
    color: "slategrey",
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  plane.scale.setScalar(6);

  const portal = Frame(-2.3, 0, 0.85);
  const microservice = Frame(-1.15, 0, 0.85);
  const siteViewAnalysis = Frame(0, 0, 0.85);
  const telegramBot = Frame(1.15, 0, 0.85);
  const r3F = Frame(2.3, 0, 0.85);

  const group = new THREE.Group();
  group.add(plane);
  group.add(portal);
  group.add(microservice);
  group.add(siteViewAnalysis);
  group.add(telegramBot);
  group.add(r3F);
  group.rotateX(-Math.PI * 0.5);
  group.position.y = -0.82;
  return group;
};

function Frame(x, y, z) {
  const portalGeometry = new THREE.PlaneGeometry(1.075, 1.618);
  const portalMaterial = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
  });
  const frame = new THREE.Mesh(portalGeometry, portalMaterial);
  frame.castShadow = true;
  frame.position.set(x, y, z);
  frame.rotateX(Math.PI * 0.5);
  return frame;
}
