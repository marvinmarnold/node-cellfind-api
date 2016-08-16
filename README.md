# Usage
Not available in Atmosphere. Must clone repo to `/packages`.
````javascript
cd packages
git clone https://github.com/marvinmarnold/node-cellfind-api
cd ..
meteor add marvin:cellfind-api
````

Add values to `settings.json`.
````
{
  "CELLFIND_USER_ID": 123,
  "CELLFIND_PASSWORD": "PASSWORD",
  "CELLFIND_SOAP_ENDPOINT": "http://www.cellfindportal.co.za/LBSAggregationService/Service.svc/soap",
  "CELLFIND_LOCATEE": "27555555555", // Person you are trying to locate
  "CELLFIND_LOCATOR": "27555555555", // Admin number
  "CELLFIND_APPNAME": "123", // Typically String form of CELLFIND_USER_ID
}
````
