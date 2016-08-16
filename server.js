import { Meteor } from 'meteor/meteor';
import { getLocation } from './cellfind-api.js';

Meteor.methods({
  'cellfind.test': function() {
    return getLocation(
      Meteor.settings.CELLFIND_APPNAME,
      "1",
      Meteor.settings.CELLFIND_LOCATEE,
      Meteor.settings.CELLFIND_LOCATOR,
    )
  },
});
