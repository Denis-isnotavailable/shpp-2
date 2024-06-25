import fetch from 'node-fetch';

// const API_URL = "https://api.ipify.org?format=json";

//Використати node-fetch, щоб зробити запит await fetch("https://api.ipify.org?format=json"), отримати відповідь та вивести на екран свій айпі
// (async function loggingIP() {
//     try {
//         const res = await fetch(API_URL)
//         const ip = await res.json();
//         console.log('IP: ', ip);
//     } catch (error) {
//         console.error(error);
//     }
    
// }());

// //Напишіть функцію за мотивами п.1., яка повертає ваш айпі.

// (async function returnIP() {
//     try {
//         const res = await fetch(API_URL)
//         const ip = await res.json();
//         return ip;
//     } catch (error) {
//         console.error(error);
//     }
    
// }());

// Напишіть функцію, яка повертає три імені, зробивши паралельно три запити на https://random-data-api.com/api/name/random_name

// const NAME_URL = 'https://random-data-api.com/api/name/random_name';

// type IName = {
//     name: string
// }

// const getName = async (): Promise<IName | undefined> => {
//     try {
//         const res = await fetch(NAME_URL)
//         const data = await res.json() as Promise<IName | undefined>;
//         return data;
//     } catch (error) {
//         throw new Error('Network response was not ok');
//     }
// }

// Promise.all([getName(), getName(), getName()])
//     .then(users => users.forEach(user => console.log(user?.name)))
//     .catch(() => {throw new Error('Network response was not ok')});

// for (let i = 0; i < 3; i++) {
//     (async () => {
//         await getName().then(user => console.log(user?.name));
//     })();
// }

// const fetchData = (): Promise<IName> => {
//     return new Promise((resolve, reject) => {
//         fetch(NAME_URL)
//             .then(res => {
//                 if (!res.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return res.json();
//             })
//             .then(data => resolve(data as IName))
//             .catch(error => reject(error));
//     });
// };


// for (let i = 0; i < 3; i++) {
//     fetchData()
//         .then(data => console.log(data?.name))
//         .catch(() => {throw new Error('Network response was not ok')});
// }

// Напишіть функцію, яка повинна за мінімальну кількість запитів отримати користувача жінку: https://random-data-api.com/api/users/random_user

// const W_URL = 'https://random-data-api.com/api/users/random_user';

// type IWoman = {
//     first_name: string,
//     last_name: string,
//     gender: string,
// }

// const fetchData = (): Promise<IWoman> => {
//     return new Promise((resolve, reject) => {
//         fetch(W_URL)
//             .then(res => {
//                 if (!res.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return res.json();
//             })
//             .then(data => resolve(data as IWoman))
//             .catch(error => reject(error));
//     });
// };

// const fetchDataAsync = async (): Promise<IWoman> => {
//     try {
//         const res = await fetch(W_URL)
//         const data = await res.json() as IWoman;
//         return data;
//     } catch (error) {
//         throw new Error('Network response was not ok');
//     }
// }

// let count = 0;
// let countW = 0;

// // use setTimeout to avoid errors because of too many responces
// (function startSearch() {
//     setTimeout(() => {
//         // uncomment neccessary way to fetch data
//         fetchDataAsync()
//         // fetchData()
//             .then(data => {
//                 count++;
//                 console.log(`${count} - ${data.gender}`);
//                 if (data.gender === "Female") {
//                     countW++;
//                     console.log(`${data.first_name} ${data.last_name} - ${countW}`)
//                 }
//                 if (countW > 2) {
//                     return;
//                 }
//                 startSearch();
//             })
//     }, 2000);
// }());


// Є функція №1, яка приймає коллбек, який буде викликаний з параметром == ваш поточний айпі. Створіть функцію №2,
// яку можна евейтити, яка буде користуватися функцією №1

// const MY_IP = "00.000.00.000";

// async function callbackFunc(IP: string) {
//     console.log('callbackFunc');
//     return IP;
// }

// async function func1(IP: string, callbackFunc: (IP: string) => Promise<string>) {
//     console.log('func1');
//     return await callbackFunc(IP);
// }

// async function func2() {
//     console.log('func2');
//     return await func1(MY_IP, callbackFunc);
// };

// console.log('Result: ', await func2());


// Є функція №1, яку можна евейти, яка поверне рядок == ваш поточний айп. Створіть функцію №2,
// яка повинна використовувати функцію №1 для отримання вашого поточного айпі, і яка приймає
// на вхід один параметр - функцію - коллбек, яка буде викликана, коли айпі буде отримано, з
// першим параметром, що дорівнює цьому айпі.Так, ми намагалися писати заплутано, але тут все чітко.

const IP_URL = "https://api.ipify.org?format=json";

function callbackFunc(IP: string) {
    console.log(`IP in callback - ${IP}`);    
}

async function func1() {
    try {
        const res = await fetch(IP_URL)
        const ip = await res.json() as { ip: string };
        return ip;
    } catch (error) {
        console.error(error);
    }
}

async function func2(callbackFunc: (IP: string) => void) {    
    const ip = await func1();
    console.log(`IP in func2 - ${ip?.ip}`);

    ip && callbackFunc(ip.ip);

};

await func2(callbackFunc);