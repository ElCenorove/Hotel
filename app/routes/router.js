var express = require("express");
var router = express.Router();
const tipoQuartosController = require("../controllers/tipoQuartosController");
const TarefasControl = require("../controllers/control");
const { body, validationResult } = require("express-validator");

// Rota padrão para a página inicial
router.get("/", function (req, res) {
    res.render("pages/template-home", { pagina: "home", logado: null });
});

// Rota para listar tipos de quartos paginados
router.get(`/quartos`, function (req, res) {
    tipoQuartosController.listarTiposQuartosPaginados(req, res);
});

// Rota para página estática de quartos
router.get("/quartos-estatico", function (req, res) {
    res.render("pages/template-home", { pagina: "quartos-estatico", logado: null });
});

// Rota para página de login
router.get("/login", function (req, res) {
    res.render("pages/template-home", { pagina: "login", logado: null });
});

// Rota para página de cadastro de usuário
router.get("/cadastro", function (req, res) {
    res.render("pages/template-home", { pagina: "cadastro", logado: null, retorno: null, listaErros: null, dados: null });
});

// Rota para processar o cadastro de usuário
router.post("/cadastro", TarefasControl.regrasValidacao, async function (req, res) {
    TarefasControl.CriarUsuario(req, res);
});

// Rota para página de perfil
router.get("/perfil", function (req, res) {
    res.render("pages/template-home", { pagina: "perfil" });
});

// Rota para página de administração principal
router.get("/adm", function (req, res) {
    res.render("pages/adm/template-adm", { pagina: "index" });
});

// Rota para página de administração de clientes
router.get("/adm-cliente", function (req, res) {
    res.render("pages/adm/template-adm", { pagina: "cliente/index" });
});

// Rota para página de criação de novo cliente
router.get("/adm-cliente-novo", function (req, res) {
    res.render("pages/adm/template-adm", { pagina: "cliente/create" });
});

// Rota para página de edição de cliente
router.get("/adm-cliente-edit", function (req, res) {
    res.render("pages/adm/template-adm", { pagina: "cliente/edit" });
});

// Rota para página de detalhes de cliente
router.get("/adm-cliente-list", function (req, res) {
    res.render("pages/adm/template-adm", { pagina: "cliente/detalhes" });
});

// Rota para página de exclusão de cliente
router.get("/adm-cliente-del", function (req, res) {
    res.render("pages/adm/template-adm", { pagina: "cliente/delete" });
});

router.post("/login", TarefasControl.regrasValidacaoLogin, function (req, res) {
  TarefasControl.LoginUsuario(req, res);
});

router.get('/LogOut', TarefasControl.LogoutUsuario);

module.exports = router;
