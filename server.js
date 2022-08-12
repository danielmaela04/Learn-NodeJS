var http = require("http");
const { url } = require("inspector");

http.createServer((req, res) => {
    res.writeHead(200, { "content-type": "aplication/json" });
   if(req.url === "/produto"){
    res.end (
        JSON.stringify({
            nome: "Daniel",
        })
    )
   }

   if(req.url === "/users"){
    res.end (
        JSON.stringify ([{
            nome: "Daniel",
            email: "danielmassuanganhe04@gmail.com",
            genero: "masculino",
            user_url: "api.onemedia.com/users/daniel-maela"
        }])
    )
   }

   res.end(
    JSON.stringify({
        message: "error 404",
})
   )
}).listen(8080, () => console.log("Esta rodado na porta 8080"));




