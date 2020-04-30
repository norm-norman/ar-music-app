import { AR } from 'expo';
import { GraphicsView } from 'expo-graphics';
import ExpoTHREE, { Renderer, THREE, AR as ThreeAR } from 'expo-three';
import { BackgroundTexture, Camera } from 'expo-three-ar';
import * as React from 'react';
import { Platform, View } from 'react-native';


export default class App extends React.Component {
  UNSAFE_componentWillMount() {
    THREE.suppressExpoWarnings();
  }

  render() {
    return (
      <GraphicsView
        isArEnabled
        onContextCreate={this.onContextCreate}
        onRender={this.onRender}
      />
    );
  }

  onContextCreate = ({
    // Web: const gl = canvas.getContext('webgl')
    gl,
    width,
    height,
    scale,
  }) => {
    AR.setPlaneDetection(AR.PlaneDetection.Horizontal);

    // Renderer
    this.renderer = new Renderer({
      gl,
      width,
      height,
      pixelRatio: scale,
    });

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new BackgroundTexture(this.renderer);

    // Camera
    this.camera = new Camera(width, height, 0.1, 1000);

    // Cube
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);

    const material = new THREE.MeshPhongMaterial({
      color: 0xff0000,
    });
    this.cube = new THREE.Mesh(geometry, material);

    //this.magnetic = new THREE.MagneticObject();
    // this.magnetic.add(this.cube);
    this.scene.add(this.cube);
    // Light
    this.scene.add(new THREE.AmbientLight(0x404040));
    this.scene.add(new THREE.DirectionalLight(0xffffff, 0.6));
  };

  onRender = () => {

    this.renderer.render(this.scene, this.camera);
  };
}

const screenCenter = new THREE.Vector2(0.5, 0.5);
