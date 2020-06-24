import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ApiFootbalService } from 'src/API/api.service';
import { take } from 'rxjs/internal/operators/take';
import { TABS } from 'src/app/shared/components/shared/left-panel.config';
import { Standing } from './interface/standing.interface';
import { SPINNER_CONFIG } from 'src/app/shared/components/shared/spinner-config';
import { LigaNames, HideCadr } from 'src/app/shared/components/shared/liga.const';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'standings-container',
    templateUrl: './standings.component.html',
    styleUrls: [ './standings.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StandingsComponent implements OnInit {
    dataBLiga: Standing.DataLiga;
    dataAPL: Standing.DataLiga;
    dataFrLiga: Standing.DataLiga;
    dataSeriaAIt: Standing.DataLiga;
    dataPrimeraSpain: Standing.DataLiga;
    statusLoadingAPL: boolean;
    statusLoadingBliga: boolean;
    statusLoadingSeriaAIt: boolean;
    statusLoadingFrLiga: boolean;
    statusLoadingPrimeraSpain: boolean;

    hide = HideCadr;
    titleButtons = {
        change: 'Change size'
    };

    sortStandings = [ { title: 'TOTAL', name: 'T' }, { title: 'HOME', name: 'H' }, { title: 'AWAY', name: 'A' } ];
    readonly LigaNames = LigaNames;
    readonly spinerConfig = SPINNER_CONFIG;
    readonly Liga = TABS;

    constructor(private apiService: ApiFootbalService, private crdf: ChangeDetectorRef) {}

    togglePanel(title: string): void {
        console.log('StandingsComponent -> togglePanel -> title', title);
        switch (title) {
            case LigaNames.apl:
                this.hide.apl = !this.hide.apl;
                return;
            case LigaNames.laLiga:
                this.hide.laLiga = !this.hide.laLiga;
                return;
            case LigaNames.frLiga:
                this.hide.frLiga = !this.hide.frLiga;
                return;
            case LigaNames.bLiga:
                this.hide.bLiga = !this.hide.bLiga;
                return;
            case LigaNames.itLiga:
                this.hide.itLiga = !this.hide.itLiga;
                return;
        }
    }

    sortStanding(title: string, i: number): void {}
    getDataBliga(data: Standing.ResponseData): void {
        this.dataBLiga = data.body;
        this.statusLoadingBliga = data.ok;

        this.crdf.detectChanges();
    }

    getDataAPL(data: Standing.ResponseData): void {
        this.dataAPL = data.body;
        // setTimeout(() => {
        this.statusLoadingAPL = data.ok;
        // }, 1000)
        this.crdf.detectChanges();
    }

    getFrLiga(data: Standing.ResponseData): void {
        this.dataFrLiga = data.body;
        this.statusLoadingFrLiga = data.ok;
        console.log('StandingsComponent -> getFrLiga -> this.statusLoadingFrLiga', this.statusLoadingFrLiga);

        this.crdf.detectChanges();
    }

    getSeriaAIt(data: Standing.ResponseData): void {
        this.dataSeriaAIt = data.body;
        // setTimeout(() => {
        this.statusLoadingSeriaAIt = data.ok;
        // }, 500);

        this.crdf.detectChanges();
    }

    getPrimeraSpain(data) {
        this.dataPrimeraSpain = data.body;
        this.statusLoadingPrimeraSpain = data.ok;

        this.crdf.detectChanges();
    }

    ngOnInit(): void {
        this.apiService.getAplTable().pipe(take(1)).subscribe((data) => {
            this.getDataAPL(data);
        });

        this.apiService.getPrimeraSpainTable().pipe(take(1)).subscribe((data) => {
            this.getPrimeraSpain(data);
        });

        this.apiService.getBligaTable().pipe(take(1)).subscribe((data) => {
            this.getDataBliga(data);
        });

        this.apiService.getFrLiga1Table().pipe(take(1)).subscribe((data) => {
            this.getFrLiga(data);
        });

        this.apiService.getSeriaAItTable().pipe(take(1)).subscribe((data) => {
            this.getSeriaAIt(data);
        });
    }
}
