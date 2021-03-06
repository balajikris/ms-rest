// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information. 

'use strict';

import BaseFilter from './baseFilter';
import HttpOperationResponse from '../httpOperationResponse';
const isStream = require('is-stream');

class LogFilter extends BaseFilter {

  logger?: any;

  constructor(logger: any = console.log) {
    super();
    this.logger = logger;
  }

  after(operationResponse: HttpOperationResponse): Promise<HttpOperationResponse> {
    let self = this;
    self.logger(`>> Request: ${JSON.stringify(operationResponse.request, null, 2)}`);
    self.logger(`>> Response status code: ${operationResponse.response.status}`);
    let responseBody = operationResponse.body;
    if (isStream(operationResponse.body)) {
      responseBody = 'The response body is a stream. Hence omitting it from logging.'
    }
    self.logger(`>> Body: ${responseBody}`);
    return Promise.resolve(operationResponse);
  }
}

export default LogFilter;