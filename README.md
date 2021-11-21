# api-chat
simple API 

# Requirements
<ul>
<li>Node.js v14+</li>
<li>PostgreSQL</li>
</ul>

# Running
<ul>
 <li>run npm install</li>
 <li>npm run migrate up</li>
 <li>npm run start-dev</li> 
</ul>

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
