const {generateId, isNullorEmpty, getUserMoment} = require('../comum/comumFunctions');
const { ExtraPurchasesUser } = require('../db/config/database'); 
const moment = require('moment');

const registerExtraPurchase =  async (req, res) => {
    const purchases = req.body  
    const userMoment = getUserMoment(req); 

    if(Array.isArray(purchases) && purchases.every(item => typeof item === "object" && item == null)){
        return res.status(400).json({message: 'Dados no formato inválido'})
    }
    
    try{
        purchases.forEach(async (element) => {
            const idPurchase = generateId()
              
            if(isNullorEmpty(element.purchaseName) || isNullorEmpty(element.purchaseDate) ||
            isNullorEmpty(element.purchaseTypePayment) ||isNullorEmpty(element.bankName) ||isNullorEmpty(element.purchaseValue) ||
            isNullorEmpty(element.monthPayment)){
                return res.status(400).json({message: 'Campos obrigatórios não preenchidos'})
            }
            //
            await ExtraPurchasesUser.create({
                purchaseName: element.purchaseName,
                purchaseTypePayment: element.purchaseTypePayment,
                bankName: element.bankName,
                purchaseValue: element.purchaseValue,
                monthPayment: element.monthPayment,
                purchaseDate:  moment(element.purchaseDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
                id: idPurchase,
                userId: userMoment
            });
        });

        const list = await ExtraPurchasesUser.findAll({
            where: { userId: userMoment },
            attributes: { exclude: ['userId'] },
            order: [['purchaseDate', 'ASC']]
        });
        
        return res.status(200).json({message: 'Despesa(s) registrada(s) com sucesso', listExtraPurchase: list})
     
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
            attributes: { exclude: ['userId'] },
            order: [['purchaseDate', 'ASC']]
        });
        list.forEach(element => {
            element.purchaseDate =  moment(element.purchaseDate, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY');
        });
        return res.status(200).json({listExtraPurchase: list.length == 0 ? 'Nenhuma compra cadastrada' : list})
    }catch(err){
        return res.status(500).json({message: 'Erro interno do servidor', error: err})
    }
}

const deleteExtraPurchase = async (req, res)=>{
    try{
        const deleteItems = req.body
        const userMoment = getUserMoment(req);   
        
        deleteItems.forEach(async (element) => {
            const item  = await ExtraPurchasesUser.findByPk(element.id)
            if(!item) return res.status(400).json({message: 'Uma ou mais compras não foram encontradas'})
            
            await ExtraPurchasesUser.destroy({
                where: { id: element.id}
            });
        });

        setTimeout(async () => {
            const list = await ExtraPurchasesUser.findAll({
                where: { userId: userMoment },
                attributes: { exclude: ['userId'] } 
              });
              
            return res.status(200).json({message: 'Compra deletada com sucesso',listExtraPurchase: list})
        }, 300);
    }catch(err){
        return res.status(500).json({message: 'Erro interno do servidor', error: err})
    }

}

const getPruchaseById =  async (req, res) =>{
    const {id} = req.params

    try{
        const purchase = await ExtraPurchasesUser.findAll({
            where: { id: id },
            attributes: { exclude: ['userId'] } 
          });

        if(!!purchase){

            return res.status(200).json(purchase)
        }else{
            return res.status(404).json({message: 'Nenhuma compra encontrada'}) 
        }
    }catch (err){
        return res.status(500).json({message: 'Erro interno do servidor', error: err})
    }
}

module.exports = {
    registerExtraPurchase,listExtraPurchase, alterExtraPurchase, deleteExtraPurchase, getPruchaseById
}