## Nodenmailer - Envio de e-mails ##

O **Nodemailer** é um módulo para aplicações em Node.js, que permite o envio de e-mails. 

****

### Instalando ###

Para iniciar, basta instalar a sua dependência a partir do **npm**:  
```
npm install nodemailer
```

Ou utilizando o **yarn**:  
```
yarn add nodemailer
```

****

### Configurando ###

Para enviar e-mails, você precisa criar um objeto transportador:  
```
let transporter = nodemailer.createTransport(transport [, defaults])
```

Neste caso:  
* ***transporter***: variável que receberá o transportador
* ***transport***: objeto de configuração
* ***defaults***: define os valores padrões do e-mail

****

### Enviando e-mail ###

Depois de ter um objeto transportador, você pode enviar o e-mail:  
```
transporter.sendMail(data [, callback])
```

Onde:  
* ***data***: define o conteúdo do e-mail
* ***callback***: função opcional de retorno a ser executada quando a mensagem é entregue ou falha
   * ***err***: se o e-mail falhar
   * ***info***: o resultado de sucesso da mensagem enviada
     * ***info.messageID***: alguns transportadores retornam o ID
     * ***info.envelope***: o "envelope" da mensagem
     * ***info.accepted***: destinatários que foram aceitos pelo servidor (SMTP)
     * ***info.rejected***: destinatários que foram rejeitados pelo servidor (SMTP)
     * ***info.pending***: destinatários que foram temporariamente rejeitados junto com a resposta do servidor (SMTP)
     * ***response***: sequência retornada pelo SMTP e inclui a última resposta SMTP do servidor

> Se o e-mail incluir vários destinatários, será considerada entregue se pelo menos um destinatário for aceito.

****

### Configurando a mensagem ###

A seguir, os campos possíveis em uma mensagem de e-mail:  

#### Campos comuns ####

* ***from***: o e-mail do remetente.
* ***to***: o e-mail do destinatário. Se for para mais de um destinatário, separar os e-mails por vírgula ou colocá-los em um array.
* ***cc***: o e-mail que receberá em cópia. Pode ser um array de e-mails ou separados por vírgula.
* ***bcc***: cópia oculta. Separar por vírgula ou array.
* ***subject***: assunto do e-mail.
* ***text***: texto simples do e-mail, sem formatação.
* ***html***: texto em HTML.
* ***attachments***: um array com os anexos que serão enviados.

```
let message = { 
   from: "email@email.com"
   to: "email@email.com",
   subject: "Title",
   text: "Plain text",
   html: "<p>Plain text</p>"
}
```

#### Campos avançados ####

##### Opções de roteamento #####

* ***remetent***: endereço do remetente.
* ***replyTo***: endereço de resposta.
* ***inReplyTo***: o ID da mensagem que essa mensagem está respondendo.
* ***references***: um array com os IDs de mensagem
* ***envelope***: envelope STMP opcional, se o envelope gerado automaticamente não for adequado.

##### Opções de conteúdo #####

* ***attachDataURLs***: se true, então converterá data: imagens em HTML em anexos incorporados.
* ***watchHtml***: versão HTML específica para Apple Watch. Os smartwatches mais recentes não têm problemas em rederizar conteúdo de text/html, portanto o watchHtml provavelmente nunca é visto pelo destinatário.
* ***amp***: versão HTML específica para AMP4EMAIL, o mesmo uso que **text** e **html**.
* ***icalEvent***: evento do iCalendar como alternativa.
* ***alternatives***: array com um conteúdo de texto além do text/html.
* ***encoding***: identifica a codificação para text/html.
* ***raw***: mensagem MIME existente a ser usada em vez de gerar um nova.
* ***textEncoding***: força a codificação de transferência de conteúdo para texto. Por padrão, a melhor opção é detectada

##### Opções de cabeçalho #####

* ***priority***: define a importância da mensagem (alto, normal ou baixo).
* ***headers***: objeto ou array de campos adicionais para autenticação.
* ***messageId***: valor opcional do ID da mensagem, se vazio, um valor aleatório será gerado.
* ***date***: valor opcional da data, a string UTC será usada caso esteja vazio.
* ***list*** auxiliar para definir List-* headers.

##### Oções de segurança ##### 

* ***disableFileAccess***: se true, não permite usar arquivos como conteúdo. Use-o quando preferir colocar dados em JSON de origem não confiável.
* ***disableUrlAccess***: se true, não permite usar URLs como conteúdo.

****

### SMTP Transporte ###

O SMTP é o principal transporte no Nodemailer para entrega de mensagens. Também é o protocolo usado entre diferentes hosts de e-mail. Quase todos os provedores oferecem suporte ao envio baseado em SMTP, mesmo que enviem principalmente por API.

```
let transporter = nodemailer.createTransport(options [, defaults])
```

Onde:

* **options**: um objeto que define os dados conexão
* **defaults**: um objeto será mesclado em todos os objetos da mensagem.

Como alternativa, você pode usar um URL de conexão em vez de um objeto para as opções. Use o protocolo *smtp* ou *smtps*.

```
let configUrl = "smtps://user:pass@smtp.example.com/?pool=true"
```

##### Opções gerais #####

* ***port***: porta para se conetar (o padrão é 587 se *secure* for falso, ou 465 se for verdadeiro).
* ***host***: nome do host ou endereço IP ao qual se conectar.
* ***auth***: define dados de autentcação.
* ***authMethod***: define o método de autenticação preferido.

##### Opções TLS #####

* ***secure***: se true, a conexão usará TLS ao conectar-se ao servidor. Se false, o TLS será usado se o servidor suportar a extensão STARTTLS. Na maioria dos casos, configure esse valor como true se estiver conectado à porta 465.
* ***tls***: define um TLSSocker adicional a ser passado para o construtor.
* ***tls.servername***: nome do host opcional para validação do TLS se host foi definido como um endereço IP.
* ***requireTLS***: se é true ou false, o Nodemailer tenta usar o STARTTLS, mesmo que o servidor não anuncie o suporte. Se a conexção não puder ser criptografada, a mensagem não será enviada.

##### Opções de conexão #####

* ***name***: nome do host opcional do cliente, usado para identificar o servidor, o padrão é o nome do host da máquina.
* ***localAddress***: interface local à qual se vincular para conexões de rede.
* ***connectionTimeout***: quantos milissegundos esperar para estabeler conexão.
* ***greetingTimeout***: quantos milissegundos esperar pela saudação após o estabelecimento da conexão.
* ***socketTimeout***: quanto milissegundos de inatividade são permitidos.

##### Opções de depuração #####

* ***logger***: intância opcional do criador logs compatível.
* ***debug***: se true, registra o tráfego, caso contrário, registra apenas eventos de transação.

##### Opções de segurança #####

* ***disabledFileAccess***: se true, não permite usar arquivos como conteúdo.
* ***disabledUrlAccess***: se true, não permite usar URLs como conteúdo.

##### Opções de proxy #####

* ***proxy***: todos os transportes baseados em SMTP permitem usar proxies para fazer conexões TCP com servidores.

#### Exemplos ####

1. **Conexão única**  
   Este exemplo se conectaria ao servidor separadamente para cada mensagem
```
nodemailer.createTransport({
   host: "smtp.example.com",
   port: 587,
   secure: false,
   auth: {
      user: "user",
      pass: "pass"
   }
})
```

2. **Conexão em pool**  
   Este exemplo configura conexões em pool contra um servidor SMTP na porta 465
```
nodemailer.createTransport({
   pool: true,
   host: "smtp.example.com",
   port: 465,
   secure: true,
   auth: {
      user: "user",
      pass: "pass"
   }
})
```

3. **Permitir certificados autoassinados**
   Essa configuração abriria uma conexão com o servidor TLS com certificado TLS autoassinado ou inválido
```
nodemailer.createTransport({
   host: "my.smtp.host",
   port: 465,
   secure: true,
   auth: {
      user: "user",
      pass: "123456"
   },
   tls: {
      rejectUnauthorized: false
   }
})
```

#### Autenticação ####

Se os dados de autenticação não estiverem presentes, a conexão será considerada autenticada desde o início. Caso contrário, você precisará fornecer o objeto de opções de autenticação.  
* **auth**: objeto de autenticação.
  * **type**: indica o tipo de autenticação, o padrão é *login*, outra opção é *oauth2*.
  * **user**: nome do usuário.
  * **pass**: senha do usuário se o login normal for usado

#### Verificar conexão ####

Você pode verificar sua configuração SMTP com a **chamada de verificação (callback)** (também funciona como promise).
```
transporter.verify((error, success) => {
   if (error) {
      console.log(error)
   } else {
      console.log("O servidor está pronto para aceitar mensagens")
   }
})
```

Esteja cliente de que esta chamada apenas testa a conexão e sua autenticação, mas não verifica se o serviço permite que você use um endereço de remetente específico.

****

### Envelope SMTP ###

O envelope SMTP geralmente é gerado automaticamente dos campos **from, to, cc** e **bcc** no objeto, mas se por algum motivo você desejar especificá-lo, pode fazê-lo com a propriedade **envelop** no objeto da mensagem.

* **envelope**: objeto com os seguintes parâmetros de endereço que se comportam exatamente como nas opções de e-mails comuns.
  * **from**: remetente
  * **to**: destinatário(s)
  * **cc**: com cópia
  * **bcc**: com cópia oculta

```
let message = {
   ...,
   from: "mail@example.com",
   to: "john@example.com",
   envelope: {
      from: "John <john@example.com>",
      to: "mail@example.com, Mail <mail@example.com>"
   }
}
```

****

### Enviar e-mail ###

O transporte de envio canaliza a mensagem RFC822 gerada para a entrada do comando **sendmail**; portanto, é a mesma que a função **mail()** do PHP.  
Para enviar, defina o **sendmail** nas opções de transporte do Nodemailer como true.  
As opções adicionais a serem usadas com este transporte são as seguintes:  

* **path**: caminho para o comando **sendmail**
* **newline**: *Windows* ou *Unix* por padrão. Força todas as novas linhas na saída a usar a sintaxe do Windows <CR><LF> ou a sintaxe Unix <LF>
* **args**: array opcional de opções de linha de comando a serem passadas para o comando **sendmail**.

#### Exemplos ####

1. **Envie uma mensagem usando binário específico**
   Este exemplo canaliza a mensagem para um comando customiado usando novas linhas no estilo Unix. O Sendmail não produx nenhuma saída além do código; portanto, não há mais nada para retornar com o callback.
```
let transporter = nodemailer.createTransport({
   sendmail: true,
   newline: "unix",
   path: "/usr/sbin/sendmail"
})
transporter.sendMail({
   from: "john@example.com",
   to: "jane@example.com",
   subject: "Title",
   text: "Um e-mail de teste"
}, (err, info) => {
   console.log(info.envelope)
   console.log(info.messageId)
})
```