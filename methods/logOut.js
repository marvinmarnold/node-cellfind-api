import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import xmlbuilder from 'xmlbuilder';
import { parseString } from 'xml2js';

import { envelope, xmlRoot } from './helpers.js';

export const logOut = (token) => {
  console.log('logOut');

  const obj = _.clone(envelope)
  obj['soap:Envelope']['soap:Body'] = {
    "tns:LogOut": {
      "tns:SessionToken": {'#text': token}
    }
  }

  const xml = xmlbuilder.create(obj, xmlRoot);

  const post = Meteor.wrapAsync(HTTP.post, HTTP)
  let resp = post(Meteor.settings.CELLFIND_SOAP_ENDPOINT, {
    headers: {
      "SOAPAction": "http://tempuri.org/ILBSService/LogOut",
      "Content-Type": "text/xml;charset=UTF-8"
    },
    content: xml.end()
  })

  const parse = Meteor.wrapAsync(parseString)
  return parse(resp.content)["s:Envelope"]["s:Body"][0]["LogOutResponse"][0]["LogOutResult"][0]
}
