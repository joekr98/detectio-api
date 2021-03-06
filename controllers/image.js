const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'a5151385aff34e7f8d7690012bff8d82'
});


const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.DEMOGRAPHICS_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('Unable to reach API'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => res.json(entries[0]))
        .catch(err => res.status(400).json('Unable to get entries'));
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}