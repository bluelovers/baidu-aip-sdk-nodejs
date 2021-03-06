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
 * @file AipImageCensor
 * @author baiduAip
 */
import BaseClient = require('./client/baseClient');

import RequestInfo = require('./client/requestInfo');

import objectTools = require('./util/objectTools');

import HttpClient = require('./http/httpClient');

import HttpClientJson = require('./http/httpClientExt');

import httpHeader = require('./const/httpHeader');

const CONTENT_TYPE_JSON = 'application/json';

const METHOD_POST = 'POST';

const PATH_USER_DEFINED = '/rest/2.0/solution/v1/img_censor/user_defined';
const PATH_ANTIPORN_GIF = '/rest/2.0/antiporn/v1/detect_gif';
const PATH_FACEAUDIT = '/rest/2.0/solution/v1/face_audit';
const PATH_COMBOCENSOR = '/api/v1/solution/direct/img_censor';
const PATH_REPORT = '/rpc/2.0/feedback/v1/report';

const PATH_ANTIPORN = '/rest/2.0/antiporn/v1/detect';
const PATH_ANTITERROR = '/rest/2.0/antiterror/v1/detect';

const scope = require('./const/devScope').DEFAULT;


/**
 * AipImageCensor类，构造调用图像审核对象
 *
 * @class
 * @extends BaseClient
 * @constructor
 * @param {string} appid appid.
 * @param {string} ak  access key.
 * @param {string} sk  security key.
 */
class AipImageCensor extends BaseClient {
    constructor(appId, ak, sk) {
        super(appId, ak, sk);
    }

    commonImpl(param) {
        let httpClient = new HttpClient();
        let apiUrl = param.targetPath;
        delete param.targetPath;
        let requestInfo = new RequestInfo(apiUrl,
            param, METHOD_POST);
        return this.doRequest(requestInfo, httpClient);
    }

    jsonRequestImpl(param) {
        let httpClient = new HttpClientJson();
        let apiUrl = param.targetPath;
        delete param.targetPath;
        let requestInfo = new RequestInfo(apiUrl,
            param, METHOD_POST, false, {
                [httpHeader.CONTENT_TYPE]: CONTENT_TYPE_JSON
            });
        return this.doRequest(requestInfo, httpClient);
    }

    antiPornGif(image, options) {
        let param = {
            image: image,
            targetPath: PATH_ANTIPORN_GIF
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    antiPorn(image, options) {
        let param = {
            image: image,
            targetPath: PATH_ANTIPORN
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    antiTerror(image, options) {
        let param = {
            image: image,
            targetPath: PATH_ANTITERROR
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    faceAudit(images, type, configId) {
        let param = {configId: configId} as {
            configId,
            imgUrls?: string,
            images?: string,
            targetPath,
        };
        if (type === 'url') {
            images = images.map(function (elm) {
                return encodeURIComponent(elm);
            });
            param.imgUrls = images.join(',');
        }
        if (type === 'base64') {
            param.images = images.join(',');
        }
        param.targetPath = PATH_FACEAUDIT;
        return this.commonImpl(param);
    }

    imageCensorUserDefined(image, type) {
        let param = {} as {
            imgUrl?: string,
            image?: string,
            targetPath,
        };
        if (type === 'url') {
            param.imgUrl = image;
        }
        if (type === 'base64') {
            param.image = image;
        }
        param.targetPath = PATH_USER_DEFINED;
        return this.commonImpl(param);
    }

    imageCensorComb(image, type, scenes, scenesConf) {
        let param = {} as {
            imgUrl?: string,
            image?: string,
            scenes,
            sceneConf,
            targetPath,
        };
        if (type === 'url') {
            param.imgUrl = image;
        }
        if (type === 'base64') {
            param.image = image;
        }
        param.scenes = scenes;
        param.sceneConf = scenesConf;
        param.targetPath = PATH_COMBOCENSOR;
        return this.jsonRequestImpl(param);
    }

    report(feedback) {
        let param = {
            feedback,
            targetPath: PATH_REPORT
        };
        return this.jsonRequestImpl(param);
    }
}

export default AipImageCensor
// @ts-ignore
Object.assign(AipImageCensor, exports);
// @ts-ignore
export = AipImageCensor;
