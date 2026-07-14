'use strict';

const service = require('./service');
const { success } = require('../../common/utils/response');

// GET /api/store/get-stores
async function getStores(req, res, next) {
    try {
        const {page = 1, limit = 10, rating, onlyOpen, minOrderValue, category, storeType, search} = req.query;
        const where = {};

        if(search){
            where.name = {
                contains: search,
                mode: 'insensitive'
            }
        }
        if(rating){
            where.rating = {
                gte:Number(rating)
            }
        }
        if(onlyOpen!==undefined){
            where.isOpen = onlyOpen === 'true'
        }
        if(minOrderValue){
            where.minOrderAmount = {
                lte:Number(minOrderValue)
            }
        }
        if(category){
            where.category = {
                in:category.split(',')
            }
        }
        if(storeType){
            where.storeType = {
                in:storeType.split(',')
            }
        }

        const stores = await service.getStores(Number(page), Number(limit), where);
        return success(res, 'Stores retrieved', stores);
    } catch (err) {
        next(err);
    }
}

// GET /api/store/get-store/:storeId
async function getStoreDetails(req,res,next){
    try{
        const { storeId } = req.params;
        const details = await service.getStoreDetails(storeId);
        return success(res,"Store details retrieved successfully",details)

    }catch(err){
        next(err);
    }
}

module.exports = {
    getStores,
    getStoreDetails
};