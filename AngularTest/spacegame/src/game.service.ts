import * as THREE from 'three';
import three_orbit_controls from 'three-orbit-controls';

const OrbitControls = three_orbit_controls(THREE);
import GLTFLoader from 'three-gltf-loader';

import {Vector3} from 'three';

export class Game {
  private canvas: HTMLElement;

  constructor() {
  }

  setCanvas(canvas: HTMLElement) {
    this.canvas = canvas;
    console.log('canvas', this.canvas);
  }
}
