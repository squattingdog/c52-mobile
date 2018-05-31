import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IOathProvider } from '../oauth.provider.interface';
import {OauthCordova} from 'ng2-cordova-oauth/platform/cordova'
import { Facebook } from 'ng2-cordova-oauth/provider/facebook';
import { Config } from '../../../config';
interface ILoginResponse {
	access_token: string;
}
@Injectable()
export class FacebookOauthProvider implements IOathProvider {
	private cordovaOauth: OauthCordova;
	private http: Http;
	private config: Config;
	private facebook: Facebook;
constructor(http: Http, config: Config) {
		this.http = http;
		this.config = config;
		this.facebook = new Facebook({ clientId: "12324", appScope: ["email"] });
		this.cordovaOauth = new OauthCordova();
	}
login(): Promise<string> {
		return this.cordovaOauth.login(this.facebook)
			.then((x: ILoginResponse) => x.access_token);
	}
}