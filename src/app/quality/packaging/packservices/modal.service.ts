import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

    export class ModalService {
        public displaydata: BehaviorSubject<any> = new BehaviorSubject<boolean>(false);
        getmodalvalue(value) {
            this.displaydata.next(value);
        }
}
