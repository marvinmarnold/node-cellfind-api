export default LbsPermissionsSchema = new SimpleSchema({
  consentedAt: {
    type: Date
  },
  contactId: {
    type: String
  },
  applicationName: {
    type: String
  },
  locatorMSISDN: {
    type: String
  },
  locateeMSISDN: {
    type: String
  },
  transactionID: {
    type: String
  },
  // decimal degrees
  latitude: {
    type: Number,
    decimal: true,
    optional: true
  },
  // decimal degrees
  longitude: {
    type: Number,
    decimal: true,
    optional: true
  },
  // Accuracy in meters
  accuracy: {
    type: Number,
    optional: true
  },
  locatedAt: {
    type: Date,
    optional: true
  },
  network: {
    type: String,
    optional: true
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      } else {
        this.unset();
      }
    }
  }
});
