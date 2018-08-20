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
 * @file http头常量
 * @author baiduAip
 */
const HttpHeader = {
    BCE_DATE: 'x-bce-date',
    HOST: 'Host',
    BCE_AUTHORIZATION: 'authorization',
    CONTENT_TYPE: 'Content-Type'
};
module.exports = Object.freeze(HttpHeader);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cEhlYWRlci5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsic3JjL2NvbnN0L2h0dHBIZWFkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBQ2I7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFDSCxNQUFNLFVBQVUsR0FBRztJQUNmLFFBQVEsRUFBRSxZQUFZO0lBQ3RCLElBQUksRUFBRSxNQUFNO0lBQ1osaUJBQWlCLEVBQUUsZUFBZTtJQUNsQyxZQUFZLEVBQUUsY0FBYztDQUMvQixDQUFDO0FBRUYsaUJBQVMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0Jztcbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IEJhaWR1LmNvbSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoXG4gKiB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvblxuICogYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGVcbiAqIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICogQGZpbGUgaHR0cOWktOW4uOmHj1xuICogQGF1dGhvciBiYWlkdUFpcFxuICovXG5jb25zdCBIdHRwSGVhZGVyID0ge1xuICAgIEJDRV9EQVRFOiAneC1iY2UtZGF0ZScsXG4gICAgSE9TVDogJ0hvc3QnLFxuICAgIEJDRV9BVVRIT1JJWkFUSU9OOiAnYXV0aG9yaXphdGlvbicsXG4gICAgQ09OVEVOVF9UWVBFOiAnQ29udGVudC1UeXBlJ1xufTtcblxuZXhwb3J0ID0gT2JqZWN0LmZyZWV6ZShIdHRwSGVhZGVyKTtcbiJdfQ==