const tarefasModel = require("../models/models");
const moment = require("moment");
const { body, validationResult } = require("express-validator");
const auth = require('./../auth'); // Modúlo de gerenciamento de autenticação

const TarefasControl = {

CriarUsuario: async (req, res) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
 console.log(errors);
return res.render("pages/template-home", {
 dados: req.body,
 listaErros: errors,
  pagina: "cadastro",
  logado: null

 });
 }
    try {
  const resultados = await tarefasModel.create(req.body)
 res.render("pages/template-home", { pagina: "home", logado: null, });

 } catch (error) {
   return error;
     }
  },

   regrasValidacao: [
     body("nome")
     .isLength({ min: 3, max: 45 })
  .withMessage("Nome invalido "),

  body("email")
    .isEmail()
  .withMessage("Email invalido "),

  body("senha")
   .isLength({ min: 8, max: 30 })
    .withMessage("senha invalido, deve conter pelo menos 8 digitos "),

 body("c-senha")
   .notEmpty()
   .withMessage('Campo vazio.')
        .custom((value, { req }) => {
       const senha = req.body.senha
     if (value != senha) {
     throw new Error('Senha diferentes.')
       }
     return true;
     })
   ],
 LoginUsuario: async (req, res) => {
  const errors = validationResult(req);
 if (!errors.isEmpty()) {
    console.log(errors);
    return res.render("pages/template-home", {
     dados: req.body,
     listaErros: errors.array(),
     pagina: "login",
      logado: null
    });
  }

     try {
      const { email, senha } = req.body;
      const user = await tarefasModel.authenticate(email, senha);

        if (!user) {
        return res.render("pages/template-home", {
       mensagem: "Credenciais inválidas",
     pagina: "login",
   logado: null
  });
}

      
 auth.authenticateUser(user.id, user); // Guardas os usuários autenticado

  res.render("pages/template-home", { pagina: "home", logado: user });
 } catch (error) {
 console.error('Erro no login:', error);
return res.render("pages/template-home", {
mensagem: "Erro no login",
pagina: "login",
logado: null
  });
 }
},

    // Defini as regras para efetuar o Loign de Forma Correta
regrasValidacaoLogin: [
body("email").isEmail().withMessage("Email inválido"),
body("senha").notEmpty().withMessage("Senha não pode estar vazia")
  ],

LogoutUsuario: async (req, res) => {
try {
const userId = req.session.user.id; 
auth.logoutUser(userId);

res.redirect('/');
} catch (error) {
console.error('Erro no logout:', error);
res.redirect('/'); 
        }
    }
};

module.exports = TarefasControl;