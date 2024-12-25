# Course

now understanding some concepts
middleware-> app.use(function(req,res,next));
all request below it will get called
all request above it will not get called

jwt
headers.payload.secret->signature
headers ->algo and which form eg jwt
jwt.sign(payload,secret)
const decoded=jwt.decode(token);-> do not care about exp and secret
console.log(decoded);
const verified=jwt.verify(token,secert);->it cares
console.log(verified);