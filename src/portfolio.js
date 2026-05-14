import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Meshs from "./meshs.js";
import { DragControls } from "three/examples/jsm/controls/DragControls.js";

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const meshs = Meshs();
scene.add(meshs);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  200,
);
camera.position.z = 3.5;

// initialize the renderer
const canvas = document.querySelector(".threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// instantiate the controls
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

// Объекты, которые можно перетаскивать
const objects = [meshs.children[1], meshs.children[6]];

const controls = new DragControls(
  objects, // Список объектов
  camera, // Камера
  renderer.domElement, // Элемент холста
);

// Отключение OrbitControls при начале перетаскивания (важно!)
controls.addEventListener("dragstart", function (event) {
  orbitControls.enabled = false;
});

// Включение OrbitControls обратно
controls.addEventListener("dragend", function (event) {
  orbitControls.enabled = true;
});

controls.addEventListener("drag", function (event) {
  // Ограничиваем движение по высоте (y = 0.5)
  event.object.position.z = 1;
});
const clock = new THREE.Clock();
let previousTime = 0;

// render the scene
const renderloop = () => {
  const currentTime = clock.getElapsedTime();
  const delta = currentTime - previousTime;
  previousTime = currentTime;

  // meshs.rotation.y += THREE.MathUtils.degToRad(1) * delta * 20;
  // meshs.children[2].scale.y = Math.sin(currentTime);
  // meshs.children[2].position.y = Math.sin(currentTime);

  orbitControls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
