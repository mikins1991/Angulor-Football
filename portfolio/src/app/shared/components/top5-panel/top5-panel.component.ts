import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TABS } from '../shared/left-panel.config';

@Component({
  selector: 'top5-panel-component',
  templateUrl: './top5-panel.component.html',
  styleUrls: ['./top5-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Top5PanelComponent implements OnInit {
  tabsLiga = TABS;
  constructor() {}

  clickLiga(title) {
    this.tabsLiga.forEach((elem) => {
      elem.title === title ? (elem.active = true) : (elem.active = false);
    });
  }

  ngOnInit(): void {}
}