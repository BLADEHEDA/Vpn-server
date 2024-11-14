# VPN Server API

This API allows for CRUD operations on VPN servers. It is built with TypeScript and Express and is deployed at: **https://vpn-server-ten.vercel.app/servers**

## Base URL : https://vpn-server-ten.vercel.app/servers

## API Endpoints

- **GET /servers** - Get a list of all VPN servers.
- **GET /servers/:id** - Get a specific VPN server by ID.
- **POST /servers** - Add a new VPN server.
- **PUT /servers/:id** - Update a VPN server by ID.
- **DELETE /servers/:id** - Delete a VPN server by ID.

---

## Testing the API

### Prerequisites
- Install [Postman](https://www.postman.com/downloads/) or [Thunder Client](https://www.thunderclient.io/).

### Example Requests

1. **Get All Servers**
   - **GET** `https://vpn-server-ten.vercel.app/servers`
   - Retrieves an array of VPN servers.

2. **Get Server by ID**
   - **GET** `https://vpn-server-ten.vercel.app/servers/{id}`
   - Replace `{id}` with the server ID to fetch specific details.

3. **Add New Server**
   - **POST** `https://vpn-server-ten.vercel.app/servers`
   - **Body**:
     ```json
     {
       "name": "Example Server",
       "flag": "🇺🇸",
       "icon": "cellular-outline"
     }
     ```

4. **Update Server by ID**
   - **PUT** `https://vpn-server-ten.vercel.app/servers/{id}`
   - Replace `{id}` with the server ID to update.
   - **Body**:
     ```json
     {
       "name": "Updated Server",
       "flag": "🇨🇦",
       "icon": "updated-icon"
     }
     ```

5. **Delete Server by ID**
   - **DELETE** `https://vpn-server-ten.vercel.app/servers/{id}`
   - Replace `{id}` with the server ID to delete.

---

### Example Responses

- **GET /servers**:
  ```json
  [
    { "id": "123", "name": "Example Server", "flag": "🇺🇸", "icon": "cellular-outline" },
    { "id": "124", "name": "Another Server", "flag": "🇨🇦", "icon": "network-outline" }
  ]
Notes
Replace {id} with actual server IDs in endpoint URLs when testing.
Use JSON format for request bodies when adding or updating servers.
Happy Testing!
