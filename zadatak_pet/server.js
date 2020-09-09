const http = require('http');
const url = require('url');
const querystring = require('query-string');

let artikli = [
    {
        "id" : 1,
        "naziv" : "Koca",
        "cena" : 120,
        "imeKompanije" : "Coca Cola"
    },
    {
        "id" : 2,
        "naziv" : "Pepsi",
        "cena" : 119,
        "imeKompanije" : "Coca Cola"
    }
];

http.createServer(function (req,res){
    let urlObj = url.parse(req.url, true, false);
    if (req.method == "GET"){
        if (urlObj.pathname == "/svi-artikli"){
            response = sviArtikli();
            res.write(`
                <!DOCTYPE html>
                <head>
                    <title>Svi artikli</title>
                </head>
                <body>
                    <h3>Svi Artikli</h3>
                    <a href="/dodaj-artikal">Dodaj artikal</a>
                    <br>
                    <div id="prikaz"
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Naziv</th>
                                    <th>Cena</th>
                                    <th>Ime kompanije</th>
                                    <th>Izmena</th>
                                    <th>Brisanje</th>
                                </tr>
                            </thead>
                        <tbody>
            `);
            for (let o of response){
                res.write(`
                    <tr>
                        <td>${o.id}</td>
                        <td>${o.naziv}</td>
                        <td>${o.cena}</td>
                        <td>${o.imeKompanije}</td>
                        <td><a href="/izmeni-artikal?id=${o.id}">Izmeni artikal</a><td>
                        <td>
                            <form action='/obrisi-artikal' method='POST'>
                                <input type='hidden' name='id' value='${o.id}'>
                                <button type='submit'>Brisanje artikla</button>
                            </form>
                        </td>
                    </tr>
                `);
            }
            res.end(`
                        </tbody>
                    </table>
                </body>
                </html>
            `);
        }
        if (urlObj.pathname == "/izmeni-artikal"){
            let art = artikli.find(x => x.id == urlObj.query.id);
            res.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Izmeni artikal</title>
                </head>
                <body>
                    <h3>Izmeni artikal</h3>
                    <a href="/svi-aritkli">Svi Artikli</a>
                    <br><br>
                    <form action='/Izmeni artikal' method='POST'>
                        ID: <input type='number' name='id' value='${art.id}' readonly><br><br>
                        NAZIV: <input type='text' name='adresa' value='${art.naziv}'><br><br>
                        CENA: <input type='text' name='adresa' value='${art.cena}'><br><br>
                        IMEK: <input type='text' name='adresa' value='${art.imeKompanije}'><br><br>
                        <button type='submit'>IZMENI ARTIKAL</button>
                    </form>
                </body>
                </html>
            `);
        }
    }
    else if (req.method == "POST"){
        if (urlObj.pathname == "/izmeni-artikal"){
            var body='';
                req.on('data', function(data){
                    body += data;
                });
                req.on('end', function(){
                    izmeniArtikal(querystring.parse(body).id,querystring.parse(body).arikal)
                    res.writeHead(302,{
                        'Location': '/svi-artikli'
                    });
                    res.end();
                })
        }
    }
})

function dodajArtikal(id, naziv, cena, imeKompanije){
    let artikal = {
        "id" : id,
        'naziv' : naziv,
        "cena" : cena,
        "imeKompanije" : imeKompanije
    };
    artikli.push(arikal);
}

function sviArtikli(imeKompanije){
    let pomocna = [];
    for (let i = 0; i < artikli.length; i++){
        if (artikli[i].imeKompanije == imeKompanije){
            pomocna.push(artikli[i]);
            artikli = pomocna;
            return artikli;
        }else{
            return artikli;
        }
    }
}

function obrisiArtikal(id){
    let novi = [];
    for (let i = 0; i < artikli.length; i++){
        if (artikli[i].id != id){
            novi.push(artikli[i]);
        }
    }
    artikli = novi;
    return artikli
}

function izmeniArtikal(id, naziv, cena, imeKompanije){
    for (let i = 0; i < artikli.length; i++){
        if (artikli[i].id == id){
            artikli[i].naziv = naziv;
            artikli[i].cena = cena;
            artikli[i].imeKompanije = imeKompanije;
        }
    }
}