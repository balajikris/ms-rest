﻿// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.


import * as assert from 'assert';
import * as nodeFetch from 'node-fetch';
import { WebResource } from '../lib/webResource';
import HttpOperationResponse from '../lib/httpOperationResponse';
import LogFilter from '../lib/filters/logFilter';

describe('Log filter', () => {

  it('should log messages when a logger object is provided', (done) => {
    let expected = `>> Request: {
  "headers": {},
  "rawResponse": false,
  "url": "https://foo.com",
  "method": "PUT",
  "body": {
    "a": 1
  },
  "formData": null
}
>> Response status code: 200
>> Body: null
`;
    let output: string = '';
    let logger: Function = (message: string): void => { output += message + '\n'; };
    let lf = new LogFilter(logger);
    let req = new WebResource('https://foo.com', 'PUT', { "a": 1 });
    let res = new nodeFetch.Response();
    let opRes = new HttpOperationResponse(req, res);
    lf.after(opRes).then(() => {
      assert.deepEqual(output, expected);
      done();
    });
  });
});
