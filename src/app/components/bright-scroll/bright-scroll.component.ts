import { Component, OnInit, DoCheck } from "@angular/core";
import { Options } from "ng5-slider";
import { Brightness } from "@ionic-native/brightness/ngx";

interface SimpleSliderModel {
  value: number;
  options: Options;
}

@Component({
  selector: "app-bright-scroll",
  templateUrl: "./bright-scroll.component.html",
  styleUrls: ["./bright-scroll.component.scss"],
})
export class Appbright implements OnInit {
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
        return "#FF2626";
      },
      selectionBarGradient: {
        from: "#FF2626",
        to: "#FFA526",
      },
    },
  };

  constructor(private brightness: Brightness) {
    this.brightness.setBrightness(0.5);
  }

  checkPageFocus() {
    var info = document.getElementById("light-bar");

    if (document.hasFocus()) {
      info.style.opacity = "1";
      console.log("O documento tem o foco.");
    } else {
      info.style.opacity = "0";
      console.log("O documento não tem o foco.");
    }
  }

  adjustBrightness(event) {
    let brightnessValue = event.value / 100;

    this.brightness.setBrightness(brightnessValue);
  }

  ngOnInit() {}

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    //this.checkPageFocus();
  }

  async hiddenRange() {
    var info = document.getElementById("light-bar");
    let val = 1;
    for (let i = 0; i < 5; i++) {
      await this.delay(500);
      val -= 0.2;
      info.style.opacity = String(val);
    }
  }
  showRange() {
    var info = document.getElementById("light-bar");
    info.style.opacity = "1";
  }

  private delay(ms: number): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, ms);
    });
  }
}
