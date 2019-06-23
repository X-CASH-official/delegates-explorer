import { Component, OnInit ,Input } from '@angular/core';
import { Observable ,  Observer } from 'rxjs';
@Component({
    selector: 'cdk-dashcard',
    templateUrl: './dashcard.component.html',
    styleUrls: ['./dashcard.component.scss']
})
export class DashcardComponent implements OnInit {
     
    @Input() dashData: any;
    @Input() settings: string;
    @Input() width: string;
    @Input() text_settings: string;
    
    constructor() {

     }

    ngOnInit() {
    }

}
