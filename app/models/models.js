var pool = require("../../config/pool_conexoes")
const bcrypt = require('bcrypt');
const saltRounds = 10; 

const tarefasModel = {
    create: async (data) => {
  try {
  
const hashedPassword = await bcrypt.hash(data.senha, saltRounds);

 const [linhas] = await pool.query(
 'INSERT INTO usuario (`nome_usuario`, `email_usuario`, `senha_usuario`) VALUES (?, ?, ?)',
   [data.nome, data.email, hashedPassword]
  );

return linhas;
 } catch (error) {
   throw error; 
   }
 },


 findByEmail: async (email) => {
  try {
  const [rows] = await pool.query('SELECT * FROM usuario WHERE email_usuario = ?', [email]);
  return rows[0]; 
  } catch (error) {
    console.error('Erro ao buscar usuário por email:', error);
        throw error;
     }
 },

 totalReg: async () => {
 try {
   const [linhas] = await pool.query('select count(*) FROM tipo_quartos WHERE status_quarto = 1;')
  return linhas;
 } catch (error) {
 return error;
 }  
 },

 findPage: async (pagina, total) => {
   try {
      const [linhas] = await pool.query('select * from tipo_quartos where status_quarto = 1 limit ?, ?', [pagina,total])
      return linhas;
     } catch (error) {
      return error;
  }  
 },
    
update: async (camposForm) => {
    try {
const [resultados] = await pool.query(
"UPDATE usuario SET nome_usuario = ?, user_usuario = ?, senha_usuario = ?,  " +
 " email_usuario = ?, fone_usuario = ?, tipo_usuario = ?, status_usuario = ? " +
   " WHERE id_usuario = ?",
    [camposForm.nome_usuario, camposForm.user_usuario, camposForm.senha_usuario,
     camposForm.email_usuario, camposForm.fone_usuario, camposForm.tipo_usuario,
      camposForm.status_usuario, camposForm.id_usuario]
      )
       return resultados;
     } catch (error) {
    console.log(error);
      return error;
   }
},

delete: async (id) => {
   try {
  const [resultados] = await pool.query(
     "UPDATE usuario SET status_usuario = 0 WHERE id_usuario = ? ", [id]
       )
      return resultados;
     } catch (error) {
 console.log(error);
  return error;
  }
 },

authenticate: async (email, senha) => {
   try {
const [rows] = await pool.query('SELECT * FROM usuario WHERE email_usuario = ?', [email]);
const user = rows[0];

  if (!user) {
 return null; 
 }

 
 const match = await bcrypt.compare(senha, user.senha_usuario);

  if (match) {
      return user; 
 } else {
 return null; 
 }
} catch (error) {
 throw error; 
     }
 },
    
  
};

module.exports = tarefasModel;
