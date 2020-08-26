import { Component, OnInit, Input } from "@angular/core";
import * as Highcharts from "highcharts";

@Component({
  selector: "app-graph",
  templateUrl: "./graph.component.html",
  styleUrls: ["./graph.component.scss"],
})
export class GraphComponent implements OnInit {
  @Input() graphData;
  @Input() typeChart;
  @Input() yAxisText;
  @Input() xAxisText;
  @Input() graphTitleText;
  @Input() rgbData: [];


  myChart: Highcharts.Chart;

  constructor() {}

  handleGraphic() {


    this.myChart = Highcharts.chart("container", {
      chart: {
        type: this.typeChart,
        zoomType: "xy",
        width: window.screen.width,
        height: 350,
        backgroundColor: "black",
        events: {
          load: function () {},
        },
      },
      yAxis: {
        title: {
          text: this.yAxisText,
          style: { color: "#ffffff" },
        },
      },
      xAxis: {
        title: {
          text: this.xAxisText,
          style: { color: "#ffffff" },
        },
      },
      tooltip: {
        headerFormat: "<b>{series.name}</b><br/>",
        pointFormat: "Pixel/(θ)/(λ): {point.x:4f}<br/>RIU: {point.y:.4f}",
      },
      title: {
        text: this.graphTitleText,
        margin: 0, //margem do titulo para o gráfico
        style: { color: "#ffffff" },
      },
      legend: {
        backgroundColor: "#5F5A59",
        shadow: true,
        layout: "vertical",
        width: 100,
        maxHeight: 30,
        itemMarginTop: 0,
        itemMarginBottom: 0,

        //Estilo da legenda padrão
        itemStyle: {
          color: "#ffffff",
          fontWeight: "bold",
        },
        //Estilo da legenda ao clicar
        itemHiddenStyle: {
          color: "#AEAEAE",
        },
      },
      plotOptions: {
        series: {
          allowPointSelect: true,
          color: "rgba(255, 0, 0, 1)",
          showInLegend: true,
        },
      },
      exporting: {
        enabled: true,
        csv: {
          itemDelimiter: ",",
        },
      },
      series: [
        {
          name: "Pixel",
          type: undefined, //No Ionic 4, se faltar essa parte dar um erro que pode demorar em media 4 horas
          data: [],
          marker: {
            color: "rgba(255, 0, 0, 1)",
            symbol: "circle", //"circle", "square", "diamond", "triangle" and "triangle-down".
            lineWidth: null, //largura da inha de contorno
            fillColor: "rgba(255, 0, 0, 1)", //cor do preenchimento do ponto
            lineColor: "rgba(255, 0, 0, 1)", // cor do contorno do ponto
            radius: 2,
          },
        },
        {
          name: "Reference",
          type: undefined,
          color: "rgba(0, 0, 255, 1)",
          marker: {
            symbol: "circle", //"circle", "square", "diamond", "triangle" and "triangle-down".
            lineWidth: null, //largura da inha de contorno
            fillColor: "rgba(0, 0, 255, 1)", //cor do preenchimento do ponto
            lineColor: "rgba(0, 0, 255, 1)", // cor do contorno do ponto
            radius: 2,
          },
        },
      ],
      navigation: {
        buttonOptions: {
          enabled: true,
        },
      },
    });
  }

  //https://medium.com/@danilodev.silva/angular-5-eventemitter-aprendendo-a-usar-input-e-output-property-56df9158de6b
  ngOnInit() {
    this.handleGraphic();
  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    //console.log(this.getFamily);
    this.myChart.series[0].setData(this.rgbData);
  }

  teste() {}
}
