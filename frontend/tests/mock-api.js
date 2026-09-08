import http from "http";

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200);
    res.end("ok");
    return;
  }

  if (req.method !== "POST" || req.url !== "/api/bilforsikring/kjop") {
    res.writeHead(404);
    res.end();
    return;
  }

  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => {
    const data = JSON.parse(body);

    if (data.registreringsnummer === "EF 99999") {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ detail: "Noe gikk galt hos oss. Prøv igjen." }));
      return;
    }

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        avtalenummer: "AVT-TEST123",
        status: "AVTALE_SENDT",
        dekningstype: data.dekningstype,
        startdato: data.startdato,
        arspremie: "5000",
      })
    );
  });
});

server.listen(3001, () => console.log("Mock API på port 3001"));
