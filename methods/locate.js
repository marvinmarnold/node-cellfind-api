import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import xmlbuilder from 'xmlbuilder';
import { parseString } from 'xml2js';

import { envelope, xmlRoot } from './helpers.js';
import { LbsLookups } from '../common/lbs-lookups.js';

export const locate = (lId, token) => {
  const l = LbsLookups.findOne(lId)

  const obj = _.clone(envelope)
  obj['soap:Envelope']['soap:Body'] = {
    "tns:GetLocation": {
      "tns:locationrequest": {
        "ccn2:SessionToken": token,
        "ccn2:Application": l.applicationName,
        "ccn2:LocateeMSISDN": l.locateeMSISDN,
        "ccn2:LocatorMSISDN": l.locatorMSISDN,
        "ccn2:TransactionID": l.transactionID
      }
    }
  }

  const xml = xmlbuilder.create(obj, xmlRoot);
  const post = Meteor.wrapAsync(HTTP.post, HTTP)
  let resp = post(Meteor.settings.CELLFIND_SOAP_ENDPOINT, {
    headers: {
      "SOAPAction": "http://tempuri.org/ILBSService/GetLocation",
      "Content-Type": "text/xml;charset=UTF-8"
    },
    content: xml.end()
  })

  const parse = Meteor.wrapAsync(parseString)

  const r = parse(resp.content)["s:Envelope"]["s:Body"][0]["GetLocationResponse"][0]["GetLocationResult"][0]

  return {
    accuracy          : parseInt(r["a:Distance"][0]),
    latitude          : parseFloat(r["a:Latitude"][0]),
    longitude         : parseFloat(r["a:Longitude"][0]),
    network           : r["a:Network"][0],
    locatorMSISDN     : r["a:LocatorMSISDN"][0],
    locateeMSISDN     : r["a:LocateeMSISDN"][0],
    locatedAt         : r["a:LocationISODateTime"][0]
  }
}
