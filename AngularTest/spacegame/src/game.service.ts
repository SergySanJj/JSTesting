import {models} from './models';

import * as THREE from 'three';
import three_orbit_controls from 'three-orbit-controls';

const OrbitControls = three_orbit_controls(THREE);
import GLTFLoader from 'three-gltf-loader';

import {sRGBEncoding, Vector3} from 'three';

export class Game {
  private domContainer: HTMLElement;
  private canvas: HTMLCanvasElement;

  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;

  constructor() {
  }

  setCanvas(domContainer: HTMLElement) {
    this.domContainer = domContainer;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x2B2B2B);
    this.camera = new THREE.PerspectiveCamera(75, this.getAspect(), 0.1, 1000);

    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize(this.getWidth(), this.getHeight());
    this.domContainer.appendChild(this.renderer.domElement);

    // const geometry = new THREE.SphereGeometry(1, 10, 10);
    // const material = new THREE.MeshNormalMaterial({});
    // const sphere = new THREE.Mesh(geometry, material);
    // this.scene.add(sphere);

    this.camera.position.z = 5;

    const modelUrl = models.planetGroup;
    this.loadPlanetModel(modelUrl);

    this.setupLights();

    window.onresize = (event) => {
      this.resize();
    };

    // this.initCanvas();

    this.run();
  }

  private initCanvas() {
    this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    this.renderer.autoClearColor = false;

    this.canvas = this.renderer.domElement;
    this.domContainer.appendChild(this.canvas);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xff0000);

    this.setupCamera();
    console.log('cam', this.camera);
    console.log('scene', this.scene);
    this.renderer.render(this.scene, this.camera);

    this.resize();
  }

  private setupCamera() {
    const fov = 45;
    const aspect: number = this.getAspect();
    const near = 0.1;
    const far = 100;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.set(0, 10, 10);
  }

  private setupLights() {
    {
      const skyColor = 0xB1E1FF;  // light blue
      const groundColor = 0xB1E1FF;
      const intensity = 1;
      const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
      this.scene.add(light);
    }

    {
      const color = 0xFFFFFF;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(5, 10, 2);
      this.scene.add(light);
      this.scene.add(light.target);
    }
  }

  private resize() {
    this.renderer.setSize(this.getWidth(), this.getHeight());
    this.camera.aspect = this.getAspect();
    this.camera.updateProjectionMatrix();
  }

  loadPlanetModel(modelURL) {
    const planetElements = [];
    let root;
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(modelURL, (gltf) => {
      root = gltf.scene;
      this.scene.add(root);

      root.updateMatrixWorld();

      for (const elem of root.children.slice()) {
        planetElements.push(elem);
      }

      // let planet = new Planet(planetElements);
      // this.animatables.push(planet);
    });
  }

  private run() {
    let lastTime = Date.now();
    const self = this;

    function render(time) {
      console.log('Render');
      time *= 0.001;  // convert to seconds
      const delta = Date.now() - lastTime;
      lastTime = Date.now();

      self.renderer.render(self.scene, self.camera);
      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }

  private getHeight(): number {
    // tslint:disable-next-line:radix
    // return parseInt(this.domContainer.getAttribute('height'));
    return window.innerHeight;
  }

  private getWidth(): number {
    // tslint:disable-next-line:radix
    // return parseInt(this.domContainer.getAttribute('width'));
    return window.innerWidth;
  }

  private getAspect(): number {
    return this.getWidth() / this.getHeight();
  }
}
