# api-chat
simple API 

# Requirements
## Node.js v14+
## PostgreSQL

# Running
*run npm install
*npm run migrate up
*npm run start-dev 

# End-Points
<p>users</p>
<div>
 <ul>
  <li>POST /users</li>
  <li>GET /users/{id}</li>
 </ul>
</div>
<p>authentications</p>
<div>
<ul>
  <li>POST /authentications</li>
  <li>PUT /authentications</li>
  <li>DELETE /authentications</li>
</ul>
  </div>
<p> chat </p>
<div>
<ul>
  <li>POST /chat/send</li>
  <li>GET /chat</li>
  <li>GET /chat/{id}</li>
</ul>
  </div>
