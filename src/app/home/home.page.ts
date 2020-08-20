import { Component, OnInit } from "@angular/core";
import * as Jimp from "jimp";
import {
  CameraPreview,
  CameraPreviewOptions,
  CameraPreviewPictureOptions,
} from "@ionic-native/camera-preview/ngx";
import { Base64 } from "js-base64";
import { File } from "@ionic-native/file/ngx";
import { Brightness } from '@ionic-native/brightness/ngx';

import { Options } from 'ng5-slider';

interface RangeSliderModel {
  minValue: number;
  maxValue: number;
  options: Options;

}

interface SimpleSliderModel {
  value: number;
  options: Options;
 }

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})


export class HomePage {
  cameraPreviewOpts: CameraPreviewOptions = {
    x: 200, //Posição em que a câmera vai aparecer
    y: 200, //Posição em que a câmera vai aparecer
    width: 70,
    height: 70,
    tapPhoto: true,
    //camera: this._cameraPreview.CAMERA_DIRECTION.FRONT,
    previewDrag: true,
    toBack: false,
    //alpha: 1
  };

  cameraPicturesOpts: CameraPreviewPictureOptions = {
    width: 200,
    height: 200,
    quality: 50,
  };

  arrayFamily: number[] = [1, 2, 3]


  picture: any;
  code: string;
  blob: any;
  anyBuffer: ArrayBuffer;
  anyBase64: Base64;

  currentRedV: number[]
  currentGreenV: number[]
  currentBlueV: number[]

  myImage: Jimp;

  brightnessModel = 0.4;
  value = 0.5;

  constructor(private cameraPreview: CameraPreview, private file: File, private brightness: Brightness) {
    this.brightness.setBrightness(this.brightnessModel);

    try {
      this.camOn();
    } catch (error) {
      alert(error);
    }
  }

 async camOn() {
    this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
      (res) => {
        alert("cameraOn" + res);
        this.takePicture()
      },
      (err) => {
        alert(err);
      }
    );
  }

  ngOnInit() {
    console.log(this.arrayFamily)
  }

  async takePicture() {
    this.cameraPreview
      .takeSnapshot(this.cameraPicturesOpts) /* Opção mais rápida e não possue o som do obturador como no TakePicture() */
      .then((imageData) => {
        alert(imageData);
        this.picture = "data:image/jpeg;base64," + imageData;
        this.code = imageData;
        let image = document.getElementById("image");
        image.setAttribute("src", this.picture);

        // alert("takePicture" + imageData);
        this.writeFile(this.picture, "baseGlubGlub");
      }),
      (err) => {
        alert(err);
      };
      this.anyBuffer = this._base64ToArrayBuffer(this.code)
      this.readImage(this.anyBuffer);

  }

  readImage(encodeB64: any) {
    let width: any;
    let height: any;


     Jimp.read(encodeB64)
      .then((image) => {
        // alert("Sucess!" + image.bitmap.width);
        width = image.bitmap.width;
        height = image.bitmap.height;
        this.myImage = image;

       this.scanImage(this.myImage, width, height);

      })
      .catch((err) => {
        alert(err);
      });


  }

  scanImage(image: Jimp, width: number, height: number) {
    let sRed = new Array(width + 1).join("0").split("").map(parseFloat);;

    let sGreen = new Array(width + 1).join("0").split("").map(parseFloat);;
    let sBlue = new Array(width + 1).join("0").split("").map(parseFloat);;

    for (let line = 0; line < height; line++){
      for (let column = 0; column < width; column++){
        sRed[column] += Jimp.intToRGBA(image.getPixelColor(column, line)).r;
        sGreen[column] += Jimp.intToRGBA(image.getPixelColor(column, line)).g;
        sBlue[column] += Jimp.intToRGBA(image.getPixelColor(column, line)).b;
      }
    }

    this.currentRedV = sRed.map(function (value) {
      return value / width;
    });

    this.currentGreenV = sGreen.map(function (value) {
      return value / width;
    });

    this.currentBlueV = sBlue.map(function (value) {
      return value / width;
    });


    this.takePicture();

    // alert(`height: ${height} width: ${width} pixel: ${Jimp.intToRGBA(image.getPixelColor(7, 6)).r}`);
  }

  stopCam() {
    this.cameraPreview.stopCamera();
  }

  sumVectorAndAvg(redV: [], greenV: [], blueV: [], nLine: number, nColumn: number) {
    let sumRedV = new Array(nColumn + 1).join("0").split("").map(parseFloat);
    let sumGreenV = new Array(nColumn + 1).join("0").split("").map(parseFloat);
    let sumBlueV = new Array(nColumn + 1).join("0").split("").map(parseFloat);


    for (let cont = 1; cont < redV.length; cont++){
      sumRedV[cont % nColumn] += redV[cont];
      sumGreenV[cont % nColumn] += greenV[cont];
      sumBlueV[cont % nColumn] += blueV[cont];
    }

    return [sumBlueV, sumGreenV, sumBlueV];
  }


  writeFile(something: any, filename: string) {
    this.blob = new Blob(something);

    this.file.writeFile(
      this.file.externalDataDirectory,
      filename + ".txt",
      this.blob,
      { replace: true, append: false }
    );
  }

  _base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    //this.arrayFamily.push(5)

  }
}


//https://www.npmjs.com/package/highcharts