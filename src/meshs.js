import * as THREE from "three";

export default function () {
  const planeGeometry = new THREE.PlaneGeometry();
  const planeMaterial = new THREE.MeshBasicMaterial({
    color: "slategrey",
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  plane.scale.setScalar(6);

  const portfolio = Frame(-2.3, 0, 0.85, "portfolio");
  const siteViewAnalysis = Frame(-1.15, 0, 0.85, "");
  const configurator3D = Frame(0, 0, 0.85, "");
  const map3D = Frame(1.15, 0, 0.85, "");
  const airFight = Frame(2.3, 0, 0.85, "");

  const group = new THREE.Group();
  group.add(plane);
  group.add(portfolio);
  group.add(siteViewAnalysis);
  group.add(configurator3D);
  group.add(map3D);
  group.add(airFight);
  group.rotateX(THREE.MathUtils.degToRad(-90));
  group.rotateZ(THREE.MathUtils.degToRad(35));
  group.position.y = -0.82;
  return group;
}

function Frame(x, y, z, name) {
  const portalGeometry = new THREE.PlaneGeometry(1.075, 1.618);
  const portalMaterial = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
  });
  const frame = new THREE.Mesh(portalGeometry, portalMaterial);
  frame.name = name;
  frame.castShadow = true;
  frame.position.set(x, y, z);
  frame.rotateX(THREE.MathUtils.degToRad(90));
  return frame;
}
