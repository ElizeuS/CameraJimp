import { Component } from "@angular/core";
import * as Jimp from "jimp";
import {
  CameraPreview,
  CameraPreviewOptions,
  CameraPreviewPictureOptions,
} from "@ionic-native/camera-preview/ngx";
import { Base64 } from "js-base64";
import { File } from "@ionic-native/file/ngx";

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
    width: 400,
    height: 400,
    quality: 50,
  };

  picture: any;
  code: string;
  blob: any;
  anyBuffer: ArrayBuffer;
  anyBase64: Base64;
  redV: []
  greenV: Number[]
  blueV: []

  constructor(private cameraPreview: CameraPreview, private file: File) {
    this.camOn();
  }

  camOn() {
    this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
      (res) => {
        alert(res);
      },
      (err) => {
        alert(err);
      }
    );
  }

  takePicture() {
    this.cameraPreview
      .takePicture(this.cameraPicturesOpts)
      .then((imageData) => {
        this.picture = "data:image/jpeg;base64," + imageData;
        this.code = imageData;
        let image = document.getElementById("image");
        image.setAttribute("src", this.picture);

        alert(imageData);
        this.writeFile(this.picture, "baseGlubGlub");
      }),
      (err) => {
        alert(err);
      };
    /*this.readImage(new Buffer(this.code, "base64"));*/
    this.anyBuffer = this._base64ToArrayBuffer(this.code)
    const { red, green, blue, x, y } = this.readImage(this.anyBuffer);

  }

  readImage(encodeB64: any) {
    let redV = [];
    let greenV = [];
    let blueV = [];
    let width: any;
    let height: any;

    Jimp.read(encodeB64)
      .then((image) => {
        alert("Sucess!" + image.bitmap.width);
        width = image.bitmap.width;
        height = image.bitmap.height;

        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (
          x,
          y,
          idx
        ) {
          // x, y is the position of this pixel on the image
          // idx is the position start position of this rgba tuple in the bitmap Buffer
          // this is the image
          //x = w, y = h; As interações acontecem de todos os x para cada y.
         let red = this.bitmap.data[idx + 0];
         let green = this.bitmap.data[idx + 1];
         let blue = this.bitmap.data[idx + 2];
          //alpha = this.bitmap.data[idx + 3];
          console.log(blue);

          redV.push(red);
          greenV.push(green);
          blueV.push(blue);
          // rgba values run from 0 - 255
          // e.g. this.bitmap.data[idx] = 0; // removes red from this pixel

        }
        );
      })
      .catch((err) => {
        alert(err);
      });
    alert(redV)

    return {
      red: redV,
      green: greenV,
      blue: blueV,
      x: width,
      y: height,
    };

  }

  sumVector(redV: [], greenV: [], blueV: [], nLine: number, nColumn: number) {
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
}
