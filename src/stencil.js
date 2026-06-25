import * as THREE from "three";

// Маска окна (невидимая плоскость)
export const MagicWindow = function () {
  const maskMaterial = new THREE.MeshBasicMaterial({
    colorWrite: false, // Не рисуем цвет
    stencilWrite: true,
    stencilRef: 1, // Пишем 1 в буфер
    stencilFunc: THREE.AlwaysStencilFunc,
    stencilFail: THREE.KeepStencilOp,
    stencilZFail: THREE.KeepStencilOp,
    stencilZPass: THREE.ReplaceStencilOp, // Заменяем значения
  });
  const magicWindow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.1, 1.6),
    maskMaterial,
  );
  magicWindow.position.set(-2.3, 0.85, -0.01);
  return magicWindow;
};

// Внутренний мир (отображается только в маске)
export const InnerWorld = function (magicWindow) {
  const innerObject = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshNormalMaterial(),
  );
  // Настройка материала на проверку трафарета
  innerObject.material.stencilWrite = true;
  innerObject.material.stencilFunc = THREE.EqualStencilFunc; // Сравнение с 1
  innerObject.material.stencilRef = 1;
  magicWindow.add(innerObject);
  return innerObject;
};
