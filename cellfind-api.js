import { Meteor } from 'meteor/meteor';

import { LbsLookups } from './common/lbs-lookups.js';
import { consent } from './methods/consent.js';
import { locate } from './methods/locate.js';
import { logIn } from './methods/logIn.js';
import { logOut } from './methods/logOut.js';

const getLocation = (appName, contactId, locatee, locator) => {
  // Open session
  const [lId, token] = logIn(appName, contactId, locatee, locator)
  let location = null

  if(lId && token) {
    const consented = consent(lId, token)
    console.log("Consented: " + consented);

    // Check location if user consented
    if(consented) {
      location = locate(lId, token)

      if(location)
        LbsLookups.update(lId, {$set: location})
    }
  }

  // Close session
  if(token)
    console.log("Logged out: " + logOut(token))

  return location
}

export {
  consent,
  locate,
  logIn,
  logOut,
  getLocation,
  LbsLookups
}
