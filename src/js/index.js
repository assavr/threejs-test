import * as THREE from "./Threethree";
import { GLTFLoader } from "./GLTFLoader";

const scene = new THREE.Scene();

const renderSizes = {
  width: window.innerWidth / 2,
  height: window.innerHeight / 2,
};

const camera = new THREE.PerspectiveCamera(
  75,
  renderSizes.width / renderSizes.height,
  1,
  100
);
camera.position.y = -1;
camera.position.z = 10;

//Settings lights
const dlLight = new THREE.DirectionalLight(0xffffff, 3.5);
dlLight.position.set(-1, -1, 2);
scene.add(dlLight);

const aLight = new THREE.AmbientLight(0xec5858, 1.7);
scene.add(aLight);

const hLight = new THREE.HemisphereLight(0x84bac0, 0xffe5e5, 1);
scene.add(hLight);

// Setting renderer
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(renderSizes.width, renderSizes.height);
renderer.domElement.setAttribute("class", "canvas");
document.body.insertBefore(renderer.domElement, document.body.firstChild);

const loader = new GLTFLoader();
let model3D = null;

loader.load("./src/3d-model/scene.gltf", function (gltf) {
  model3D = gltf;
  model3D.scene.scale.set(1.3, 1.3, 1.3);
  model3D.scene.rotation.x = 0.75;

  scene.add(model3D.scene);
});

function animate() {
  requestAnimationFrame(animate);

  if (model3D) {
    model3D.scene.rotation.y += 0.008;
  }
  renderer.render(scene, camera);
}
animate();

renderer.render(scene, camera);

// flex canvas
window.addEventListener("resize", () => {
  renderSizes.width = window.innerWidth / 2;
  renderSizes.height - window.height;
  camera.aspect = renderSizes.width / renderSizes.height;
  camera.updateProjectionMatrix();

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(renderSizes.width, renderSizes.height);
  renderer.render(scene, camera);
});
