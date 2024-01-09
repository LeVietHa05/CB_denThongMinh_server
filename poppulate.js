require('dotenv').config()
const mongoose = require("mongoose");
const accountModel = require("./model/account");

const mongouri = process.env.MONGO_URI;
const mongo_username = process.env.MONGO_USERNAME || "";
const mongo_password = process.env.MONGO_PASSWORD || "";

mongoose.connect(mongouri, {
    useNewUrlParser: true,
    user: mongo_username,
    pass: mongo_password,
})
    .then(() => {
        console.log("[MONGODB] connected");
    })
    .catch((err) => {
        console.log(err);
        console.log("[MONGODB] connect failed");
    })


const names = ["Kiet", "Huy", "Hieu", "Hai", "Hoa", "Huong"];
const phone = ["1289461892", "0123122455", "08697435543", "0917245238", "0645378382", "01278451872"];
const email = ["abc@gmail.com", "cvbsdd@gmail.com", "ajskghug3@gmail.com", "aljksgbfaw@gmail.com", "1123bjk@gmail.com", "klgasdlfkio3@gmail.com"];
const address = ["HCM", "HN", "DN", "NT", "BD", "Hue"];
let lat = []
let long = []

function randomLAT() {
    let output = []
    for (let i = 0; i < 6; i++) {
        let lat = 21 + Math.random();
        lat = lat.toFixed(6);
        output.push(lat);
    }
    return output;
}

function randomLONG() {
    let output = []
    for (let i = 0; i < 6; i++) {
        let long = 105 + Math.random();
        long = long.toFixed(6);
        output.push(long);
    }
    return output;
}

lat = randomLAT();
long = randomLONG();

let randomAdress = [];
for (let i = 0; i < 6; i++) {
    let ran = Math.floor(Math.random() * 1000);
    randomAdress.push(`${ran} - ${address[Math.floor(Math.random() * 6)]}`);
}


let accs = [];
for (let i = 2; i < 12; i++) {


    let acc = {
        username: `user${i}`,
        password: `user${i}`,
        deviceID: `${i}`,
        isAdmin: false,
        location: {
            lat: lat[Math.floor(Math.random() * 6)],
            long: long[Math.floor(Math.random() * 6)],
            address: randomAdress[Math.floor(Math.random() * 6)],
        },
        information: {
            name: names[Math.floor(Math.random() * 6)],
            phone: phone[Math.floor(Math.random() * 6)],
            email: email[Math.floor(Math.random() * 6)],
            address: address[Math.floor(Math.random() * 6)],
        },
        noti: [],
    }
    accs.push(acc);
}

accountModel.insertMany(accs)
    .then(() => {
        console.log("insert success");
    })
    .catch((err) => {
        console.log(err);
    })

