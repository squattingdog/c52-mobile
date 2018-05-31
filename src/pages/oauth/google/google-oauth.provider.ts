import { Injectable } from '@angular/core';
import { IOathProvider } from '../oauth.provider.interface';
import {OauthCordova} from 'ng2-cordova-oauth/platform/cordova'
import { Google } from 'ng2-cordova-oauth/provider/google';
import { Config } from '../../../config';
import { Http } from '@angular/http';
interface ILoginResponse {
	access_token: string;
}
@Injectable()
export class GoogleOauthProvider implements IOathProvider {
	private http: Http;
	private config: Config;
	private cordovaOauth: OauthCordova;
    private google: Google;
    
constructor(http: Http, config: Config) {
		this.http = http;
		this.config = config;
		this.google = new Google(
            { clientId: "618055636264-9untheue81i399ah53i8orek81ipftjj.apps.googleusercontent.com", appScope: ["email"] });
		this.cordovaOauth = new OauthCordova();
	}
login(): Promise<string> {
		return this.cordovaOauth.login(this.google).then((x: ILoginResponse) => x.access_token);
    }
    
}
