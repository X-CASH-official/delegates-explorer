
import {merge as observableMerge,  BehaviorSubject ,  Observable } from 'rxjs';

import {map} from 'rxjs/operators';
import { DataSource } from '@angular/cdk/collections';
import { delegates_voters_listdata } from '../interfaces';

 /** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<delegates_voters_listdata[]> = new BehaviorSubject<delegates_voters_listdata[]>([]);
  get data(): delegates_voters_listdata[] { return this.dataChange.value; }

  constructor() {
   
  }

  /** Adds a new user to the database. */
  addUser(id:string,public_address_created_reserve_proof:string,total:string,reserve_proof:string) {
    const copiedData = this.data.slice();
    copiedData.push(this.createNewUser(id,public_address_created_reserve_proof,total,reserve_proof));
    this.dataChange.next(copiedData);
  }

  /** Builds and returns a new User. */
  private createNewUser(id:string,public_address_created_reserve_proof:string,total:string,reserve_proof:string) {
    return {
      id: id,
      public_address_created_reserve_proof: public_address_created_reserve_proof,
      total: total,
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

  constructor(private _exampleDatabase: ExampleDatabase) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<delegates_voters_listdata[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._filterChange,
    ];

    return observableMerge(...displayDataChanges).pipe(map(() => {
      return this._exampleDatabase.data.slice().filter((item: delegates_voters_listdata) => {
        let searchStr = (item.public_address_created_reserve_proof + item.total).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });
    }));
  }

  disconnect() {}
}
