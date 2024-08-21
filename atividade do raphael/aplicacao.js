const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'publico')));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/evento/:id', (req, res) => {
    const eventos = [
        {
            id: 1,
            nome: 'Show de Rock da Banda IRA',
            data: '21/08/2024',
            horario: '20:00',
            local: 'Rancho Quarto de Milha - Pres. Prudente - SP',
            preco: 199.00,
            descricao: 'Um show imperdível da banda IRA, tocando seus maiores sucessos em uma noite de puro rock!',
            ingressosDisponiveis: 1500
        },
    ];

    const evento = eventos.find(e => e.id === parseInt(req.params.id));

    if (evento) {
        res.render('detalhes', { evento });
    } else {
        res.status(404).send('Evento não encontrado');
    }
});

app.post('/comprar/:id', (req, res) => {
    const { id } = req.params;
    const quantidade = parseInt(req.body.quantidade, 10);

    res.send(`Você comprou ${quantidade} ingressos para o evento ${id}.`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
