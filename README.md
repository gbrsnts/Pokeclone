# Pokeclone

Esta aplicação é desenvolvida em **Node.js** e **React** e possu integração com banco de dados **MySQL**, e é um projeto de ADS.

## **Instruções de configuração**

### **1. Instale o MySQL Server**
1. Caso não tenha o MySQL Server instalado em sua máquina, use o comando abaixo para instalar no **Linux**:
    ```
    sudo apt install mysql-server

### **2. Configure o MySQL**
1. Acesse o MySQL com o comando:
    ```
    sudo mysql

2. Defina uma senha para o usuário `root` com o comando abaixo (substitua `sua_nova_senha` pela senha que deseja usar):
    ```
    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'sua_nova_senha';

3. Atualize as permissões para garantir que as alterações sejam aplicadas:
    ```
    FLUSH PRIVILEGES;

4. Saia do MySQL:
    ```
    exit


### **3. Clone o repositório**
1. Caso não tenha o git instalado, use o comando abaixo:
    ```
    apt install git

2. Faça o clone do repositório com o comando:
    ```
    git clone https://github.com/gbrsnts/Pokeclone.git

### **4. Configure o Banco de Dados**
1. Crie o database e as tabelas do banco usando o arquivo SQL do repositório:
    ```
    mysql -u root -p < Pokeclone/poke_base/criar_tabelas.sql

Digite a senha do usuário `root`quando for solicitado

2. Acesse o MySQL novamente para configurar o usuário da aplicação:
    ```
    mysql -u root -p

3. Crie o usuário `app_pokeclone` para a aplicação (substitua `sua_senha` pela senha que deseja usar):
    ```
    CREATE USER 'app_pokeclone'@'%' IDENTIFIED BY 'sua_senha';

4. Conceda permissão do banco de dados ao usuário criado:
    ```
    GRANT SELECT, INSERT ON Pokeclone.* TO 'app_pokeclone'@'%';
5. Atualize as permissões para garantir que as alterações sejam aplicadas:
    ```
    FLUSH PRIVILEGES;

6. Saia do MySQL:
    ```
    exit

### **5. Configure o arquivo de conexão**
1. Renomeie o arquivo `Pokeclone/poke_front/.env.exemplo` para `.env`

2. Renomeie o arquivo `Pokeclone/poke_back/config/db.js.exemplo` para `db.js`

4. Edite o conteúdo do arquivo `db.js` para adicionar a senha configurada no usuário `app_pokeclone`

### **6. Inicie a aplicação**
Com o Node já instalado siga os próximos passos:

1. Instale as dependências do back-end
    1. Navegue até a pasta **poke_back**
    2. Execute o comando `npm i`
    3. Inicie o **back-end** com o comando:
        ```
        node server.js

2. Instale as dependências do front-end
    1. Navegue até a pasta **poke_front**
    2. Execute o comando `npm i`
    3. Inicie o **front-end** com o comando:
        ```
        npm run dev