To POST: 
curl --request POST --header "Content-Type: application/json" \
--data '{
  "id":"property2",
  "listedBy":{"name":"Bruce Wayne","phoneNumber":"987-654-3210"},
  "property":{"type":"Single Family","features":{
    "location":"1007 Mountain Drive, Gotham",
    "price":"$1,200,000",
    "numberOfBeds":5,
    "numberOfBaths":4,
    "area":{"totalLivingArea":"5000 sq ft","totalLotArea":"15000 sq ft"}
  }}
}' \
http://localhost:3000/api/profiles


To GET:
curl http://localhost:3000/api/profiles
curl http://localhost:3000/api/profiles/property2
