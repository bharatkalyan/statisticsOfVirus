import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../service/countries.service';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4plugins_sunburst from '@amcharts/amcharts4/plugins/sunburst';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit {
  public filteredData: any[] = [];
  public testArr = [];
  constructor(private countService: CountriesService, updates: SwUpdate) {
    updates.available.subscribe((event) => {
      updates.activateUpdate().then(() => document.location.reload());
    });
  }

  ngOnInit(): void {
    this.countService.getMultipleCountries().subscribe((data) => {
      this.testArr = data;
      data.forEach((element) => {
        this.filteredData.push({
          name: element.country,
          children: [
            {
              name: 'Active',
              value: element.active,
            },
            { name: 'Death', value: element.deaths },
            { name: 'Recovered', value: element.recovered },
            { name: 'Total', value: element.cases },
          ],
        });
      });
      this.createCountriesChart();
    });
  }

  public createCountriesChart(): void {
    am4core.useTheme(am4themes_animated);
    // Themes end
    // create chart
    const chart = am4core.create('chartdiv', am4plugins_sunburst.Sunburst);
    this.filteredData.forEach((item, i) => {
      chart.data.push(item);
    });
    chart.colors.step = 2;
    chart.fontSize = 11;
    chart.innerRadius = am4core.percent(10);

    // define data fields
    chart.dataFields.value = 'value';
    chart.dataFields.name = 'name';
    chart.dataFields.children = 'children';

    let level0SeriesTemplate = new am4plugins_sunburst.SunburstSeries();
    level0SeriesTemplate.hiddenInLegend = false;
    chart.seriesTemplates.setKey('0', level0SeriesTemplate);

    // this makes labels to be hidden if they don't fit
    level0SeriesTemplate.labels.template.truncate = false;
    level0SeriesTemplate.labels.template.hideOversized = true;

    level0SeriesTemplate.labels.template.adapter.add(
      'rotation',
      (rotation, target) => {
        target.maxWidth =
          target.dataItem.slice.radius - target.dataItem.slice.innerRadius - 10;
        target.maxHeight = Math.abs(
          ((target.dataItem.slice.arc *
            (target.dataItem.slice.innerRadius +
              target.dataItem.slice.radius)) /
            2) *
            am4core.math.RADIANS
        );
        return rotation;
      }
    );

    let level1SeriesTemplate = level0SeriesTemplate.clone();
    chart.seriesTemplates.setKey('1', level1SeriesTemplate);
    level1SeriesTemplate.fillOpacity = 0.75;
    level1SeriesTemplate.hiddenInLegend = true;

    let level2SeriesTemplate = level0SeriesTemplate.clone();
    chart.seriesTemplates.setKey('2', level2SeriesTemplate);
    level2SeriesTemplate.fillOpacity = 0.5;
    level2SeriesTemplate.hiddenInLegend = true;

    chart.legend = new am4charts.Legend();
  }
}
