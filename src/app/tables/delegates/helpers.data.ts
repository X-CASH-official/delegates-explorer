
import {merge as observableMerge,  BehaviorSubject ,  Observable } from 'rxjs';

import {map} from 'rxjs/operators';
import { DataSource } from '@angular/cdk/collections';
import {MatPaginator, MatSort} from '@angular/material';


import { delegatesdata } from '../interfaces';

 /** An example database that the data source uses to retrieve data for the table. */
export class DelegateDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<delegatesdata[]> = new BehaviorSubject<delegatesdata[]>([]);
  get data(): delegatesdata[] { return this.dataChange.value; }

  constructor() {}

  /** Adds a new user to the database. */
  addUser(id:string,delegate_name:string,online_status:string,shared_delegate_status:string,delegate_fee:string,block_verifier_total_rounds:string,block_verifier_online_percentage:string,total_vote_count:string,block_producer_total_rounds:string) {
    const copiedData = this.data.slice();
    copiedData.push(this.createNewUser(id,delegate_name,online_status,shared_delegate_status,delegate_fee,block_verifier_total_rounds,block_verifier_online_percentage,total_vote_count,block_producer_total_rounds));
    this.dataChange.next(copiedData);
  }

  /** Builds and returns a new User. */
  private createNewUser(id:string,delegate_name:string,online_status:string,shared_delegate_status:string,delegate_fee:string,block_verifier_total_rounds:string,block_verifier_online_percentage:string,total_vote_count:string,block_producer_total_rounds:string) {
    return {
      id: id,
      delegate_name: delegate_name,
      online_status: online_status,
      shared_delegate_status: shared_delegate_status,
      delegate_fee: delegate_fee,
      block_verifier_total_rounds: block_verifier_total_rounds,
      block_verifier_online_percentage: block_verifier_online_percentage,
      total_vote_count: total_vote_count,
      block_producer_total_rounds: block_producer_total_rounds
    };
  }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, DelegateDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */

export class DelegateDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  filteredData: delegatesdata[] = [];
  renderedData: delegatesdata[] = [];

  constructor(private _exampleDatabase: DelegateDatabase,
              private _paginator: MatPaginator,
              private _sort: MatSort) {
    super();

    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<delegatesdata[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page,
    ];

    return observableMerge(...displayDataChanges).pipe(map(() => {

      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((item: delegatesdata) => {
        let searchStr = (item.delegate_name + item.online_status + item.shared_delegate_status ).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    }));
  }

  disconnect() {}

  /** Returns a sorted copy of the database data. */
  sortData(data: delegatesdata[]): delegatesdata[] {
    if (!this._sort.active || this._sort.direction == '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'delegate_name': [propertyA, propertyB] = [a.delegate_name, b.delegate_name]; break;
        case 'online_status': [propertyA, propertyB] = [a.online_status, b.online_status]; break;
        case 'delegate_fee': [propertyA, propertyB] = [a.delegate_fee, b.delegate_fee]; break;
        case 'shared_delegate_status': [propertyA, propertyB] = [a.shared_delegate_status, b.shared_delegate_status]; break;
        case 'block_verifier_total_rounds': [propertyA, propertyB] = [a.block_verifier_total_rounds, b.block_verifier_total_rounds]; break;
        case 'block_verifier_online_percentage': [propertyA, propertyB] = [a.block_verifier_online_percentage, b.block_verifier_online_percentage]; break;
        case 'total_vote_count': [propertyA, propertyB] = [a.total_vote_count, b.total_vote_count]; break;
        case 'block_producer_total_rounds': [propertyA, propertyB] = [a.block_producer_total_rounds, b.block_producer_total_rounds]; break;
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    });
  }
}
