# api-chat
simple API 

# Requirements
<ul>
<li>Node.js v14+</li>
<li>PostgreSQL</li>
</ul>

# Running
<ul>
 <li>1. npm install</li>
 <li>2. npm run migrate up</li>
 <li>3. npm run start-dev</li> 
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
