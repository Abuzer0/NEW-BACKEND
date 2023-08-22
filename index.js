
const express = require('express');
const cors = require('cors');
const bodyParser = require ('body-parser');
const dotenv = require ('dotenv');
const mongoose = require('mongoose');
const app = express();
app.use(cors());
dotenv.config();
app.use(bodyParser.json())


console.log("test");





const ReferenceSchema = new mongoose.Schema({
    name: String,
    content: String,
    link: String,
    imageURL: String
});


const ReferenceModel = new mongoose.model('reference', ReferenceSchema);




app.get('/api',(req,res)=>{
    res.send('welcome to our API!')
})

// REFERENCES CRUD
// GET ALL REFERENCES
app.get('/api/references', async (req,res)=>{
    const{name} = req.query;
    const references =  await ReferenceModel.find();
    if(!name){
        res.status(200).send(references);
    }
    else{
        const searchedReferences = references.filter((x)=>x.name.toLowerCase().trim().includes(name.toLocaleLowerCase().trim()))
        res.status(200).send(searchedReferences);

    }
});

// GET ALL REFERENCES BY ID
app.get('/api/references/:id', async (req,res)=>{
    const id = req.params.id;
    const references = await ReferenceModel.findById(id)
    res.status(200).send(references);
})

// DELETE REFERENCE
app.delete('/api/references/:id', async (req,res)=>{
    const id=req.params.id;
    // delete
    const deleteReference = await ReferenceModel.findByIdAndDelete(id);
    res.status(203).send({
        message: `${deleteReference.name} deleted succesfuly!`,
    }) 
})

// POST REFERENCE
app.post('/api/references',async(req,res)=>{
     const {name,content,imageURL,link} = req.body;
     const newReference = new ReferenceModel({
        name:name,
        content:content,
        imageURL:imageURL,
        link:link,
     });
     await newReference.save();

     if(!name){
        res.status(204).send('name is required')
     }
     if(!content){
        res.status(204).send('content is required')
     }
     if(!imageURL){
        res.status(204).send('imageURL is required')
     }
     res.status(201).send({
        message:`${newReference.name} posted succesfuly`
     })
})

// EDIT REFERENCE
app.put('/api/references/:id', async (req,res)=>{
    const id = req.params.id;
    const {name,content,imageURL,link} = req.body;
    const updatingReference ={
        name:name,
        content:content,
        link:link,
        imageURL:imageURL,
    }
     await ReferenceModel.findByIdAndUpdate(id,updatingReference);

    res.status(203).send(`${updatingReference.name} updated succesfuly`)
})






const EkinSchema = new mongoose.Schema({
    name: String,
    weight: Number,
    link: String,
    imageURL: String
})

const EkinModel = new mongoose.model('Ekin',EkinSchema)

// EKİN MAKİNA CRUD

//  GET ALL
app.get('/api/ekin-makina',async(req,res)=>{
    const{name} = req.query;
    const ekin = await EkinModel.find()
    if(!name){
        res.status(200).send(ekin)
    }
    else{
        const searchedEkin = ekin.filter((x)=>x.name.toLowerCase().trim().includes(name.toLocaleLowerCase().trim()))

        res.status(200).send(searchedEkin)
    }
});

// GET ALL EKIN BY ID
app.get('/api/ekin-makina/:id', async(req,res)=>{
    const id = req.params.id;
    const ekin = await EkinModel.findById(id)
    res.status(200).send(ekin)
})

// DELETE EKIN PRODUCTS
app.delete('/api/ekin-makina/:id',async(req,res)=>{
    const id = req.params.id
// delete
    const deleteEkin = await EkinModel.findByIdAndDelete(id)
    res.status(203).send(`${deleteEkin.name} deleted succesfuly`)
})

// POST EKIN PRODUCTS
app.post('/api/ekin-makina',async(req,res)=>{
    const {name,weight,imageURL,link} = req.body;
    const newEkinProduct = new EkinModel ({
        name:name,
        weight:weight,
        imageURL:imageURL,
        link:link
    })
    await newEkinProduct.save()
    if(!name){
        res.status(204).send('name is required')
    }
    if(!imageURL){
        res.status(294).send('imageURL is required')
    }
    res.status(201).send({
        message:`${newEkinProduct.name} posted succesfuly`
})
    
})

// EDIT EKIN PRODUCT
app.put('/api/ekin-makina',async(req,res)=>{
    const id = req.params.id;
    const {name, weight ,imageURL,link}=req.body;
    const updatingEkinProduct ={
        name:name,
        weight:weight,
        link:link,
        imageURL:imageURL,
    }
    await EkinModel.findByIdAndUpdate(id,updatingEkinProduct)
    
    res.status(203).send(`${updatingEkinProduct.name} updated succesfuly`)
})





const AtlasSchema = new mongoose.Schema({
    name: String,
    link: String,
    imageURL: Object
})

const AtlasModel = new mongoose.model('atlas',AtlasSchema)





//  GET ALL
app.get('/api/atlasics', async(req,res)=>{
    const{name} = req.query;
    const atlas = await AtlasModel.find()
    if(!name){
        res.status(200).send(atlas)
    }
    else{
        const searchedAtlas =atlas.filter((x)=>x.name.toLowerCase().trim().includes(name.toLowerCase().trim()))
        res.status(200).send(searchedAtlas)
    }
});

// GET ATLASICS BY ID
app.get('/api/atlasics/:id',async(req,res)=>{
    const id = req.params.id
    const atlas = await AtlasModel.findById(id)

    res.status(200).send(atlas)
})

// DELETE ATLASICS
app.delete('/api/atlasics/:id', async(req,res)=>{
    const id = req.params.id
    // delete
    const deleteAtlasics = await AtlasModel.findByIdAndDelete(id)
    res.status(203).send(`${deleteAtlasics.name} deleted succesfuly`)
})

// POST ATLASICS
app.post('/api/atlasics', async(req,res)=>{
    const {name ,imageURL,link} = req.body;
    const newAtlasics = new AtlasModel ({
        name:name,
        imageURL:imageURL,
        link:link
    })
    await newAtlasics.save()
    if(!name){
        res.status(204).send('name is required')
    }
    if(!imageURL){
        res.status(204).send('imageURL is required')
    }
    res.status(201).send({
        message:`${newAtlasics.name} posted succesfuly`
    })
})

// EDIT ATLASICS
app.put('/api/atlasics/:id', async(req,res)=>{
    const id = req.params.id;
    const {name,imageURL,link}=req.body;
    const updatingAtlasics = {
        name:name,
        link:link,
        imageURL:imageURL,
    }
    await AtlasModel.findByIdAndUpdate(id,updatingAtlasics)

    res.status(203).send(`${updatingAtlasics.name} updated succesfuly`)
})




const AwetaSchema = new mongoose.Schema({
    name: String,
    link: String,
    imageURL: String
})

const AwetaModel = new mongoose.model('aweta',AwetaSchema)



// GET ALL
app.get('/api/aweta',async(req,res)=>{
    const{name} = req.query;
    const aweta = await AwetaModel.find()

    if(!name){
        res.status(200).send(aweta)
    }
    else{
        const searchedAweta = aweta.filter((x)=>x.name.toLowerCase().trim().includes(name.toLocaleLowerCase().trim()))
        res.status(200).send(searchedAweta)
    }
});

// GET AWETA BY ID
app.get('/api/aweta/:id', async(req,res)=>{
    const id = req.params.id
    const aweta = await AwetaModel.findById(id)
    res.status(200).send(aweta)
})

// DELETE AWETA
app.delete('/api/aweta/:id', async(req,res)=>{  
    const id = req.params.id
    // delete
    const deleteAweta = await AwetaModel.findByIdAndDelete(id)
    res.status(203).send(`${deleteAweta.name} deleted succesfuly!`)
})

// POST AWETA
app.post('/api/aweta', async(req,res)=>{
const {name,imageURL,link} = req.body;
const newAweta = new AwetaModel({
    name:name,
    imageURL:imageURL,
    link:link
})
await newAweta.save()
if(!name){
    res.status(204).send('name is required')
}
if(!imageURL){
    res.status(204).send('imageURL is required')
}
res.status(201).send({
    message:`${newAweta.name} posted succesfuly`
})
})

// EDIT AWETA
app.put('/api/aweta/:id', async(req,res)=>{
    const id = req.params.id;
    const {name,imageURL,link} = req.body
    const updatingAweta ={
        name:name,
        link:link,
        imageURL:imageURL, 
    }
    await AwetaModel.findByIdAndUpdate(id,updatingAweta)
    res.status(203).send(`${updatingAweta.name} updated succesfuly`)
})




const SeriSchema = new mongoose.Schema({
    name: String,
    link: String,
    imageURL: String
})

const SeriModel = new mongoose.model('Seri',SeriSchema)




 // GET ALL
app.get('/api/seri-makina',async(req,res)=>{
    const{name} = req.query;
        const seri = await SeriModel.find()
    if(!name){
        res.status(200).send(seri)
    }
    else{
        const searchedSeri = seri.filter((x)=>x.name.toLowerCase().trim().includes(name.toLowerCase().trim()))
        res.status(200).send(searchedSeri)
    }
});

// GET SERI BY ID
app.get('/api/seri-makina/:id', async(req,res)=>{
    const id = req.params.id
    const seri = await SeriModel.findById(id)
    res.status(200).send(seri)
})

// DELETE SERI MAKINA
app.delete('/api/seri-makina/:id', async(req,res)=>{
    const id = req.params.id
    // delete
    const deleteSeriMakina = await SeriModel.findByIdAndDelete(id)
    res.status(203).send(`${deleteSeriMakina.name} deleted succesfuly!`)
})

// POST SERI MAKINA
app.post('/api/seri-makina', async(req,res)=>{
const {name,imageURL,link} = req.body;
const newSeriMakina= new SeriModel ({
    name:name,
    imageURL:imageURL,
    link:link
})
await newSeriMakina.save()
if(!name){
    res.status(204).send('name is required')
}
if(!imageURL){
    res.status(204).send('imageURL is required')
}
res.status(201).send({
    message:`${newSeriMakina.name} posted succesfuly`
})

})

// EDIT SERI MAKINA
app.put('/api/seri-makina/:id', async(req,res)=>{
    const id = req.params.id;
    const {name,imageURL,link} = req.body
    const updatingSeriMakina ={
        name:name,
        link:link,
        imageURL:imageURL,
    }
        await SeriModel.findByIdAndUpdate(id,updatingSeriMakina)

    res.status(203).send(`${updatingSeriMakina.name} updated succesfuly`)
})



const TurvarSchema = new mongoose.Schema({
    name: String,
    link: String,
    imageURL: String
})

const TurvarModel = new mongoose.model('turvar',TurvarSchema)

// TUR-VAR MAKINA CRUD

// GET ALL
app.get('/api/turvar-makina', async(req,res)=>{
    const{name} = req.query;
    const turvar = await TurvarModel.find()
    if(!name){
        res.status(200).send(turvar)
    }
    else{
        const searchedTurvar = turvar.filter((x)=>x.name.toLowerCase().trim().includes(name.toLowerCase().trim()))
        res.status(200).send(searchedTurvar)
    }
});

// GET TURVAR BY ID
app.get('/api/turvar-makina/:id', async(req,res)=>{
    const id = req.params.id
    const turvar = await TurvarModel.findById(id)
    res.status(200).send(turvar)
})

// DELETE TURVAR BY ID
app.delete('/api/turvar-makina/:id', async(req,res)=>{
    const id =req.params.id;
    // delete
     const deleteTurVar =await TurvarModel.findByIdAndDelete(id)
     res.status(203).send({
        message:`${deleteTurVar.name} deleted succesfuly`
     }) 
}) 

// POST TURVAR
app.post('/api/turvar-makina', async(req,res)=>{
    const{name,imageURL,link} = req.body;
    const newTurVar = new TurvarModel ({
        name:name,
        imageURL:imageURL,
        link:link
    })
    await newTurVar.save()
    if(!name){
        res.status(204).send('name is required')
    }
    if(!imageURL){
        res.status(204).send('imageURL is required')
    }
    res.status(201).send({
        message:`${newTurVar.name} posted succesfuly`
    })
})

// EDIT TURVAR
app.put('/api/tuvar-makina/:id', async(req,res)=>{
    const id = req.params.id;
    const {name,imageURL,link} = req.body
    const updatingTurVar ={
        name:name,
        link:link,
        imageURL:imageURL,
    }
    await TurvarModel.findByIdAndUpdate(id,updatingTurVar)
        res.status(203).send(`${updatingTurVar.name} updated succesfuly`)
})





const IleriSchema = new mongoose.Schema({
    model: String,
    name: String,
    link: String,
    imageURL: String
})

const IleriModel = new mongoose.model('ileri',IleriSchema)


// ILERI MAKINA CRUD 

// GET ALL
app.get('/api/ileri-makina', async(req,res)=>{
    const{name} = req.query;
    const ileri = await IleriModel.find()
    if(!name){
        res.status(200).send(ileri)
    }
    else{
        const searchedIleri = ileri.filter((x)=>x.name.toLowerCase().trim().includes(name.toLowerCase().trim()))
        res.status(200).send(searchedIleri)
    }
});

// GET ILERI MAKINA BY ID
app.get('/api/ileri-makina/:id', async(req,res)=>{
    const id = req.params.id
    const ileri = await IleriModel.findById(id)
    res.status(200).send(ileri)
})

// DELETE ILERI MAKINA
app.delete('/api/ileri-makina/:id', async(req,res)=>{
    const id =req.params.id
    // delete
    const deleteIleriMakina = await IleriModel.findByIdAndDelete(id)
    res.status(203).send(`${deleteIleriMakina.name} deleted succesfuly`)
})

// POST ILERI MAKINA
app.post('/api/ileri-makina', async(req,res)=>{
    const {model,name,imageURL,link} = req.body;
    const newIleriMakina= new IleriModel({
        model:model,
        name:name,
        imageURL:imageURL,
        link:link
    })
    await newIleriMakina.save()
    if(!model){
        res.status(204).send('model is required')
    }
    if(!name){
        res.status(204).send('name is required')
    }
    if(!imageURL){
        res.status(204).send('imageURL is required')
    }
    if(!link){
        res.status(204).send('link is required')
    }
    res.status(201).send({

        message:`${newIleriMakina.name} posted succesfuly`
    })
})

// EDIT ILERI MAKINA
app.put('/api/ileri-makina/:id', async(req,res)=>{
const id = req.params.id
const {model,name,imageURL,link} =req.body
const updatingIleriMakina ={
    model:model,
    name:name,
    link:link,
    imageURL:imageURL, 
}
await IleriModel.findByIdAndUpdate(id,updatingIleriMakina)
res.status(203).send(`${updatingIleriMakina.name} updated succesfuly`)
})





const SoleySchema = new mongoose.Schema({
    name: String,
    link: String,
    imageURL: String
})

const SoleyModel = new mongoose.model('soley',SoleySchema)

// SOLEY MAKINA CRUD

// GET ALL
app.get('/api/soley-makina', async(req,res)=>{
    const{name} = req.query;
    const soley = await SoleyModel.find()
    if(!name){
        res.status(200).send(soley)
    }
    else{
        const searchedSoley = soley.filter((x)=>x.name.toLowerCase().trim().includes(name.toLowerCase().trim()))
        res.status(200).send(searchedSoley)
    }
});

// GET SOLEY BY ID
app.get('/api/soley-makina/:id', async(req,res)=>{
    const id = req.params.id
    const soley = await SoleyModel.findById(id)
    res.status(200).send(soley)

})

// DELETE SOLEY BY ID
app.delete('/api/soley-makina/:id', async(req,res)=>{
    const id = req.params.id
    // delete
    const deleteSoley = await SoleyModel.findByIdAndDelete(id)
    res.status(203).send({
        message:`${deleteSoley.name} deleted succesfuly`
    })
})

// POST SOLEY
app.post('/api/soley-makina', async(req,res)=>{
    const {name,imageURL,link}= req.body
    const newSoley = new SoleyModel({
        name:name,
        imageURL:imageURL,
        link:link
    })
    await newSoley.save()
    if(!name){
        res.status(204).send('name is required')
    }
    if(!imageURL){
        res.status(204).send('imageURL is required')
    }
    res.status(201).send({
        message:`${newSoley.name} posted succesfuly`
    })
})

// EDIT SOLEY
app.put('/api/soley-makina/:id', async(req,res)=>{
    const id = req.params.id
    const {name,imageURL,link}=req.body
    const updatingSoley = {
        name:name,
        link:link,
        imageURL:imageURL,
    }
    await SeriModel.findByIdAndUpdate(id,updatingSoley)
    res.status(203).send(`${updatingSoley.name} updated succesfuly`)
})




const OsmanSChema = new mongoose.Schema({
    title:String,
    name: String,
    link: String,
    imageURL: String
})

const OsmanModel = new mongoose.model('osman',OsmanSChema)




// OSMAN CUBUK CRUD


 // GET ALL
app.get('/api/osman-cubuk', async(req,res)=>{
    const{name} = req.query;
    const osman = await OsmanModel.find()
    if(!name){
        res.status(200).send(osman)
    }
    else{
        const searchedOsman = osman.filter((x)=>x.name.toLowerCase().trim().includes(name.toLowerCase().trim()))
        res.status(200).send(searchedOsman)
    }
});

// GET OSMAN CUBUK BY ID
app.get('/api/osman-cubuk/:id', async(req,res)=>{
    const id = req.params.id
    const osman = await OsmanModel.findById(id)
    res.status(200).send(osman)
})

// DELETE OSMAN CUBUK BY ID
app.delete('/api/osman-cubuk/:id', async(req,res)=>{
    const id = req.params.id
    // delete
     const deleteOsmanCubuk = await OsmanModel.findByIdAndDelete(id)
    res.status(203).send({
        message:`${deleteOsmanCubuk.name} deleted succesfuly`
    })
})

// POST OSMAN CUBUK
app.post('/api/osman-cubuk', async(req,res)=>{
    const {title,name,imageURL,link} = req.body
    const newOsmanCubuk = new OsmanModel ({
        title:title,
        name:name,
        imageURL:imageURL,
        link:link
    })
   await newOsmanCubuk.save()
    if(!title){
        res.status(204).send('title is required')
    }
    if(!name){
        res.status(204).send('name is required')
    }
    if(!imageURL){
        res.status(204).send('imageURL is required')
    }
    res.status(201).send({
        message:`${newOsmanCubuk.name} posted succesfuly`
    })
})

// EDIT OSMAN CUBUK
app.put('/api/osman-cubuk/:id', async(req,res)=>{
    const id = req.params.id
    const{title,name,imageURL,link} = req.body
    const updatingOsmanCubuk = {
        title:title,
        name:name,
        content:content,
        link:link,
        imageURL:imageURL,
    } 
    await OsmanModel.findByIdAndUpdate(id,updatingOsmanCubuk)
    res.status(203).send(`${updatingOsmanCubuk.name} updated succesfuly`)
})



const CeyliftSchema = new mongoose.Schema({
    title:String,
    name: String,
    link: String,
    imageURL: String
})

const CeyliftModel = new mongoose.model('ceylift',CeyliftSchema)

// CEYLIFT CRUD


  // GET ALL
app.get('/api/ceylift', async(req,res)=>{
    const{name} = req.query;
    const ceylift = await CeyliftModel.find()
    if(!name){
        res.status(200).send(ceylift)
    }
    else{
        const searchedCeylift= ceylift.filter((x)=>x.name.toLowerCase().trim().includes(name.toLowerCase().trim()))
        res.status(200).send(searchedCeylift)
    }
});

// GET CEYLIFT BY ID
app.get('/api/ceylift/:id', async(req,res)=>{
    const id = req.params.id
    const ceylift = await CeyliftModel.findById(id)
    res.status(200).send(ceylift)
})

// DELETE CEYLIFT
app.delete('/api/ceylift/:id', async(req,res)=>{
    const id = req.params.id
    // delete
    const deleteCeylift = await CeyliftModel.findByIdAndDelete(id)
   res.status(203).send(`${deleteCeylift.name} deleted succesfuly`)
})

// ADD CEYLIFT
app.post('/api/ceylift', async(req,res)=>{
    const {title,name,imageURL,link} = req.body
    const newCeylift = new CeyliftModel ({
        title:title,
        name:name,
        imageURL:imageURL,
        link:link
    })
    await newCeylift.save()
    if(!title){
        res.status(204).send('title is required')
    }
    if(!name){
        res.status(204).send('name is required')
    }
    if(!imageURL){
        res.status(204).send('imageURL is required')
    }

    res.status(201).send({
       message:`${newCeylift.name} posted succesfuly`
    })
})

// EDIT CEYLIFT
app.put('/api/ceylift/:id', async(req,res)=>{
    const id = req.params.id
    const {title,name,imageURL,link} = req.body
    const updatingCeylift = {
        title:title,
        name:name,
        link:link,
        imageURL:imageURL
    }
    await CeyliftModel.findByIdAndUpdate(id,updatingCeylift)
    res.status(203).send(`${updatingCeylift.name} updated succcesfuly`)

    
})



const KaradumanSchema = new mongoose.Schema({
    name: String,
    link: String,
    imageURL: String
})

const KaradumanModel = new mongoose.model('karaduman',KaradumanSchema)


// KARADUMAN KALIP CRUD

  // GET ALL
  app.get('/api/karaduman-kalip', async(req,res)=>{
    const{name} = req.query;
    const karaduman = await KaradumanModel.find()
    if(!name){
        res.status(200).send(karaduman)
    }
    else{
        const searchedKaraduman = karaduman.filter((x)=>x.name.toLowerCase().trim().includes(name.toLowerCase().trim()))
        res.status(200).send(searchedKaraduman)
    }
});

// GET KARADUMAN BY ID
app.get('/api/karaduman-kalip/:id', async(req,res)=>{
    const id = req.params.id;
    const karaduman = await KaradumanModel.findById(id)
    res.status(200).send(karaduman)
})

// DELETE KARADUMAN
app.delete('/api/karaduman-kalip/:id', async(req,res)=>{
    const id = req.params.id;
    const deleteKaraduman = await KaradumanModel.findByIdAndDelete(id)
    res.status(203).send(`${deleteKaraduman.name} deleted succesfuly`)
})

// POST KARADUMAN
app.post('/api/karaduman-kalip', async(req,res)=>{
    const {name, link, imageURL} = req.body
    const newKaraduman = new KaradumanModel({
        name:name,
        link:link,
        imageURL:imageURL
    })
    await newKaraduman.save()
    if(!name){
        res.status(204).send('name is required')
    }
    if(!imageURL){
        res.status(294).send('imageURL is required')
    }
    if(!link){
        res.status(204).send('link is required')
    }
    res.status(201).send({
        
        message: `${newKaraduman.name} posted succesfuly`
    })

})

// EDIT KARADUMAN
app.put('/api/karaduman-kalip', async(req,res)=>{
    const id = req.params.id
    const {name,imageURL,link} = req.body
     const updatingKaraduman = {
        name:name,
        link:link,
        imageURL:imageURL,
     }
     await AtlasModel.findByIdAndUpdate(id,updatingKaraduman)
    res.status(203).send(`${updatingKaraduman.name} updated succesfuly`)
})





const HaknersanSchema = new mongoose.Schema({
    name: String,
    link: String,
    imageURL: String
})

const HaknersanModel = new mongoose.model('haknersan',HaknersanSchema)


// HAKNERSAN CRUD 


// GET ALL
app.get('/api/haknersan', async(req,res)=>{
    const{name} = req.query;
    const haknersan = await HaknersanModel.find()
    if(!name){
        res.status(200).send(haknersan)
    }
    else{
        const searchedHaknersan = haknersan.filter((x)=>x.name.toLowerCase().trim().includes(name.toLowerCase().trim()))
        res.status(200).send(searchedHaknersan)
    }
});

// GET HAKNERSAN  BY ID
app.get('/api/haknersan/:id', async(req,res)=>{
    const id = req.params.id
    const haknersan = await HaknersanModel.findById(id)
    res.status(200).send(haknersan)
})

// DELETE HAKNERSAN
app.delete('/api/haknersan/:id', async(req,res)=>{
    const id = req.params.id
    // delete
    const deleteHaknersan = await HaknersanModel.findByIdAndDelete(id)
    res.status(203).send(`${deleteHaknersan.name} deleted succesfuly`)
})


// POST HAKNERSAN
app.post('/api/haknersan', async(req,res)=>{
    const {name,link,imageURL} = req.body
    const newHaknersan = new HaknersanModel({
        name:name,
        link:link,
        imageURL:imageURL
    })
    await newHaknersan.save()
    if(!name){
        res.status(204).send('name is required')
    }
    if(!imageURL){
        res.status(204).send('imageURL is required')
    }
    res.status(201).send({
        message:`${newHaknersan.name} posted succesfuly`
    })
})

// EDIT HAKNERSAN
app.put('/api/haknersan/:id', async(req,res)=>{
    const  id = req.params.id
    const {name,imageURL,link} = req.body
    const updatingHaknersan = {
        name:name,
        link:link,
        imageURL:imageURL, 
    }
    await HaknersanModel.findByIdAndUpdate(id,updatingHaknersan)
    res.status(203).send(`${updatingHaknersan.name} updated succesfuly`)
}) 




const UzaySchema = new mongoose.Schema({
    name: String,
    link: String,
    imageURL: String
})

const UzayModel = new mongoose.model('uzay',UzaySchema)


// UZAY BASKUL CRUD

// GET ALL
app.get('/api/uzay-baskul',async(req,res)=>{
    const{name} = req.query;
    const uzay =await UzayModel.find()
    if(!name){
        res.status(200).send(uzay)
    }
    else{
        const searchedUzay = uzay.filter((x)=>x.name.toLowerCase().trim().includes(name.toLowerCase().trim()))
        res.status(200).send(searchedUzay)
    }
});

// GET UZAY BASKUL BY ID
app.get('/api/uzay-baskul/:id',async(req,res)=>{
    const id = req.params.id
    res.status(200).send(UzayBaskul.find((x)=>x.id==id))
})

// DELETE UZAY BASKUL
app.delete('/api/uzay-baskul/:id',async(req,res)=>{
    const id = req.params.id
    const deleteUzayBaskul = UzayBaskul.find((x)=>x.id==id)
    const idx = UzayBaskul.indexOf(deleteUzayBaskul)
    UzayBaskul.splice(idx,1)
    res.status(203).send(`${deleteUzayBaskul.name} deleted succesfuly`)
})

// POST UZAY BASKUL
app.post('/api/uzay-baskul',async(req,res)=>{
    const {name,link,imageURL} = req.body
    const newUzayBaskul = new UzayModel ({
        name:name,
        link:link,
        imageURL:imageURL
    })
    await newUzayBaskul.save()
    if(!name){
        res.status(204).send('name is required')
    }
    if (!imageURL){
        res.status(204).send('imageURL is required')
    }
    res.status(201).send({
        message: `${newUzayBaskul.name} posted succesfuly`
    })
})

// EDIT UZAY BASKUL
app.put('/api/uzay-baskul/:id',async(req,res)=>{
    const id = req.params.id
    updatingUzayBaskul = UzayBaskul.find((x)=>x.id==id)
    const {name,imageURL,link} = req.body
    if(name){
        updatingUzayBaskul.name=name
    }
    if(imageURL){
        updatingUzayBaskul.imageURL=imageURL
    }
    if(link){
        updatingUzayBaskul.link=link
    }
    res.status(203).send(`${updatingUzayBaskul.name} updated succesfuly`)

})

const FiloSchema = new mongoose.Schema({
    name: String,
    link: String,
    imageURL: String
})

const FiloModel = new mongoose.model('filo',FiloSchema)


// FILO KOMPRESSOR

// GET ALL
app.get('/api/filo-kompressor',async(req,res)=>{
    const{name} = req.query;
    const filo = await FiloModel.find()
    if(!name){
        res.status(200).send(filo)
    }
    else{
        const searchedFilo = filo.filter((x)=>x.name.toLowerCase().trim().includes(name.toLowerCase().trim()))
        res.status(200).send(searchedFilo)
    }
});
 
// GET BY ID
app.get('/api/filo-kompressor/:id',async(req,res)=>{
    const id = req.params.id
    const filo = await FiloModel.findById(id)
    res.status(200).send(filo)
})


// DELETE FILO
app.delete('/api/filo-kompressor/:id',async(req,res)=>{
    const id = req.params.id
    const deleteFilo = FiloModel.findByIdAndDelete(id)
    res.status(203).send(`${deleteFilo.name} deleted succesfuly`)
})

// POST FILO
app.post('/api/filo-kompressor',async(req,res)=>{
    const {name,link,imageURL} = req.body
    const newFilo = new FiloModel ({
        name:name,
        link:link,
        imageURL:imageURL
    })
    await newFilo.save()
    if(!name){
        res.status(204).send('name is required')
    }
    if (!imageURL){
        res.status(204).send('imageURL is required')
    }
    res.status(201).send({
       message: `${newFilo.name}posted succesfuly`
    })
})

// EDIT FILO
app.put('/api/filo-kompressor/:id',async(req,res)=>{
    const id = req.params.id
    const {name,imageURL,link} = req.body
   const updatingFilo = {
        name:name,
        link:link,
        imageURL:imageURL,
    }
    await FiloModel.findByIdAndUpdate(id,updatingFilo)

    res.status(203).send(`${updatingFilo.name} updated succesfuly`)

})


const CetinelSchema = new mongoose.Schema({
    name: String,
    link: String,
    imageURL: String
})

const CetinelModel = new mongoose.model('cetinel',CetinelSchema)


// CETINEL ENDUSTRI CRUD


// GET ALL
app.get('/api/cetinel-endustri',async(req,res)=>{
    const{name} = req.query;
    const cetinel = await CetinelModel.find()
    if(!name){
        res.status(200).send(cetinel)
    }
    else{
        const searchedCetinel = cetinel.filter((x)=>x.name.toLowerCase().trim().includes(name.toLowerCase().trim()))
        res.status(200).send(searchedCetinel)
    }
});

// GET BY ID
app.get('/api/cetinel-endustri/:id',async(req,res)=>{
    const id = req.params.id
    const cetinel = await CetinelModel.findById(id)
    res.status(200).send(cetinel)
})

// DELETE CETINEL
app.delete('/api/cetinel-endustri/:id',async(req,res)=>{
    const id = req.params.id
    // delete
    const deleteCetinel = await CetinelModel.findByIdAndDelete(id)
    res.status(203).send(`${deleteCetinel.name} deleted succesfuly!`)

})

// POST CETINEL 
app.post('/api/cetinel-endustri',async(req,res)=>{
    const {name,imageURL,link} = req.body;
    const newCetinel = new CetinelModel ({
        name:name,
        imageURL:imageURL,
        link:link  
    })
   await newCetinel.save()
if(!name){
    res.status(204).send('name is required')
}
if(!imageURL){
    res.status(204).send('imageURL is required')
}
res.status(201).send({
    message:`${newCetinel.name} posted succesfuly`
})
})

// EDIT CETINEL
app.put('/api/cetinel-endustri/:id',async(req,res)=>{
    const id = req.params.id;
    const {name,imageURL,link} = req.body
    const updatingCetinel = {
        name:name,
        imageURL:imageURL,
        link:link
    }
    await CetinelModel.findByIdAndUpdate(id, updatingCetinel)
    res.status(203).send(`${updatingCetinel.name} updated succesfuly`)

})




const OtherSchema = new mongoose.Schema({
    model: String,
    name: String,
    link: String,
    imageURL: String
})

const OtherModel = new mongoose.model('other',OtherSchema)


// ELAVE MEHSULLAR

// GET ALL
app.get('/api/elave-mehsullar',async(req,res)=>{
    const{name} = req.query;
    const other = await OtherModel.find()
    if(!name){
        res.status(200).send(other)
    }
    else{
        const searchedOther = other.filter((x)=>x.name.toLowerCase().trim().includes(name.toLowerCase().trim()))
        res.status(200).send(searchedOther)
    }
});

// GET OTHER BY ID
app.get('/api/elave-mehsullar/:id',async(req,res)=>{
    const id = req.params.id
    const other = await OtherModel.findById(id)
    res.status(200).send(other)
})

// DELETE OTHER 
app.delete('/api/elave-mehsullar/:id',async(req,res)=>{
    const id = req.params.id
    // delete
    const deleteOther = await OtherModel.findByIdAndDelete(id)
    res.status(203).send(`${deleteOther.name} deleted succesfuly`)

})

// POST OTHER
app.post('/api/elave-mehsullar',async(req,res)=>{
    const {name,imageURL,link} = req.body;
    const newOther = new OtherModel ({
        name:name,
        imageURL:imageURL,
        link:link
    })
    await newOther.save()
    if(!name){
        res.status(204).send('name is required')
    }
    if(!imageURL){
        res.status(204).send('imageURL is required')
    }
    res.status(201).send({
        message:`${newOther.name} posted succesfuly`
    })
})

// EDIT OTHER
app.put('/api/elave-mehsullar/:id',async(req,res)=>{
    const id = req.params.id;
    const {name,imageURL,link} = req.body
    const updatingOther = {
        name:name,
        link:link,
        imageURL:imageURL, 
    }
    await OtherModel.findByIdAndUpdate(id,updatingOther)

    res.status(203).send(`${updatingOther.name} updated succesfuly`)
})



PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`app running on PORT:${PORT}`);
})


DB_PASSWORD =process.env.DB_PASSWORD
DB_CONNECTION = process.env.DB_CONNECTION
try {
    mongoose.connect(DB_CONNECTION.replace('<password>','DB_PASSWORD'))
.then(()=>{
    console.log('Mongo DB connected');
})
} catch (error) {
    console.log(error);
}