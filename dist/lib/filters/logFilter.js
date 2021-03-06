// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information. 
'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var baseFilter_1 = require("./baseFilter");
var isStream = require('is-stream');
var LogFilter = (function (_super) {
    __extends(LogFilter, _super);
    function LogFilter(logger) {
        if (logger === void 0) { logger = console.log; }
        var _this = _super.call(this) || this;
        _this.logger = logger;
        return _this;
    }
    LogFilter.prototype.after = function (operationResponse) {
        var self = this;
        self.logger(">> Request: " + JSON.stringify(operationResponse.request, null, 2));
        self.logger(">> Response status code: " + operationResponse.response.status);
        var responseBody = operationResponse.body;
        if (isStream(operationResponse.body)) {
            responseBody = 'The response body is a stream. Hence omitting it from logging.';
        }
        self.logger(">> Body: " + responseBody);
        return Promise.resolve(operationResponse);
    };
    return LogFilter;
}(baseFilter_1["default"]));
exports["default"] = LogFilter;
