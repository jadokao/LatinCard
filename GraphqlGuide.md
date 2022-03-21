# Graphql API 使用指南
---
Graphql API的使用主要是透過兩種不同方法：Query跟Mutation，不同的方法對應到不同的資料庫操作行為。
Query跟Mutation就如同操作資料庫的CRUD，Query對應到的是Read，Mutation對應的是Create, Update和Delete。
如果要以網頁來查看Query或Mutation的結果，要先了解一件它的操作介面分成三個部分：
1. Operation：主要做Query或Mutation的地方。主要流程如下：
   1. 選擇要做Query還是Mutation
   2. 選擇要用哪一個方法，如：query-me或mutation-login
   3. 如果有需要自行決定要輸入什麼參數，就在方法的右邊輸入括弧```()```，並填入對應的參數名稱
   4. 選擇結果要呈現哪些變項，跟User有關的變項包含：id, name, account，跟單字卡有關的則是：ch(中文), en(英文), la(拉丁文), partOfSpeech(詞性)
2. Variables：如果在Operation有需要輸入參數的話，如：在搜尋特定單字卡時列出作為搜尋條件的變項、或在註冊時所填的帳號密碼等參數，以JSON的格式放到Variables的區域內。
   另外如果要模擬前端在向後端call API的時候有夾帶cookie或token，要放在Variables旁邊的Headers裡面；以本專案的JWT token為例，要在左邊空格放入"jwt-token"作為key，右邊空格放入在登入時拿到的JWT token作為value。
3. Response：之前做Query跟Mutation的結果會出現在這，預設是以JSON的格式來呈現。
### 想要先體驗一下嗎？
這裡提供兩種Query方法，可以了解看看是怎麼操作的
1. hello
   Operation
   ```
    query {
      hello
    }
   ```
   Response
   ```
   {
      "data": {
        "hello": "world"
      }
    }
    ```
2. books
    Operation
    ```
    query {
      books {
        card {
          la
        }
      }
    }
    ```
    Response
    ```
    {
      "data": {
        "books": [
          {
            "card": {
              "la": "amo"
            }
          },
          {
            "card": {
              "la": "puella"
            }
          },
          {
            "card": {
              "la": "est"
            }
          },
          {
            "card": {
              "la": "est"
            }
          }
        ]
      }
    }
    ```
### 搜尋 Query
1. 當前登入之User
    Operation
    ```
    query {
      me {
        id
        account
        name
      }
    }
    ```
2. 目前User所擁有之所有單字卡
    ```
    query {
      cards {
        ch
        en
        la
        partOfSpeech
      }
    }
    ```
3. 目前User所擁有之特定單字卡
   Operation
    ```
    query($cardId: Int, $ch: String, $en: String, $la: String) {
      card(id: $cardId, ch: $ch, en: $en, la: $la) {
        ch
        en
        la
        partOfSpeech
      }
    }
    ```
    Variables
    ```
    {
      "cardId": 1,
      "ch": null,
      "en": null,
      "la": null
    }
    ```
### 操作 Mutation
1. 註冊
   Operation
    ```
    mutation($name: String, $account: String, $password: String) {
      signUp(name: $name, account: $account, password: $password) {
        id
        name
        account
      }
    }
    ```  
    Variables
    ```
    { 
      "name": "example",
      "account": "example",
      "password": "example"
    }
    ```
2. 登入
   Operation
   ```
    mutation($account: String!, $password: String!) {
      login(account: $account, password: $password) {
        token
      }
    }
   ```
   Variables
   ```
   {  "account": "example",
      "password": "example"
    }
   ``` 
3. 創建屬於該User的單字卡
   Operation
   ```
   mutation($input: PostCardInput!) {
      postCard(input: $input) {
        ch
        en
        la
        partOfSpeech
      }
    }
    ```
    Variables
    ```
    {
      "input": {
        "ch" : "範例",
        "en" : "example",
        "la" : "exemplum",
        "partOfSpeech" : "noun"
      }
    }
    ```
4. 編輯單字卡
    Operation
    ```
        mutation($input: EditCardInput!) {
      editCard(input: $input) {
        ch
        en
        la
        partOfSpeech
      }
    }
    ```
    Variables
    ```
    {
      "input": {
        "id" : 6,
        "ch" : "範例2",
        "en" : "example2",
        "la" : "exemplum2",
        "partOfSpeech" : "noun"
      }
    }
    ```
5. 刪除單字卡
    Operation
    ```
    mutation($deleteCardId: Int!) {
      deleteCard(id: $deleteCardId) {
        ch
        en
        la
        partOfSpeech
      }
    }
    ```
    Variables
    ```
    {
      "deleteCardId": 6
    }
    ```
