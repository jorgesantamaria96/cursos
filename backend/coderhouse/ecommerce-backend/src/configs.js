import dotenv from "dotenv";
dotenv.config();

export default {
  fileSystem: {
    path: "./src/DB",
  },
  mongodb: {
    mongoDB_uri:
      "mongodb+srv://jorge:jorge1234@cluster0.ccfqs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    },
  },
  firebase: {
    type: "service_account",
    project_id: "ecommerce-backend-75f93",
    private_key_id: "55dba948076dd63b9b6b2ce970ec7a7bf398e558",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDV7YCPAl3xsDaM\nk8KvAoxGY8PQfz02o34GRYFLFlacZWu3j9/5GoB3YMVzj/tMhlybDWFIOdiIU4HD\n4JR44Nq2KWQL2YbntOELss+aS/tHZNlN67NV4i4M25YjxmoLsNrsojPbbgbLM51v\nNO74DFV/F6fXlV6A4o3NWLTI0rGnZGRlte6Nn/APsI0vih1yx+5c21RmeaPQw1DT\ncPB6n5HLuPwrGsGpgedx8gy/K9EO//2Nk0lzm+FsBlsAZDxFf0dzIAwyBNeM4i2U\nW5FZjJb9nP+0U2Ww/EWMu/S0N3PFuLYHh3WPmdfgXMSL7CZqYtGzjtVXplTBDWKQ\nCMU5JR0/AgMBAAECggEAX/umVUPmG6UI7Iz1ail1/7UOa/NS5zt2tWClEKgOpzA4\nIs2KW82Au08veFivE1grn6PitJHDrfLtw5F1fEDC0L2Edm6cgUSePm31iJCzxwYg\nG753ob6QE9PIKvgAp4srxsVGCBt3L9/SMM2qtJ9wEsxt0aPimWhM4Ef/ISWrcOMf\nhGd89EUFgxojTxhGNGbX/fmZ1NpgwlptNFDaSF1KGA+vwVZhlLKoP2QTk7alL0uZ\naCHs8KfAMo+qfBYulUXzKCPED9ctsfbEnV+P+V88mmlt7e8SerwiNriOu0zFu8vS\n2z6r+lax2oOgb4RQ1HpCw0m5SRR4N0qgs21WN4ZlVQKBgQD2UFTejcL3v5YURHLg\nOORYHr9BSF0Y+ou4rJYd6r1YKIaJGgDEkkw4CghJP1m6+Yt4Qg7B0ho6dn4tdfaQ\ndqZlGCyclePgiUbTLteoWO0TXlL5m6idbPpgUUtZR0aOG4E26+8XrRL2ULhsCr38\no4w6qftU7gTAZpIv30hrZ/iXtQKBgQDeVyL8CdK9/UR2fvkEe3V+gt/XxcXQpj6h\n/NRmnw20OudVm/1TCGGNNS3455d3+NBVgCS7Jhl2baXFCv/XcHNSvgBgO+A2bJGK\nZG8ltyDYH3GDDpKDv/tkc7tCKITzA+O/Ej+25GE5rtT5b8HTP4JRFCZgyguTBgLc\nlgydj5ORowKBgGciUbbyIq270apg0rzh9XKURT6ffyPDXJeR5DVYobl1Fof3lFS6\ncSGRydBprzej32sWNbmgMI1EKib82qW4mImB6sQR2t2cfURVu8TonzPZ7eJH8/0e\nsWN9BpC2UGuWRq9pcK44MNVkDSRoBw7up/u0SuFP3Dt3d0SGOHuIiEV1AoGBAJ+c\ngCHcz2vST/6c4hjkpBEg1J5qfLpvTZEuFjBhSA41JvLfG3krEBS1s332i1b1yGFI\nr5WmIStSRWlxnv5C3JbujQiIk0meoNBvjxbNIwfjcrJ5mJZ6EHcpWamBuwdVqH33\nFMQvqNgm+P7jyonjEqMvyuk6whpWe2FtWjsV4gLvAoGBAKST8hDIBfnyBN9d96TJ\n6ZC6LumQ/qNs8xKbMldA7BUfKrhXElXDLjEJTVeCNF8C3pLaC/xr4ehQBKYcs7Nu\nUusX8RFGNZug9cOAHVyz/VBCRVMuRIQQ3dz7F9eT3HSllb9bCFLXrFjdqA5hdYgZ\nPwN+U2TbcbNP0ol9nNBkURV/\n-----END PRIVATE KEY-----\n",
    client_email:
      "firebase-adminsdk-1559j@ecommerce-backend-75f93.iam.gserviceaccount.com",
    client_id: "112976531471230871640",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-1559j%40ecommerce-backend-75f93.iam.gserviceaccount.com",
  },
  mysql: {
    client: "mysql",
    connection: {
      host: "us-cdbr-east-05.cleardb.net",
      user: "bbefafc692e36e:2d3c8b9c",
      password: "2d3c8b9c",
      database: "heroku_76bb56a7a983405?reconnect=true",
    },
  },
};
