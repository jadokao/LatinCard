# Latin Card API Server
---
這是一個以Graphql為基礎的API Server。
讓使用者可以將中文 - 英文 - 拉丁文，三種語言的單字組合成一張單字卡，集合成一個單字卡收集冊，讓使用者能夠做為未來複習之用。
串接API的使用者，在串接API的過程中，可以從既定的資料格式，自行選擇要得到哪些資料表裡面的哪些屬性，不會每一次呼叫API都接收到許多不需要的屬性。

---
## 主要功能
1. 註冊
2. 登入
3. 搜尋卡片
4. 創建卡片
5. 編輯卡片
6. 刪除卡片

---
## 不知道要怎麼用Graphql的API嗎？
請看這邊：[Grahql API 使用指南](https://github.com/jadokao/LatinCard/blob/master/GraphqlGuide.md) 

---
## Grahql Schema
#### 使用者 User
1. id - 使用者ID
2. name - 使用者姓名
3. account - 使用者帳號
4. password - 使用者密碼
#### 單字卡 Card
1. id - 單字卡ID
2. ch - 中文單字
3. en - 英文單字
4. la - 拉丁文單字
5. partOfSpeech - 單字的詞性
   
---
## 使用技術
1. Node.js：讓JavaScript在伺服器端運行的執行環境
2. Graphql：為API設計的資料查詢(修改)的語言
3. MySQL：用來儲存資料的關聯式資料庫
4. Redis：記憶體內鍵值資料存放區
5. Docker：以應用程式為中心的虛擬化容器
6. Nginx：非同步框架的 web server

---
## 使用方法
1. 下載repository
   ```bash
   git clone https://github.com/jadokao/LatinCard.git
   ```
2. 進入資料夾
   ```bash
   cd LatinCard
   ```
3. 進行套件下載
   ```bash
   npm install
   ```
4. 建立檔案：.env，並參考檔案：.env.example，放入環境變數
5. 至資料夾config裡的config.json，修改環境development內的username與password和本機的SQL資訊相符
6. 到MySQL，輸入指令來建立database
   ```SQL
   create database ac_twitter_workspace;
   ```
7. 建立Model的Table至database
   ```bash
   npx sequelize db:migrate
   ```
8. 載入種子檔
   ```bash
   npx sequelize db:seed:all
9.  輸入指令，運行server
    ```bash
    npm run dev
    ```
PS: 如果是要在本機執行，跟Redis相關的環境變數不用設定

---
## 測試用帳號
account：user1
password：12345678

---
## 資料夾結構
```bash
|-- bin
|  |-- www  # 本專案的main file
|-- config
|  |-- config.json  # MySQL相關設定
|  |-- passport.js  # table User和 table Card的關聯設定
|-- controllers
|  |-- cardControllers  # 單字卡相關 controller
|  |-- userControllers  # 使用者相關 controller
|-- nginx
|  |-- default.conf  # nginx相關設定
|-- schema  # Graphql相關設定
|  |-- card.js
|  |-- index.js
|  |-- user.js
|-- docker-compose.yml  # docker的container相關設定
|-- Dockerfile  # docker的image相關設定
|-- redis.js  # redis相關設定
```
## 相關連結
Docker hub：https://hub.docker.com/repository/docker/jadokao/sideproject