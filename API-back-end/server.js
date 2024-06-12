import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())




/*Método para criar Usuárioos*/
app.post('/usuarios', async (req, res) => {


    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json('Ok post, aqui deu certo')

})


/*Método para Listar Usuárioos*/
app.get('/usuarios', async (req, res) => {
    let users = []

    if (req.query.name) {
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })
    } else {
        users = await prisma.user.findMany()
    }

    res.status(200).json(users)
})



/*Método para Editar Usuárioos*/
app.put('/usuarios/:id', async (req, res) => {


    await prisma.user.update({
        where: {
            id: req.params.id
        },

        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json('Ok post, aqui deu certo')

})



/*Método para Deletar Usuárioos*/
app.delete('/usuarios/:id', async (req, res) => {


    await prisma.user.delete({
        where: {
            id: req.params.id
        },


    })

    res.status(200).json({ message: "Usuário deletado com Sucesso!" })

})


app.listen(3000)
/**
 * avelinodev
 * avelinodev2024
 */