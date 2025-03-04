const {generateId, isNullorEmpty, getUserMoment} = require('../comum/comumFunctions');
const { ExtraPurchasesUser } = require('../db/config/database'); 


const registerExtraPurchase =  async (req, res) => {
    const purchases = req.body  

    if(Array.isArray(purchases) && purchases.every(item => typeof item === "object" && item == null)){
        return res.status(400).json({message: 'Dados no formato inválido'})
    }
    
    try{
        for (const item of purchases ) {
            const {purchaseName,purchaseDate, purchaseTypePayment,bankName, purchaseValue,monthPayment } = item
             if(isNullorEmpty(purchaseName) || isNullorEmpty(purchaseDate) ||
             isNullorEmpty(purchaseTypePayment) ||isNullorEmpty(bankName) ||isNullorEmpty(purchaseValue) ||isNullorEmpty(monthPayment)){
                 return res.status(400).json({message: 'Campos obrigatórios não preenchidos'})
             }else{
                 
                     const idPurchase = generateId()
                     const userMoment = getUserMoment(req);   
         
                     await ExtraPurchasesUser.create({
                         purchaseName: purchaseName,
                         purchaseTypePayment: purchaseTypePayment,
                         bankName: bankName,
                         purchaseValue: purchaseValue,
                         monthPayment: monthPayment,
                         purchaseDate: purchaseDate,
                         id:idPurchase,
                         userId: userMoment
                     });
         
                     const list = await ExtraPurchasesUser.findAll({
                        where: { userId: userMoment },
                        attributes: { exclude: ['userId'] } 
                      });
                      
                    
                     return res.status(200).json({message: 'Despesa(s) registrada(s) com sucesso', listExtraPurchase: list})
             }
         }
     
    }catch (err){
        return res.status(500).json({message: 'Erro interno do servidor', error: err})
    }


}

const alterExtraPurchase = async (req, res) =>{
    const purchasesAlter = req.body  
    const userMoment = getUserMoment(req);   

    try{
        for (const alterItem of purchasesAlter) {
            const {purchaseName,purchaseDate, purchaseTypePayment,bankName, purchaseValue,monthPayment, id } = alterItem
    
    
                const exist =  await ExtraPurchasesUser.findByPK(id)
            
                if(exist.length == 0) return res.status(400).json({message: 'Uma ou mais compras não foram encontradas. Verifique as informações!'})
    
                await ExtraPurchasesUser.update({
                    purchaseName: purchaseName,
                    purchaseTypePayment: purchaseTypePayment,
                    bankName: bankName,
                    purchaseValue: purchaseValue,
                    monthPayment: monthPayment,
                    purchaseDate: purchaseDate
                })
                
                const list = await ExtraPurchasesUser.findAll({
                    where: { userId: userMoment },
                    attributes: { exclude: ['userId'] } 
                  });
                  
                return res.status(200).json({message: 'Informações alteradas com sucesso', listExtraPurchase: list})
        }
    }catch(err){
        return res.status(500).json({message: 'Erro interno do servidor', error: err})
    }

}

const listExtraPurchase = async (req, res) =>{
    try{
        const userMoment = getUserMoment(req);   
        const list = await ExtraPurchasesUser.findAll({
            where: { userId: userMoment },
            attributes: { exclude: ['userId'] } 
          });
        return res.status(200).json({listExtraPurchase: list})
    }catch(err){
        return res.status(500).json({message: 'Erro interno do servidor', error: err})
    }
}

const deleteExtraPurchase = async (req, res)=>{
    try{
        const deleteItems = req.body

        for (const deleteItem of deleteItems) {
            if(!!await ExtraPurchasesUser.findByPk(deleteItem)){
                await ExtraPurchasesUser.destroy({
                    where: { id: deleteItem }
                });

                const list = await ExtraPurchasesUser.findAll({
                    where: { userId: userMoment },
                    attributes: { exclude: ['userId'] } 
                  });
                return res.status(200).json({listExtraPurchase: list})
            }else{
                return res.status(400).json({message: 'Uma ou mais compras não foram encontradas'})
            }
        }
    }catch(err){
        return res.status(500).json({message: 'Erro interno do servidor', error: err})
    }

}

module.exports = {
    registerExtraPurchase,listExtraPurchase, alterExtraPurchase, deleteExtraPurchase
}