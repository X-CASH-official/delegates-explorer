import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cdk-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
	public bigMenu;
	@Input() open;
	constructor() { }

	ngOnInit() {}

 get_delegates_information(delegates_information:string)
 {
   window.location.href = isNaN(delegates_information) ? `/auth/tables/delegates_statistics?data=${delegates_information}` : `/auth/tables/round_statistics?data=${delegates_information}`;
 }

}
