# Portfólio — Henry Gabriel

Projeto de portfólio web desenvolvido do zero com **HTML5, CSS3, JavaScript e Bootstrap 5**, conforme a atividade da Canes Solution. O layout foi pensado em abordagem mobile-first e utiliza Flexbox/Grid e componentes responsivos do Bootstrap.

## 1. Como executar

1. Extraia o arquivo ZIP.
2. Abra a pasta `henry-portfolio`.
3. Abra `index.html` no navegador. Para uma experiência melhor, use a extensão **Live Server** do VS Code.
4. É necessário estar conectado à internet para carregar Bootstrap, ícones/fontes externos se adicionados e a biblioteca EmailJS por CDN.

Não é necessário instalar dependências com npm.

## 2. Imagens utilizadas

As imagens finais já estão incluídas na pasta `images/` e os caminhos estão configurados no `index.html`:

- `images/henry-perfil.jpg` — foto de perfil.
- `images/gamestore-print.png` — captura de tela do GameStore.
- `images/woomind-print.png` — captura de tela do WooMind.

Para trocar alguma imagem no futuro, substitua o arquivo correspondente ou atualize o caminho no atributo `src` da tag `<img>` no `index.html`.

## 3. Projetos apresentados

### GameStore
Projeto de loja digital de jogos com catálogo, busca/filtros, autenticação, carrinho, checkout, histórico de pedidos e administração. Repositório: https://github.com/hgsoliveira27-hash/gamestore/tree/main

### WooMind
Projeto acadêmico desenvolvido em equipe. A apresentação descreve uma proposta de aplicativo de acolhimento psicológico, acessibilidade e IA ética, com diário de bordo, recursos de voz e alto contraste, apoio ao autoconhecimento e conexão com profissionais. O material deixa claro que a IA é apoio e não substitui o psicólogo. Não foi informado repositório GitHub; por isso o projeto está apresentado como trabalho acadêmico em equipe, sem link inventado.

## 4. Formulário e armazenamento local

As mensagens do formulário são armazenadas no `localStorage` do navegador, na chave `henryPortfolioMessages`, em formato JSON. Ao primeiro acesso, se a chave ainda não existir, o sistema cria automaticamente **20 registros demonstrativos**.

O formulário salva a mensagem localmente mesmo se o serviço de e-mail ainda não estiver configurado.

## 5. Painel administrativo oculto (CRUD)

1. Abra o portfólio no navegador.
2. Pressione **Ctrl + Shift + A**.
3. Digite a senha de demonstração: `henry-admin`.
4. O painel permite listar, editar e excluir mensagens. Também há uma opção para recriar os 20 registros de teste.

O painel usa LocalStorage para as operações de Criar, Ler, Atualizar e Deletar (CRUD). Novas mensagens são criadas pelo formulário público.

**Atenção:** a senha está no JavaScript do navegador e serve somente para demonstração escolar. Não é uma autenticação segura para um sistema real.

## 6. Ativar notificação real por e-mail com EmailJS

O código já está preparado para enviar as mensagens do formulário para **hgsoliveira27@gmail.com**. O endereço de destino já está definido em `js/app.js`, na constante `NOTIFICATION_EMAIL`.

**Importante:** informar o e-mail no código não ativa sozinho o serviço. Para o envio funcionar, é necessário criar/usar uma conta no EmailJS e preencher os três identificadores fornecidos pela plataforma.

1. Entre em `https://www.emailjs.com/` e crie uma conta.
2. Na área **Email Services**, conecte o serviço de e-mail que será usado para enviar as notificações.
3. Em **Email Templates**, crie um modelo com estes campos/variáveis:
   - **To Email:** `{{to_email}}`
   - **Reply To:** `{{reply_to}}`
   - **From Name:** `{{from_name}}`
   - **Message:** `{{message}}`
4. Copie do painel do EmailJS a **Public Key**, o **Service ID** e o **Template ID**.
5. Abra `js/app.js` e substitua somente os três valores de demonstração no início do arquivo:

```js
const EMAILJS_PUBLIC_KEY = "SUA_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "SEU_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "SEU_TEMPLATE_ID";
```

6. Salve, abra o site com Live Server e envie uma mensagem de teste. Confira se ela aparece no painel administrativo e se chegou em `hgsoliveira27@gmail.com`.

O formulário salva a mensagem no LocalStorage mesmo se o EmailJS ainda não estiver configurado ou se o envio falhar. A chave pública é própria para uso no navegador; nunca coloque senha da caixa de e-mail ou chave privada no JavaScript.

## 7. Estrutura de pastas

```text
henry-portfolio/
├── index.html
├── README.md
├── .gitignore
├── css/
│   └── style.css
├── js/
│   └── app.js
└── images/
    ├── foto-perfil.svg
    ├── gamestore.svg
    └── woomind.svg
```

## 8. Tecnologias

- HTML5: estrutura semântica das seções.
- CSS3: identidade visual, responsividade, Flexbox e Grid.
- JavaScript: formulário, LocalStorage, JSON e painel CRUD.
- Bootstrap 5: grid responsivo, navegação e componentes.
- EmailJS: serviço externo de notificação por e-mail (requer configuração).

## 9. Antes de entregar

- [x] Adicionar a foto de perfil e as capturas de tela do GameStore e WooMind.
- [ ] Criar o serviço e o template no EmailJS e preencher Public Key, Service ID e Template ID.
- [ ] Testar o formulário, conferir o registro no painel administrativo e validar o envio de e-mail.
- [ ] Testar a navegação em celular e computador.
- [ ] Se desejar, alterar a senha demonstrativa em `js/app.js`.
