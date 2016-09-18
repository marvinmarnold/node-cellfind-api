import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import xmlbuilder from 'xmlbuilder';
import { parseString } from 'xml2js';

import { envelope, xmlRoot } from './helpers.js';
import { LbsLookups } from '../common/lbs-lookups.js';

export const consent = (lId, token) => {
  const l = LbsLookups.findOne(lId)

  const obj = _.clone(envelope)
  obj['soap:Envelope']['soap:Body'] = {
    "tns:SubmitConsent": {
      "tns:consent": {
        "ccn2:Application": l.applicationName,
        "ccn2:ConsentISODateTime": l.consentedAt.toISOString(),
        "ccn2:Consented": 1,
        "ccn2:LocateeMSISDN": l.locateeMSISDN,
        "ccn2:SessionToken": token
      }
    }
  }

  const xml = xmlbuilder.create(obj, xmlRoot);
  const post = Meteor.wrapAsync(HTTP.post, HTTP)
  let resp = post(Meteor.settings.CELLFIND_SOAP_ENDPOINT, {
    headers: {
      "SOAPAction": "http://tempuri.org/ILBSService/SubmitConsent",
      "Content-Type": "text/xml;charset=UTF-8"
    },
    content: xml.end()
  })

  const parse = Meteor.wrapAsync(parseString)
  return  parse(resp.content)["s:Envelope"]["s:Body"][0]["SubmitConsentResponse"][0]["SubmitConsentResult"][0]
}
