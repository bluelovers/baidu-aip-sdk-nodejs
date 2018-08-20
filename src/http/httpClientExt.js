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
 * @file httpClientExt类
 * @author baiduAip
 */
const HttpClient = require("./httpClient");
const CONTENT_TYPE_JSON = 'application/json';
/**
 * HttpClientExt类
 * 图像审核某个接口调用需要json的Content-type,请求body为json字符串
 *
 * @class
 * @extends HttpClient
 * @constructor
 */
class HttpClientExt extends HttpClient {
    postWithInfo(requestInfo) {
        let body = this.createBody(requestInfo.params);
        let options = {
            method: requestInfo.method,
            url: requestInfo.getUrl(),
            headers: requestInfo.headers,
            encoding: null,
            timeout: HttpClient.DEFAULT_TIMEOUT,
            body: body
        };
        return this.req(options);
    }
    createBody(param) {
        let body = JSON.stringify(param);
        return body;
    }
}
exports.default = HttpClientExt;
// @ts-ignore
Object.assign(HttpClientExt, exports);
module.exports = HttpClientExt;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cENsaWVudEV4dC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsic3JjL2h0dHAvaHR0cENsaWVudEV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFDYjs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUVILDJDQUE0QztBQUc1QyxNQUFNLGlCQUFpQixHQUFHLGtCQUFrQixDQUFDO0FBRzdDOzs7Ozs7O0dBT0c7QUFDSCxNQUFNLGFBQWlCLFNBQVEsVUFBYTtJQUN4QyxZQUFZLENBQUMsV0FBd0I7UUFDakMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0MsSUFBSSxPQUFPLEdBQUc7WUFDVixNQUFNLEVBQUUsV0FBVyxDQUFDLE1BQU07WUFDMUIsR0FBRyxFQUFFLFdBQVcsQ0FBQyxNQUFNLEVBQUU7WUFDekIsT0FBTyxFQUFFLFdBQVcsQ0FBQyxPQUFPO1lBQzVCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsT0FBTyxFQUFFLFVBQVUsQ0FBQyxlQUFlO1lBQ25DLElBQUksRUFBRSxJQUFJO1NBQ2IsQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsVUFBVSxDQUFDLEtBQUs7UUFDWixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Q0FDSjtBQUVELGtCQUFlLGFBQWEsQ0FBQztBQUM3QixhQUFhO0FBQ2IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFFdEMsaUJBQVMsYUFBYSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgQmFpZHUuY29tLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWRcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGhcbiAqIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uXG4gKiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZVxuICogc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiBAZmlsZSBodHRwQ2xpZW50RXh057G7XG4gKiBAYXV0aG9yIGJhaWR1QWlwXG4gKi9cblxuaW1wb3J0IEh0dHBDbGllbnQgPSByZXF1aXJlKCcuL2h0dHBDbGllbnQnKTtcbmltcG9ydCBjb2RlID0gcmVxdWlyZSgnLi4vY29uc3QvY29kZScpO1xuaW1wb3J0IEh0dHBIZWFkZXIgPSByZXF1aXJlKCcuLi9jb25zdC9odHRwSGVhZGVyJyk7XG5jb25zdCBDT05URU5UX1RZUEVfSlNPTiA9ICdhcHBsaWNhdGlvbi9qc29uJztcbmltcG9ydCBSZXF1ZXN0SW5mbyA9IHJlcXVpcmUoJy4uL2NsaWVudC9yZXF1ZXN0SW5mbycpO1xuXG4vKipcbiAqIEh0dHBDbGllbnRFeHTnsbtcbiAqIOWbvuWDj+WuoeaguOafkOS4quaOpeWPo+iwg+eUqOmcgOimgWpzb27nmoRDb250ZW50LXR5cGUs6K+35rGCYm9keeS4umpzb27lrZfnrKbkuLJcbiAqXG4gKiBAY2xhc3NcbiAqIEBleHRlbmRzIEh0dHBDbGllbnRcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5jbGFzcyBIdHRwQ2xpZW50RXh0PFQ+IGV4dGVuZHMgSHR0cENsaWVudDxUPiB7XG4gICAgcG9zdFdpdGhJbmZvKHJlcXVlc3RJbmZvOiBSZXF1ZXN0SW5mbykge1xuICAgICAgICBsZXQgYm9keSA9IHRoaXMuY3JlYXRlQm9keShyZXF1ZXN0SW5mby5wYXJhbXMpO1xuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIG1ldGhvZDogcmVxdWVzdEluZm8ubWV0aG9kLFxuICAgICAgICAgICAgdXJsOiByZXF1ZXN0SW5mby5nZXRVcmwoKSxcbiAgICAgICAgICAgIGhlYWRlcnM6IHJlcXVlc3RJbmZvLmhlYWRlcnMsXG4gICAgICAgICAgICBlbmNvZGluZzogbnVsbCxcbiAgICAgICAgICAgIHRpbWVvdXQ6IEh0dHBDbGllbnQuREVGQVVMVF9USU1FT1VULFxuICAgICAgICAgICAgYm9keTogYm9keVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5yZXEob3B0aW9ucyk7XG4gICAgfVxuICAgIGNyZWF0ZUJvZHkocGFyYW0pIHtcbiAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeShwYXJhbSk7XG4gICAgICAgIHJldHVybiBib2R5O1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSHR0cENsaWVudEV4dDtcbi8vIEB0cy1pZ25vcmVcbk9iamVjdC5hc3NpZ24oSHR0cENsaWVudEV4dCwgZXhwb3J0cyk7XG4vLyBAdHMtaWdub3JlXG5leHBvcnQgPSBIdHRwQ2xpZW50RXh0O1xuIl19