
import {merge as observableMerge,  BehaviorSubject ,  Observable } from 'rxjs';

import {map} from 'rxjs/operators';
import { DataSource } from '@angular/cdk/collections';
import { delegatesdata } from '../interfaces';

 /** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<delegatesdata[]> = new BehaviorSubject<delegatesdata[]>([]);
  get data(): delegatesdata[] { return this.dataChange.value; }

  constructor() {
   
  }

  /** Adds a new user to the database. */
  addUser(id:string,delegate_name:string,online_status:string,shared_delegate_status:string,delegate_fee:string,block_verifier_total_rounds:string,block_verifier_online_percentage:string,total_vote_count:string,block_verifier_score:string) {
    const copiedData = this.data.slice();
    copiedData.push(this.createNewUser(id,delegate_name,online_status,shared_delegate_status,delegate_fee,block_verifier_total_rounds,block_verifier_online_percentage,total_vote_count,block_verifier_score));
    this.dataChange.next(copiedData);
  }

  /** Builds and returns a new User. */
  private createNewUser(id:string,delegate_name:string,online_status:string,shared_delegate_status:string,delegate_fee:string,block_verifier_total_rounds:string,block_verifier_online_percentage:string,total_vote_count:string,block_verifier_score:string) {
    return {
      id: id,
      delegate_name: delegate_name,
      online_status: online_status,
      shared_delegate_status: shared_delegate_status,
      delegate_fee: delegate_fee,
      block_verifier_total_rounds: block_verifier_total_rounds,
      block_verifier_online_percentage: block_verifier_online_percentage,
      total_vote_count: total_vote_count,
      block_verifier_score: block_verifier_score
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

  constructor(private _exampleDatabase: ExampleDatabase) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<delegatesdata[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._filterChange,
    ];

    return observableMerge(...displayDataChanges).pipe(map(() => {
      return this._exampleDatabase.data.slice().filter((item: delegatesdata) => {
        let searchStr = (item.delegate_name).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });
    }));
  }

  disconnect() {}
}
