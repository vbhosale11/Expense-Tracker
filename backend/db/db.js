const express=require('express')
const mongoose=require('mongoose')

require('dotenv').config()

const app=express()

const db = async() => {
    try{
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to database")
    }catch(error){
        console.log("Error connecting to database", error)
    }
}

module.exports = {db}