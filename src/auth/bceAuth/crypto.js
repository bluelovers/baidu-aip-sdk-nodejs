"use strict";
/**
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
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
 * @file src/crypto.js
 * @author leeight
 */
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-env node */
const fs = require("fs");
const crypto = require("crypto");
const Q = require("q");
function md5sum(data, enc, digest) {
    if (!Buffer.isBuffer(data)) {
        data = new Buffer(data, enc || 'UTF-8');
    }
    var md5 = crypto.createHash('md5');
    md5.update(data);
    return md5.digest(digest || 'base64');
}
exports.md5sum = md5sum;
function md5stream(stream, digest) {
    var deferred = Q.defer();
    var md5 = crypto.createHash('md5');
    stream.on('data', function (chunk) {
        md5.update(chunk);
    });
    stream.on('end', function () {
        deferred.resolve(md5.digest(digest || 'base64'));
    });
    stream.on('error', function (error) {
        deferred.reject(error);
    });
    return deferred.promise;
}
exports.md5stream = md5stream;
function md5file(filename, digest) {
    return md5stream(fs.createReadStream(filename), digest);
}
exports.md5file = md5file;
function md5blob(blob, digest) {
    var deferred = Q.defer();
    var reader = new FileReader();
    reader.readAsArrayBuffer(blob);
    reader.onerror = function (e) {
        deferred.reject(reader.error);
    };
    reader.onloadend = function (e) {
        // @ts-ignore
        if (e.target.readyState === FileReader.DONE) {
            // @ts-ignore
            var content = e.target.result;
            var md5 = md5sum(content, null, digest);
            deferred.resolve(md5);
        }
    };
    return deferred.promise;
}
exports.md5blob = md5blob;
const _crypto = require("./crypto");
exports.default = _crypto;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J5cHRvLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJzcmMvYXV0aC9iY2VBdXRoL2NyeXB0by50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7O0dBY0c7O0FBRUgscUJBQXFCO0FBRXJCLHlCQUEwQjtBQUMxQixpQ0FBa0M7QUFFbEMsdUJBQXdCO0FBRXhCLFNBQWdCLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU07SUFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDeEIsSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLElBQUksT0FBTyxDQUFDLENBQUM7S0FDM0M7SUFFRCxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFakIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxRQUFRLENBQUMsQ0FBQztBQUMxQyxDQUFDO0FBVEQsd0JBU0M7QUFFRCxTQUFnQixTQUFTLENBQUMsTUFBTSxFQUFFLE1BQU07SUFDcEMsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBRXpCLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxLQUFLO1FBQzdCLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEIsQ0FBQyxDQUFDLENBQUM7SUFDSCxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRTtRQUNiLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNyRCxDQUFDLENBQUMsQ0FBQztJQUNILE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVUsS0FBSztRQUM5QixRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDO0FBQzVCLENBQUM7QUFmRCw4QkFlQztBQUVELFNBQWdCLE9BQU8sQ0FBQyxRQUFRLEVBQUUsTUFBTTtJQUNwQyxPQUFPLFNBQVMsQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDNUQsQ0FBQztBQUZELDBCQUVDO0FBRUQsU0FBZ0IsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNO0lBQ2hDLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUV6QixJQUFJLE1BQU0sR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO0lBQzlCLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixNQUFNLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztRQUN4QixRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQyxDQUFDLENBQUM7SUFDRixNQUFNLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQztRQUMxQixhQUFhO1FBQ2IsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsS0FBSyxVQUFVLENBQUMsSUFBSSxFQUFFO1lBQ3pDLGFBQWE7WUFDYixJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUM5QixJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztZQUN4QyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3pCO0lBQ0wsQ0FBQyxDQUFDO0lBQ0YsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDO0FBQzVCLENBQUM7QUFsQkQsMEJBa0JDO0FBRUQsb0NBQW9DO0FBQ3BDLGtCQUFlLE9BQU8sQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IEJhaWR1LmNvbSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoXG4gKiB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvblxuICogYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGVcbiAqIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICogQGZpbGUgc3JjL2NyeXB0by5qc1xuICogQGF1dGhvciBsZWVpZ2h0XG4gKi9cblxuLyogZXNsaW50LWVudiBub2RlICovXG5cbmltcG9ydCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5pbXBvcnQgY3J5cHRvID0gcmVxdWlyZSgnY3J5cHRvJyk7XG5cbmltcG9ydCBRID0gcmVxdWlyZSgncScpO1xuXG5leHBvcnQgZnVuY3Rpb24gbWQ1c3VtKGRhdGEsIGVuYywgZGlnZXN0KSB7XG4gICAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoZGF0YSkpIHtcbiAgICAgICAgZGF0YSA9IG5ldyBCdWZmZXIoZGF0YSwgZW5jIHx8ICdVVEYtOCcpO1xuICAgIH1cblxuICAgIHZhciBtZDUgPSBjcnlwdG8uY3JlYXRlSGFzaCgnbWQ1Jyk7XG4gICAgbWQ1LnVwZGF0ZShkYXRhKTtcblxuICAgIHJldHVybiBtZDUuZGlnZXN0KGRpZ2VzdCB8fCAnYmFzZTY0Jyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZDVzdHJlYW0oc3RyZWFtLCBkaWdlc3QpIHtcbiAgICB2YXIgZGVmZXJyZWQgPSBRLmRlZmVyKCk7XG5cbiAgICB2YXIgbWQ1ID0gY3J5cHRvLmNyZWF0ZUhhc2goJ21kNScpO1xuICAgIHN0cmVhbS5vbignZGF0YScsIGZ1bmN0aW9uIChjaHVuaykge1xuICAgICAgICBtZDUudXBkYXRlKGNodW5rKTtcbiAgICB9KTtcbiAgICBzdHJlYW0ub24oJ2VuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShtZDUuZGlnZXN0KGRpZ2VzdCB8fCAnYmFzZTY0JykpO1xuICAgIH0pO1xuICAgIHN0cmVhbS5vbignZXJyb3InLCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgZGVmZXJyZWQucmVqZWN0KGVycm9yKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWQ1ZmlsZShmaWxlbmFtZSwgZGlnZXN0KSB7XG4gICAgcmV0dXJuIG1kNXN0cmVhbShmcy5jcmVhdGVSZWFkU3RyZWFtKGZpbGVuYW1lKSwgZGlnZXN0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1kNWJsb2IoYmxvYiwgZGlnZXN0KSB7XG4gICAgdmFyIGRlZmVycmVkID0gUS5kZWZlcigpO1xuXG4gICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGJsb2IpO1xuICAgIHJlYWRlci5vbmVycm9yID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZGVmZXJyZWQucmVqZWN0KHJlYWRlci5lcnJvcik7XG4gICAgfTtcbiAgICByZWFkZXIub25sb2FkZW5kID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBpZiAoZS50YXJnZXQucmVhZHlTdGF0ZSA9PT0gRmlsZVJlYWRlci5ET05FKSB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICB2YXIgY29udGVudCA9IGUudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICAgIHZhciBtZDUgPSBtZDVzdW0oY29udGVudCwgbnVsbCwgZGlnZXN0KTtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUobWQ1KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG59XG5cbmltcG9ydCAqIGFzIF9jcnlwdG8gZnJvbSAnLi9jcnlwdG8nO1xuZXhwb3J0IGRlZmF1bHQgX2NyeXB0b1xuXG5cblxuXG4iXX0=