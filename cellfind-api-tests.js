// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by cellfind-api.js.
import { name as packageName } from "meteor/cellfind-api";

// Write your tests here!
// Here is an example.
Tinytest.add('cellfind-api - example', function (test) {
  test.equal(packageName, "cellfind-api");
});
