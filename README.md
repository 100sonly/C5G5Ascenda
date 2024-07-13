# C5G5 ESC Project

## Backend APIs

### Hotels
#### /destination/:destination_id
Gives information on hotels at a given destination. `destination_id` can be obtained from a place name by querying the static file `destinations.json`<br>
Example:
```
http://localhost:3000/hotels/destination/RsBU
```
#### /hotel/:hotel_id
Gives information on a particular hotel given a `hotel_id`.<br>
Example:
```
http://localhost:3000/hotels/hotel/rqRC
```
### Prices
#### /destination/:destination_id/:checkin/:checkout/:lang/:currency/:guests
Gives the pricing inforation for hotels at a particular destination.<br>
Example:
```
http://localhost:3000/prices/destination/A0HL/2024-12-25/2025-01-07/en_US/SGD/2
```
#### /hotel/:hotel_id/:destination_id/:checkin/:checkout/:lang/:currency/:guests
Gives pricing information of rooms at a particular hotel.<br>
Example:
```
http://localhost:3000/prices/hotel/rqRC/A0HL/2024-12-25/2025-01-07/en_US/SGD/1
```