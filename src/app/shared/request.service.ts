import { Injectable } from '@angular/core';
import { Http, Headers, ResponseContentType ,RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';

import { MONSTERA, ANYVAR } from '../shared/global';
import { UserRequest } from '../shared/core.model';

@Injectable()
export class RequestService {
    private headersJSON = new Headers({ 'Content-Type': 'application/json' });
    //private headersURLEncoded = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' });
    private listRequest: UserRequest[] = Array();

    constructor(private http: Http ) {

    }

    //CREATE REQUEST
    //data = { nik : 123, subject : '', desc : '' }
    public submitNewRequest(data : any) {
        const options = new RequestOptions({
            headers: this.headersJSON
          });
        
        let promise = new Promise((resolve, reject) => {
            this.http.post(`${MONSTERA.API_URL}/v1/requests`, JSON.stringify(data) , options)
                .timeout(2000)
                .toPromise()
                .then(
                res => { // Success
                    let jsonRes = res.json();
                    
                    if(jsonRes.valid >= 200 && jsonRes.valid < 300){
                        if(jsonRes.data != null){
                            this.listRequest = res.json().data.map(item => {
                                return new UserRequest(
                                    item.requestId,
                                    item.reqDate,
                                    item.subject,
                                    item.desc,
                                    item.nik,
                                    item.resolveById,
                                    item.resolveById,
                                    item.resolveDate,
                                    item.actionNote,
                                    item.status
                                );
                            });
                        }
                        resolve({statusCode : jsonRes.valid, message: jsonRes.message});
                    }else{
                        reject({statusCode : 301, message :jsonRes.message});
                    }                                                   
                },
                err => { // Error
                    reject(err);
                }
            );
        });
        return promise;
    }

    ///Delete
    //data = { requestId : 123 }
    public deleteNewRequest(data : any) {
        const options = new RequestOptions({
            headers: this.headersJSON
          });
        
        let promise = new Promise((resolve, reject) => {
            this.http.post(`${MONSTERA.API_URL}/v1/requests`, JSON.stringify(data) , options)
                .timeout(2000)
                .toPromise()
                .then(
                res => { // Success
                    let jsonRes = res.json();
                    
                    if(jsonRes.valid >= 200 && jsonRes.valid < 300){
                        
                        resolve({statusCode : jsonRes.valid, message: jsonRes.message});
                    }else{
                        reject({statusCode : 301, message :jsonRes.message});
                    }                                                   
                },
                err => { // Error
                    reject(err);
                }
            );
        });
        return promise;
    }

    //GET REQUESTS
    getRequests(nik: number = 0) {
        let promise = new Promise((resolve, reject) => {
            let apiURL = `${MONSTERA.API_URL}/v1/requests/${nik}`;
            //console.log('[getRequests] ' + apiURL);
            this.http.get(apiURL)
                .timeout(2000)
                .toPromise()
                .then(
                res => { // Success
                    //console.log(res.json());
                    if (res.json().valid == 200) {
                        this.listRequest = res.json().data.map(item => {
                            return new UserRequest(
                                item.requestId,
                                item.reqDate,
                                item.subject,
                                item.desc,
                                item.nik,
                                item.resolveById,
                                item.resolveById,
                                item.resolveDate,
                                item.actionNote,
                                item.status
                            );
                        });
                    }

                    resolve(this.listRequest);
                },
                msg => { // Error
                    reject(msg);
                }
                );
        });
        return promise;
    }
}