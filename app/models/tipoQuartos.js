var pool = require("../../config/pool_conexoes");

const tipoQuartosModel = {
   findAll: async () => {
   try {
  const [linhas] = await pool.query('SELECT * FROM tipo_quartos WHERE status_quarto = 1')
     return linhas;
   } catch (error) {
  return error;
   }
  },
   totalReg: async () => {
    try {
   const [linhas] = await pool.query('select count(*) total FROM tipo_quartos WHERE status_quarto = 1;')
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
  create: async (camposJson) => {
   try {
const [resultados] = await pool.query(
      "insert into tipo_usuario set ?",
      [camposJson]
        )
        return resultados;
     } catch (error) {
   return error;
    }
  },
 update: async (camposJson) => {
     try {
     const [resultados] = await pool.query(
      "UPDATE tipo_usuario SET tipo_usuario = ?, descricao_usuario = ? WHERE id_tipo_usuario = ?",
     [camposJson.tipo_usuario, camposJson.descricao_usuario, camposJson.id_tipo_usuario],
     )
      return resultados;
    } catch (error) {
     return error;
    }
  },
 delete: async (id) => {
   try {
     const [resultados] = await pool.query(
    "UPDATE tipo_usuario SET status_tipo_usuario = 0 WHERE id_tipo_usuario = ?", [id]
    )
     return resultados;
     } catch (error) {
     return error;
    }
  }

};
    

module.exports = tipoQuartosModel