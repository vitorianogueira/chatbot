
const AssistantV1 = require('watson-developer-cloud/assistant/v1');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(express.static('./public'));

const port = 3000;

const assistant = new AssistantV1({
  username: '8d569199-b4cd-433e-96fa-074460d5cf94', 
  password: 'Bghdoswua5QA', 
  url: 'https://gateway.watsonplatform.net/assistant/api/',
  version: '2018-02-16',
});

app.get('/conversation/:text*?', (req, res) => {
  const { text } = req.params;

  const params = {
    input: { text },
    workspace_id: '02b81444-361c-41b7-9a2b-8ef7aaa2a487',
  };

  assistant.message(params, (err, response) => {
    if (err) res.status(500).json(err);

    res.json(response);
  });
});
app.listen(port, () => console.log(`Running on port ${port}`));