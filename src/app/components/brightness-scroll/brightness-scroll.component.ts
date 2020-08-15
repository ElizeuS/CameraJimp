import { Component, OnInit } from "@angular/core";

import { Options } from "ng5-slider";
import { Brightness } from "@ionic-native/brightness/ngx";

interface SimpleSliderModel {
  value: number;
  options: Options;
}

@Component({
  selector: "app-brightness-scroll",
  templateUrl: "./brightness-scroll.component.html",
  styleUrls: ["./brightness-scroll.component.scss"],
})
export class BrightnessScrollComponent implements OnInit {

  verticalSlider1: SimpleSliderModel = {
    value: 50,
    options: {
      floor: 0,
      ceil: 100,
      step: 10,
      vertical: true,
      animate: true,
      showSelectionBar: true,
      getPointerColor: () => {
        return "#d8e0f3cc";
      },
      selectionBarGradient: {
        from: "#d8e0f3cc",
        to: "#fff",
      },
    },
  };

  constructor(private brightness: Brightness) {
    this.brightness.setBrightness(0.5);
  }

 /*  checkPageFocus() {
    var info = document.getElementById("light-bar");

    if (document.hasFocus()) {
      info.style.opacity = "1";
      console.log("O documento tem o foco.");
    } else {
      info.style.opacity = "0";
      console.log("O documento não tem o foco.");
    }
  } */

  adjustBrightness(event) {
    let brightnessValue = event.value / 100;

    this.brightness.setBrightness(brightnessValue);
  }

  ngOnInit() {}

  ngDoCheck() {
    // this.checkPageFocus();
  }
}
