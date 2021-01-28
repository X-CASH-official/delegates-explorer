
import {merge as observableMerge,  BehaviorSubject ,  Observable } from 'rxjs';

import {map} from 'rxjs/operators';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { delegates_voters_listdata } from '../interfaces';

 /** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<delegates_voters_listdata[]> = new BehaviorSubject<delegates_voters_listdata[]>([]);
  get data(): delegates_voters_listdata[] { return this.dataChange.value; }

  constructor() {

  }

  /** Adds a new user to the database. */
  addUser(id:string, total:string, public_address_created_reserve_proof:string, reserve_proof:string) {
    const copiedData = this.data.slice();
    copiedData.push(this.createNewUser(id, total, public_address_created_reserve_proof, reserve_proof));
    this.dataChange.next(copiedData);
  }

  /** Builds and returns a new User. */
  private createNewUser(id:string, total:string, public_address_created_reserve_proof:string, reserve_proof:string) {
    return {
      id: id,
      total: total,
      public_address_created_reserve_proof: public_address_created_reserve_proof,
      reserve_proof: reserve_proof
    };
  }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */

export class ExampleDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  filteredData: delegates_voters_listdata[] = [];
  renderedData: delegates_voters_listdata[] = [];

  constructor(private _exampleDatabase: ExampleDatabase,
              private _paginator: MatPaginator,
              private _sort: MatSort) {
    super();

    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<delegates_voters_listdata[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page,
    ];
    return observableMerge(...displayDataChanges).pipe(map(() => {

      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((item: delegates_voters_listdata) => {
        let searchStr = (item.total + item.public_address_created_reserve_proof + item.reserve_proof).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    }));
    // return observableMerge(...displayDataChanges).pipe(map(() => {
    //   return this._exampleDatabase.data.slice().filter((item: delegates_voters_listdata) => {
    //     let searchStr = (item.public_address_created_reserve_proof + item.total).toLowerCase();
    //     return searchStr.indexOf(this.filter.toLowerCase()) != -1;
    //   });
    // }));

  }

  disconnect() {}

  /** Returns a sorted copy of the database data. */
  sortData(data: delegates_voters_listdata[]): delegates_voters_listdata[] {
    if (!this._sort.active || this._sort.direction == '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'total': [propertyA, propertyB] = [a.total, b.total]; break;
        case 'public_address_created_reserve_proof': [propertyA, propertyB] = [a.public_address_created_reserve_proof, b.public_address_created_reserve_proof]; break;


      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'desc' ? 1 : -1);
    });
  }
}
