import { Injectable } from '@angular/core';
import * as highcharts from 'highcharts';
import {chart} from 'highcharts';
import * as Highcharts from 'highcharts';
import * as HighchartsMore from 'highcharts-more';
HighchartsMore(Highcharts);

@Injectable()
export class HighChartService {
  /**
   * Renderize Highchart
   * @param el    DOM element in which the chart will be created
   * @param cfg   Highchart configuration
   */
  render(el, cfg) {
    highcharts.chart(el, cfg);
  }
}