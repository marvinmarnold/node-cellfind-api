import LbsLookupsSchema from './lbs-lookups-schema.js';

export const LbsLookups= new Mongo.Collection("LbsLookups");
LbsLookups.attachSchema(LbsLookupsSchema);
