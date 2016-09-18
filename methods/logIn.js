import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import xmlbuilder from 'xmlbuilder';
import { parseString } from 'xml2js';

import { envelope, xmlRoot } from './helpers.js';
import { LbsLookups } from '../common/lbs-lookups.js';

export const logIn = (appName, contactId, locatee, locator) => {
  lId = LbsLookups.insert({
    consentedAt: new Date(),
    contactId: contactId,
    applicationName: appName,
    locateeMSISDN: locatee,
    locatorMSISDN: locator,
    transactionID: 999999999 - LbsLookups.find().count()
  })

  const l = LbsLookups.findOne(lId)

  const obj = _.clone(envelope)
  obj['soap:Envelope']['soap:Body'] = {
    "tns:LogIn": {
      "tns:loginrequest": {
        "ccn2:Password": {'#text': Meteor.settings.CELLFIND_PASSWORD},
        "ccn2:UserID": {'#text': Meteor.settings.CELLFIND_USER_ID}
      }
    }
  }

  const xml = xmlbuilder.create(obj, xmlRoot);
  const post = Meteor.wrapAsync(HTTP.post, HTTP)
  let resp = post(Meteor.settings.CELLFIND_SOAP_ENDPOINT, {
    headers: {
      "SOAPAction": "http://tempuri.org/ILBSService/LogIn",
      "Content-Type": "text/xml;charset=UTF-8"
    },
    content: xml.end()
  })

  const parse = Meteor.wrapAsync(parseString)
  const token = parse(resp.content)["s:Envelope"]["s:Body"][0]["LogInResponse"][0]["LogInResult"][0]

  return [lId, token]
}
