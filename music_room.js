import * as THREE from './node_modules/three/build/three.module.js';
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';
// Create a scene (holds everything: models, lights, etc.)
const scene = new THREE.Scene();

// Create a camera (defines your point of view)
const camera = new THREE.PerspectiveCamera(
  75, // Field of view
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1, // Near clipping
  100 // Far clipping
);
camera.position.set(0, 0, 10); // Move camera back a bit

// Set up renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add light
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// ✅ Create GLTF loader (you missed the parentheses!)
const loader = new THREE.GLTFLoader();

// Load model
loader.load(
  "turntable.glb",
  (gltf) => {
    const model = gltf.scene;
    scene.add(model);
    model.position.set(0, 0, 0);
    model.scale.set(1, 1, 1);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error) => {
    console.error("An error happened while loading:", error);
  }
);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Optional: handle window resizing
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
