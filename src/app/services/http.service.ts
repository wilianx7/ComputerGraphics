import { NgtHttpPagination, NgtHttpResponse, NgtHttpService, NgtHttpSort } from 'ng-tailwind';
import { Observable, Observer } from 'rxjs';

export class HttpService implements NgtHttpService {
    get(connector: any, filters: any, pagination: NgtHttpPagination, sort: NgtHttpSort): Observable<NgtHttpResponse> {
        return Observable.create((observer: Observer<NgtHttpResponse>) => {
            observer.next({
                data: [],
                meta: {
                    pagination: {
                        count: 1,
                        page: pagination.page,
                        pages: 1,
                        total: 1,
                        from: 1,
                        to: 1,
                        per_page: pagination.per_page ? pagination.per_page : 15,
                    }
                }
            });
        });
    }

    post(data: any): Observable<any> {
        throw new Error("Method not implemented.");
    }

    put(data: any): Observable<any> {
        throw new Error("Method not implemented.");
    }

    delete(data: any): Observable<any> {
        throw new Error("Method not implemented.");
    }
}