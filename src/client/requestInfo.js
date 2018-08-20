'use strict';
/**
 * Copyright (c) 2017 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file requestInfo
 * @author baiduAip
 */
const HttpHeader = require("../const/httpHeader");
const CloudAuth = require("../auth/cloudAuth");
const HOST_DEFAULT = 'aip.baidubce.com';
const CONTENT_TYPE_FORMDEFAULT = 'application/x-www-form-urlencoded';
const SYMBOL_QUERYSTRING_PREFIX = '?aipSdk=node&access_token=';
const SYMBOL_QUERYSTRING_PREFIX_BCE = '?aipSdk=node';
const SYMBOL_HTTPS_PREFIX = 'https://';
const SYMBOL_HTTP_PREFIX = 'http://';
/**
* RequestInfo类
* 构造供request库调用的请求信息对象
*
* @constructor
*/
class RequestInfo {
    constructor(path, params, method, isHttp, headers) {
        this.isHttp = isHttp || false;
        this.method = method;
        this.host = HOST_DEFAULT;
        this.path = path;
        this.params = params;
        this.createDate = new Date();
        // @ts-ignore
        this.mergeHeaders = headers || {};
        this.devAccessToken = null;
        this.initCommonHeader();
    }
    setHost(host) {
        this.host = host;
        this.headers[HttpHeader.HOST] = this.host;
    }
    initCommonHeader() {
        // @ts-ignore
        this.headers = {};
        this.headers[HttpHeader.HOST] = this.host;
        this.headers[HttpHeader.CONTENT_TYPE] = CONTENT_TYPE_FORMDEFAULT;
        for (let p in this.mergeHeaders) {
            this.headers[p] = this.mergeHeaders[p];
        }
    }
    makeDevOptions(devAccessToken) {
        this.devAccessToken = devAccessToken;
        this.path += SYMBOL_QUERYSTRING_PREFIX + devAccessToken.token;
    }
    makeBceOptions(ak, sk) {
        let cloudAuth = new CloudAuth(ak, sk);
        this.headers[HttpHeader.BCE_DATE] = this.getUTCDateStr();
        let signature = cloudAuth.getAuthorization(this.method, this.path, { aipSdk: 'node' }, this.headers, this.createDate.getTime());
        this.headers[HttpHeader.BCE_AUTHORIZATION] = signature;
    }
    getUTCDateStr() {
        let dateStrUTC = this.createDate.toISOString().replace(/\.\d+Z$/, 'Z');
        return dateStrUTC;
    }
    getAccessToken() {
        if (this.devAccessToken !== null) {
            return this.devAccessToken.token;
        }
        return null;
    }
    getUrl() {
        if (this.isHttp) {
            return this.getHttpUrl();
        }
        return this.getHttpsUrl();
    }
    getPureUrl() {
        return this.getUrl().split('?')[0];
    }
    getHttpsUrl() {
        return SYMBOL_HTTPS_PREFIX + this.host + this.path + SYMBOL_QUERYSTRING_PREFIX_BCE;
    }
    getHttpUrl() {
        return SYMBOL_HTTP_PREFIX + this.host + this.path + SYMBOL_QUERYSTRING_PREFIX_BCE;
    }
}
exports.default = RequestInfo;
// @ts-ignore
Object.assign(RequestInfo, exports);
module.exports = RequestInfo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdEluZm8uanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInNyYy9jbGllbnQvcmVxdWVzdEluZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBQ2I7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFDSCxrREFBbUQ7QUFFbkQsK0NBQWdEO0FBSWhELE1BQU0sWUFBWSxHQUFHLGtCQUFrQixDQUFDO0FBRXhDLE1BQU0sd0JBQXdCLEdBQUcsbUNBQW1DLENBQUM7QUFFckUsTUFBTSx5QkFBeUIsR0FBRyw0QkFBNEIsQ0FBQztBQUMvRCxNQUFNLDZCQUE2QixHQUFHLGNBQWMsQ0FBQztBQUVyRCxNQUFNLG1CQUFtQixHQUFHLFVBQVUsQ0FBQztBQUN2QyxNQUFNLGtCQUFrQixHQUFHLFNBQVMsQ0FBQztBQUVwQzs7Ozs7RUFLRTtBQUNILE1BQU0sV0FBVztJQWViLFlBQVksSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFjLEVBQUUsTUFBZ0IsRUFBRSxPQUFXO1FBQ25FLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxJQUFJLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDN0IsYUFBYTtRQUNiLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBQ0QsT0FBTyxDQUFDLElBQUk7UUFDUixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNq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bSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoXG4gKiB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvblxuICogYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGVcbiAqIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICogQGZpbGUgcmVxdWVzdEluZm9cbiAqIEBhdXRob3IgYmFpZHVBaXBcbiAqL1xuaW1wb3J0IEh0dHBIZWFkZXIgPSByZXF1aXJlKCcuLi9jb25zdC9odHRwSGVhZGVyJyk7XG5cbmltcG9ydCBDbG91ZEF1dGggPSByZXF1aXJlKCcuLi9hdXRoL2Nsb3VkQXV0aCcpO1xuaW1wb3J0IHtIZWFkZXJzfSBmcm9tIFwicmVxdWVzdFwiO1xuaW1wb3J0IERldkF1dGhUb2tlbiA9IHJlcXVpcmUoJy4uL2F1dGgvZGV2QXV0aFRva2VuJyk7XG5cbmNvbnN0IEhPU1RfREVGQVVMVCA9ICdhaXAuYmFpZHViY2UuY29tJztcblxuY29uc3QgQ09OVEVOVF9UWVBFX0ZPUk1ERUZBVUxUID0gJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCc7XG5cbmNvbnN0IFNZTUJPTF9RVUVSWVNUUklOR19QUkVGSVggPSAnP2FpcFNkaz1ub2RlJmFjY2Vzc190b2tlbj0nO1xuY29uc3QgU1lNQk9MX1FVRVJZU1RSSU5HX1BSRUZJWF9CQ0UgPSAnP2FpcFNkaz1ub2RlJztcblxuY29uc3QgU1lNQk9MX0hUVFBTX1BSRUZJWCA9ICdodHRwczovLyc7XG5jb25zdCBTWU1CT0xfSFRUUF9QUkVGSVggPSAnaHR0cDovLyc7XG5cbiAvKipcbiAqIFJlcXVlc3RJbmZv57G7XG4gKiDmnoTpgKDkvptyZXF1ZXN05bqT6LCD55So55qE6K+35rGC5L+h5oGv5a+56LGhXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmNsYXNzIFJlcXVlc3RJbmZvPEggZXh0ZW5kcyBIZWFkZXJzID0gSGVhZGVycz4ge1xuXG4gICAgIGlzSHR0cDogYm9vbGVhbjtcbiAgICAgbWV0aG9kOiBzdHJpbmc7XG4gICAgIGhvc3Q6IHN0cmluZyB8IHR5cGVvZiBIT1NUX0RFRkFVTFQ7XG4gICAgIHBhdGg7XG4gICAgIHBhcmFtcztcbiAgICAgY3JlYXRlRGF0ZTogRGF0ZTtcbiAgICAgbWVyZ2VIZWFkZXJzOiBIO1xuICAgICBkZXZBY2Nlc3NUb2tlbjogRGV2QXV0aFRva2VuO1xuXG4gICAgIGhlYWRlcnM6IEggJiBIZWFkZXJzICYge1xuICAgICAgICAgW2sgaW4ga2V5b2YgdHlwZW9mIEh0dHBIZWFkZXJdPzogYW55XG4gICAgIH07XG5cbiAgICBjb25zdHJ1Y3RvcihwYXRoLCBwYXJhbXMsIG1ldGhvZDogc3RyaW5nLCBpc0h0dHA/OiBib29sZWFuLCBoZWFkZXJzPzogSCkge1xuICAgICAgICB0aGlzLmlzSHR0cCA9IGlzSHR0cCB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBtZXRob2Q7XG4gICAgICAgIHRoaXMuaG9zdCA9IEhPU1RfREVGQVVMVDtcbiAgICAgICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgICAgICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7XG4gICAgICAgIHRoaXMuY3JlYXRlRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGhpcy5tZXJnZUhlYWRlcnMgPSBoZWFkZXJzIHx8IHt9O1xuICAgICAgICB0aGlzLmRldkFjY2Vzc1Rva2VuID0gbnVsbDtcbiAgICAgICAgdGhpcy5pbml0Q29tbW9uSGVhZGVyKCk7XG4gICAgfVxuICAgIHNldEhvc3QoaG9zdCkge1xuICAgICAgICB0aGlzLmhvc3QgPSBob3N0O1xuICAgICAgICB0aGlzLmhlYWRlcnNbSHR0cEhlYWRlci5IT1NUXSA9IHRoaXMuaG9zdDtcbiAgICB9XG4gICAgaW5pdENvbW1vbkhlYWRlcigpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLmhlYWRlcnMgPSB7fTtcbiAgICAgICAgdGhpcy5oZWFkZXJzW0h0dHBIZWFkZXIuSE9TVF0gPSB0aGlzLmhvc3Q7XG4gICAgICAgIHRoaXMuaGVhZGVyc1tIdHRwSGVhZGVyLkNPTlRFTlRfVFlQRV0gPSBDT05URU5UX1RZUEVfRk9STURFRkFVTFQ7XG4gICAgICAgIGZvciAobGV0IHAgaW4gdGhpcy5tZXJnZUhlYWRlcnMpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyc1twXSA9IHRoaXMubWVyZ2VIZWFkZXJzW3BdO1xuICAgICAgICB9XG4gICAgfVxuICAgIG1ha2VEZXZPcHRpb25zKGRldkFjY2Vzc1Rva2VuOiBEZXZBdXRoVG9rZW4pIHtcbiAgICAgICAgdGhpcy5kZXZBY2Nlc3NUb2tlbiA9IGRldkFjY2Vzc1Rva2VuO1xuICAgICAgICB0aGlzLnBhdGggKz0gU1lNQk9MX1FVRVJZU1RSSU5HX1BSRUZJWCArIGRldkFjY2Vzc1Rva2VuLnRva2VuO1xuICAgIH1cbiAgICBtYWtlQmNlT3B0aW9ucyhhazogc3RyaW5nLCBzazogc3RyaW5nKSB7XG4gICAgICAgIGxldCBjbG91ZEF1dGggPSBuZXcgQ2xvdWRBdXRoKGFrLCBzayk7XG4gICAgICAgIHRoaXMuaGVhZGVyc1tIdHRwSGVhZGVyLkJDRV9EQVRFXSA9IHRoaXMuZ2V0VVRDRGF0ZVN0cigpO1xuICAgICAgICBsZXQgc2lnbmF0dXJlID0gY2xvdWRBdXRoLmdldEF1dGhvcml6YXRpb24odGhpcy5tZXRob2QsXG4gICAgICAgICAgICB0aGlzLnBhdGgsIHthaXBTZGs6ICdub2RlJ30sIHRoaXMuaGVhZGVycywgdGhpcy5jcmVhdGVEYXRlLmdldFRpbWUoKSk7XG4gICAgICAgIHRoaXMuaGVhZGVyc1tIdHRwSGVhZGVyLkJDRV9BVVRIT1JJWkFUSU9OXSA9IHNpZ25hdHVyZTtcbiAgICB9XG4gICAgZ2V0VVRDRGF0ZVN0cigpIHtcbiAgICAgICAgbGV0IGRhdGVTdHJVVEMgPSB0aGlzLmNyZWF0ZURhdGUudG9JU09TdHJpbmcoKS5yZXBsYWNlKC9cXC5cXGQrWiQvLCAnWicpO1xuICAgICAgICByZXR1cm4gZGF0ZVN0clVUQztcbiAgICB9XG4gICAgZ2V0QWNjZXNzVG9rZW4oKSB7XG4gICAgICAgIGlmICh0aGlzLmRldkFjY2Vzc1Rva2VuICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZXZBY2Nlc3NUb2tlbi50b2tlbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZ2V0VXJsKCkge1xuICAgICAgICBpZiAodGhpcy5pc0h0dHApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEh0dHBVcmwoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5nZXRIdHRwc1VybCgpO1xuICAgIH1cbiAgICBnZXRQdXJlVXJsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRVcmwoKS5zcGxpdCgnPycpWzBdO1xuICAgIH1cbiAgICBnZXRIdHRwc1VybCgpIHtcbiAgICAgICAgcmV0dXJuIFNZTUJPTF9IVFRQU19QUkVGSVggKyB0aGlzLmhvc3QgKyB0aGlzLnBhdGggKyBTWU1CT0xfUVVFUllTVFJJTkdfUFJFRklYX0JDRTtcbiAgICB9XG4gICAgZ2V0SHR0cFVybCgpIHtcbiAgICAgICAgcmV0dXJuIFNZTUJPTF9IVFRQX1BSRUZJWCArIHRoaXMuaG9zdCArIHRoaXMucGF0aCArIFNZTUJPTF9RVUVSWVNUUklOR19QUkVGSVhfQkNFO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVxdWVzdEluZm87XG4vLyBAdHMtaWdub3JlXG5PYmplY3QuYXNzaWduKFJlcXVlc3RJbmZvLCBleHBvcnRzKTtcbi8vIEB0cy1pZ25vcmVcbmV4cG9ydCA9IFJlcXVlc3RJbmZvO1xuIl19