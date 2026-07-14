'use strict';

const prisma = require('../../config/db');
const AppError = require('../../common/utils/AppError');

// list the stores with some filters and pagination
// GET - /api/store/get-stores
// query params - page, limit, rating, isOpen, minOrderValue, category, storeType
async function getStores(page = 1, limit = 10, where){

    const stores = await prisma.store.findMany({
        where:{
            ...where
        },
        omit:{
            approvalStatus:true,
            createdAt:true,
            updatedAt:true,    
        },
        take:limit,
        skip:(page -1) * limit
    });
    return stores;
}

// View a single store details for public view
// GET - /api/store/get-store/:storeId
async function getStoreDetails(storeId){
    if(!storeId){
        throw new AppError(400, 'NO_ID_PRESENT', "storeId not received");
    }

    const storeDetails = await prisma.store.findUnique({
        where:{
            id:storeId
        }
    });

    if(!storeDetails){
        throw new AppError(404, "NOT_FOUND", "no store found with provided storeId");
    }

    return storeDetails;
}

module.exports = {
    getStores,
    getStoreDetails
};