[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/uelKf0-p)
[![EN](https://img.shields.io/badge/lang-EN-orange.svg)](https://github.com/Iskenderun-Technical-University/mustafazeydani-VDGP/blob/main/README-EN.md)
# TaskMate
TaskMate, bireysel projeleri yönetmek için React.js, Node.js ve Express.js ile oluşturulmuş bir web uygulamasıdır.

TaskMate, bireysel projeleri ve görevleri verimli bir şekilde yönetme görevini basitleştirmek için tasarlanmıştır. Uygulama, projeleri, görevleri ve notları oluşturmak, güncellemek ve silmek için kullanıcı dostu bir arayüz sağlar. Ayrıca kullanıcıların bunları çeşitli kriterlere göre filtrelemesine ve sıralamasına olanak tanır. TaskMate'in nihai amacı, bireylerin düzenli ve üretken kalmalarına yardımcı olarak proje yönetimi hedeflerine ulaşmalarını kolaylaştırmaktır.

## Veritabanı Şeması
![scheme](./assets/diagrams/scheme.png)

## Veritabanı Yapılandırması
Bu uygulama, MySQL veritabanı ve veritabanı yapılandırma bilgilerini saklamak ve güvenliği sağlamak için bir .env dosyası kullanmaktadır. Uygulamayı çalıştırmadan önce, kendi veritabanınızı konfigüre ettiğinizden emin olmak için aşağıdaki adımları izleyin:

1- Bir veritabanınızın kurulu ve çalışır durumda olduğundan ve tablo oluşturmak ve değiştirmek için gerekli izinlere sahip olduğunuzdan emin olun.

2- **server** dizinine gezin `cd server`. İki dosya bulacaksınız, **createTables.sql** ve **.env-template**. 

2- Veritabanınızdaki tabloları oluşturmak için **createTables.sql** dosyasını kullanın.

3- **.env-template** dosyasının adını **.env** olarak değiştirin ve MySQL veritabanı yapılandırma bilgilerinizi güncelleyin.

Aşağıda **.env** dosyasının bir örneği verilmiştir:

```bash
host=localhost
user=root
password=password
database=my_database
port=3306
```

## Gereksinimler
Uygulamayı çalıştırmadan önce, sistemde Node.js ve npm'in kurulu olması gerekir. Node.js'in en son sürümünü [**resmi web sitesi**](https://nodejs.org/)nden indirebilirsiniz.

## Kurulum
Uygulamayı yüklemek için şu adımları izleyin:

1- Depoyu klonlayın: 

```bash
git clone https://github.com/Iskenderun-Technical-University/mustafazeydani-VDGP.git
```

2- Bağımlılıkları yükleyin:

```bash
cd mustafazeydani-VDGP/client
npm install
cd ../server
npm install
```

## Kullanım
Uygulamayı çalıştırmak için şu adımları izleyin:

1- Sunucuyu başlatın:

```bash
cd server
npm start
```

Bu, sunucuyu **http[]()://localhost:8800** adresinde başlatacaktır.

2- İstemciyi başlatın:

```bash
cd client
npm start
```

Bu, istemciyi **http[]()://localhost:3000** adresinde başlatacaktır.

3- Uygulamaya erişmek için web tarayıcınızda **http[]()://localhost:3000** adresini açın.

## Geri bildirim

Herhangi bir geri bildiriminiz varsa, lütfen bana mustafamari20@gmail.com adresinden ulaşın.