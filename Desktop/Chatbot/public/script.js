const chatMessageTemplate = (message, from) => `
  <div class="from-${from}">
    <div class="message-inner">
      <p>${message}</p>
    </div>
  </div>
  `;

const InsertTemplateInChat = (template) => {
  const div = document.createElement('div');
  div.innerHTML = template;

  const chat = document.getElementById('chat');
  chat.appendChild(div);
};

const getWatsonMessageAndInsertTemplate = async (message = '') => {
  const uri = `http://localhost:3000/conversation/${message}`;
  const response = await (await fetch(uri)).json();

  const template = chatMessageTemplate(response.output.text, 'watson');
  InsertTemplateInChat(template);
};

const textInput = document.getElementById('textInput');
textInput.addEventListener('keydown', (event) => {
  if (event.keyCode === 13 && textInput.value) {
    const template = chatMessageTemplate(textInput.value, 'user');
    InsertTemplateInChat(template);

    getWatsonMessageAndInsertTemplate(textInput.value);

    textInput.value = '';
  }
});

getWatsonMessageAndInsertTemplate();