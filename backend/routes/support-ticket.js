import express from 'express'
import { createClient } from '@supabase/supabase-js'
import dotenv from "dotenv";

dotenv.config()
const app = express()
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

app.get("/", async (req, res) => {
    console.log("getting tickets")
    const { data, error } = await supabase
        .from('tickets')
        .select()
    if (error) {
        console.log(error)
    }
    console.log(data)
    res.send(data)
})

app.post("/", async (req, res) => {
    const { error } = await supabase
        .from('tickets')
        .insert({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            description: req.body.description,
            // TODO add status validation either here or in the frontend
            status: req.body.status
        })
    if (error) {
        res.send(error).status(400)
    }
    res.status(200).send("Status created")
})

app.put("/", async (req, res) => {
    const { error } = await supabase
        .from('tickets')
        .update({
            status: req.body.status
        })
        .eq('id', req.body.id)
    if (error) {
        res.send(error).status(400)
    }
    console.log(req.body.id);
    res.send("Item Updated").status(200);
});

export default app