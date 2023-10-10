var scene, camera, cameraCtrl, renderer;

const nbTrucs = 1;
const nbObjects = 25, objectMinRadius = 1, objectRadiusCoef = 1.5, objectThickness = 0.5, objectDepth = 0.5;
const animationDuration = 9, animationDelay = 0.1;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
  cameraCtrl = new THREE.OrbitControls(camera);
  // cameraCtrl.autoRotate = true;
  // cameraCtrl.autoRotateSpeed = 5;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  initScene();

  onWindowResize();
  window.addEventListener('resize', onWindowResize, false);

  animate();
};

function initScene() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  this.initLights();

  camera.position.z = 75;

  for (var i = 0; i < nbTrucs; i++) {
    var truc = new Truc();
    scene.add(truc.o3d);
  }
}

function initLights() {
  const lightIntensity = 0.5;
  const lightDistance = 200;

  scene.add(new THREE.AmbientLight(0xeeeeee));

  var light;

  light = new THREE.PointLight(randomColor({ luminosity: 'light' }), lightIntensity, lightDistance);
  light.position.set(0, 100, 0);
  scene.add(light);
  light = new THREE.PointLight(randomColor({ luminosity: 'light' }), lightIntensity, lightDistance);
  light.position.set(0, -100, 0);
  scene.add(light);

  light = new THREE.PointLight(randomColor({ luminosity: 'light' }), lightIntensity, lightDistance);
  light.position.set(100, 0, 0);
  scene.add(light);
  light = new THREE.PointLight(randomColor({ luminosity: 'light' }), lightIntensity, lightDistance);
  light.position.set(-100, 0, 0);
  scene.add(light);

  light = new THREE.PointLight(randomColor({ luminosity: 'light' }), lightIntensity, lightDistance);
  light.position.set(0, 0, 100);
  scene.add(light);
  light = new THREE.PointLight(randomColor({ luminosity: 'light' }), lightIntensity, lightDistance);
  light.position.set(0, 0, -100);
  scene.add(light);
}

function animate() {
  requestAnimationFrame(animate);

  cameraCtrl.update();

  renderer.render(scene, camera);
};

function Truc() {
  this.init();
}

Truc.prototype.init = function () {
  this.o3d = new THREE.Object3D();
  var material = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4, metalness: 0.9 });

  for (var i = 0; i < nbObjects; i++) {
    var geometry = triangleGeometry(objectMinRadius + objectRadiusCoef * i, objectThickness, objectDepth);
    var mesh = new THREE.Mesh(geometry, material);

    TweenMax.to(mesh.rotation, animationDuration, {
      // x: Math.PI * 2,
      y: Math.PI * 2,
      z: Math.PI * 2,
      ease: Power1.easeInOut,
      repeat: -1,
      yoyo: true,
      delay: i * animationDelay
    });

    this.o3d.add(mesh);
  }
};

function triangleGeometry(radius, thickness, depth) {
  var shape = new THREE.Shape();
  var r = radius + thickness;
  var y = Math.sin(-Math.PI / 6) * r;
  var x = Math.cos(Math.PI / 6) * r;
  shape.moveTo(0, r);
  shape.lineTo(-x, y);
  shape.lineTo(x, y);
  shape.lineTo(0, r);

  var hole = new THREE.Path();
  r = radius;
  y = Math.sin(-Math.PI / 6) * r;
  x = Math.cos(Math.PI / 6) * r;
  hole.moveTo(0, r);
  hole.lineTo(-x, y);
  hole.lineTo(x, y);
  hole.lineTo(0, r);

  shape.holes.push(hole);

  var extrudeSettings = { steps: 1, depth: depth, bevelEnabled: false };
  var geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
  geometry.translate(0, 0, -depth / 2);
  return geometry;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

init();