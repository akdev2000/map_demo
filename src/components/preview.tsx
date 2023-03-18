import * as BABYLON from "@babylonjs/core";
import { Engine } from "@babylonjs/core/Engines/engine";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function App(props: any) {
  function createScene() {
    const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
    const engine = new Engine(canvas);
    var scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.ArcRotateCamera(
      "Camera",
      -Math.PI / 2,
      Math.PI / 3,
      25,
      BABYLON.Vector3.Zero(),
      scene
    );
    camera.attachControl(canvas, true);

    var light = new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(255,255,255),
      scene
    );
    // const light = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 0), scene);
    light.intensity = 20;
    var textureResolution = 512;
    var textureGround = new BABYLON.DynamicTexture(
      "dynamic texture",
      textureResolution,
      scene
    );
    var textureContext = textureGround.getContext();

    const faceUV = new Array(6);
    const faceColors = new Array(6);

    for (let i = 0; i < 6; i++) {
      faceUV[i] = new BABYLON.Vector4(0, 0, 1, 1);
    }
    const boxOption = {
      faceUV: faceUV,
      faceColors: faceColors,
      height: 20,
      width: 20,
      depth: 20,
      scene,
    };
    const ground = BABYLON.MeshBuilder.CreateBox("box", boxOption);

    var materialGround = new BABYLON.StandardMaterial("Mat", scene);
    materialGround.diffuseTexture = textureGround;
    ground.material = materialGround;

    var img = new Image();
    img.src = props?.image || "";
    img.onload = function () {
      textureContext.drawImage(this, 0, 0, 530, 530);
      textureGround.update();
    };

    engine.runRenderLoop(() => {
      scene.render();
    });
  }

  useEffect(() => {
    createScene();
  }, []);
  return (
    <div className="App">
      <canvas width={200} height={100} id="renderCanvas"></canvas>
    </div>
  );
}

export default App;
