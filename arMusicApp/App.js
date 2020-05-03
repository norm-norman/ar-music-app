import { AR } from 'expo';
import ExpoGraphics, { GraphicsView } from 'expo-graphics';
import ExpoTHREE, { Renderer, THREE, AR as ThreeAR } from 'expo-three';
import { BackgroundTexture, Camera } from 'expo-three-ar';
import * as Permissions from 'expo-permissions';
import { Audio } from 'expo-av';
import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { AntDesign as Icon } from 'react-native-vector-icons';
import 'prop-types';
import 'three';



export default class App extends React.Component {
  UNSAFE_componentWillMount() {
    THREE.suppressExpoWarnings();
  }

  render() {
    return (
      <View style={{flex:1}}>
      <GraphicsView
        isArEnabled
        onContextCreate={this.onContextCreate}
        onRender={this.onRender}
        onResize={this.onResize}
      />
      <View style={{position:"absolute", bottom: "50%", right: "60%", flex: 1, flexDirection: "row"}}>
          <Icon.Button size={100} name="caretright" backgroundColor="transparent" color="#2a2a2a00" onPress={this.onButtonPressLowTom} />
      </View>
      <View style={{position:"absolute", bottom: "60%", right: "40%", flex: 1, flexDirection: "row"}}>
          <Icon.Button size={100} name="caretright" backgroundColor="transparent" color="#2a2a2a00" onPress={this.onButtonPressHighTomLeft} />
      </View>
      <View style={{position:"absolute", bottom: "40%", right: "20%", flex: 1, flexDirection: "row"}}>
          <Icon.Button size={120} name="caretright" backgroundColor="transparent" color="#2a2a2a00" onPress={this.onButtonPressKick} />
      </View>
      <View style={{position:"absolute", bottom: "60%", right: "80%", flex: 1, flexDirection: "row"}}>
          <Icon.Button size={80} name="caretright" backgroundColor="transparent" color="#2a2a2a00" onPress={this.onButtonPressCrash} />
      </View>
      <View style={{position:"absolute", bottom: "60%", right: "10%", flex: 1, flexDirection: "row"}}>
          <Icon.Button size={80} name="caretright" backgroundColor="transparent" color="#2a2a2a00" onPress={this.onButtonPressSnare} />
      </View>
      </View>
    );
  }

  onButtonPressLowTom = async () => {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(require('./assets/sounds/CyCdh_K3Tom-01.mp3'));
      await soundObject.playAsync();
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
      console.warn('error playing sound')
    }
  }

  onButtonPressHighTomLeft = async () => {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(require('./assets/sounds/CyCdh_K3Tom-04.mp3'));
      await soundObject.playAsync();
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
      console.warn('error playing sound')
    }
  }

  onButtonPressKick = async () => {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(require('./assets/sounds/CyCdh_K3Kick-03.mp3'));
      await soundObject.playAsync();
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
      console.warn('error playing sound')
    }
  }

  onButtonPressCrash = async () => {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(require('./assets/sounds/CyCdh_K3Crash-02.mp3'));
      await soundObject.playAsync();
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
      console.warn('error playing sound')
    }
  }

  onButtonPressSnare = async () => {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(require('./assets/sounds/CyCdh_K3Snr-09.mp3'));
      await soundObject.playAsync();
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
      console.warn('error playing sound')
    }
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

    //this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 10000);
    this.camera.position.set(0, 6, 12);
    this.camera.lookAt(0, 0, 0);

    // Light
    this.scene.add(new THREE.AmbientLight(0x404040));
    this.scene.add(new THREE.DirectionalLight(0xffffff, 0.6));

  //  this.setupScene();
    this.loadModelsAsync();
  };


  loadModelsAsync = async () => {
    /// Get all the files in the mesh
    const model = {
      'model.obj': require('./assets/model.obj'),
      'materials.mtl': require('./assets/materials.mtl'),
    };

    /// Load model!
    const mesh = await ExpoTHREE.loadAsync(
      [model['model.obj'], model['materials.mtl']],
      null,
      name => model[name],
    );

    this.geometry = model['model.obj'];
    /// Update size and position
    ExpoTHREE.utils.scaleLongestSideToSize(mesh, 5);
    ExpoTHREE.utils.alignMesh(mesh, { y: 1 });
    /// Smooth mesh
  //  ExpoTHREE.utils.computeMeshNormals(mesh);
  mesh.position.y = -2;
  mesh.position.z = -6;
    /// Add the mesh to the scene
    this.scene.add(mesh);


    /// Save it so we can rotate
    this.mesh = mesh;
  };

  onResize = ({ x, y, scale, width, height }) => {

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(scale);
    this.renderer.setSize(width, height);
  };

  onRender = delta => {
    //this.geometry.rotation.y += 0.4 * delta;
    this.renderer.render(this.scene, this.camera);
  };
}

//const screenCenter = new THREE.Vector2(0.5, 0.5);
