// 1. 

function getFirstWord(a: string) {
	return a.split(/ +/)[0].length;
}

// 2. 
interface IA2 {
    name: string,
    surname: string
}

function getUserNamings(a: IA2) {
  return { 
		fullname: a.name + " " + a.surname, 
		initials: a.name[0] + "." + a.surname[0] 
	};
}

// 3.

interface IA3 {
    products: {
        name: string
    }[]
}

// <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining>
function getAllProductNames(a: IA3) {
  return a?.products?.map(prod => prod?.name) || [];
}

// 4.1

// easy way is using 'as' keyword
// hard way is ?...

interface IA4 {
    name: () => string,
    coolness?: number,
    cuteness?: number,
}
function hey(a: IA4): string {
    return "hey! i'm " + a.name();
}
hey({name: () => "roma", cuteness: 100})
hey({name: () => "vasya", coolness: 100})

// 4.2

abstract class IPet {    
    petName: string;
    constructor(name: string) {
        this.petName = name;
    }
    name(): string {
        return this.petName;
    }
}

class Cat extends IPet {
    isAngry?: boolean;

    constructor(name:string, isAngry: boolean) {
        super(name);
        this.isAngry = isAngry;
    }    
}
class Dog extends IPet {
    age?: number;

    constructor(name:string, age: number) {
        super(name);
        this.age = age;
    }
}

function hey2(abstractPet: IPet) {
    return "hey! i'm " + abstractPet.name();
}
let a = new Cat("myavchik", true)
let b = new Dog("gavchik", 333)
hey2(a)
hey2(b)

// 4.3

interface IA5 {
    name: () => string,
    type: string,
    coolness?: number,
    cuteness?: number,
}

function hey3(a: IA5): string {
    return "hey! i'm " + a.name()
		 + (a.type === "cat" ? ("cuteness: "+a.cuteness) : ("coolness: "+a.coolness))
}
hey3({name: () => "roma", type: "cat", cuteness: 100})
hey3({name: () => "vasya", type: "dog", coolness: 100})

// 5.

// google for Record type
function stringEntries(a: Record<any, string>) {
   return Array.isArray(a) ? a : Object.keys(a)
}

// 6.

// you don't know Promises and async/await yet. Or do you? 
// ....can be hard, don't worry and SKIP if you do not know how to do it

async function world(a: number): Promise<string> {
    return "*".repeat(a);
}
const hello = async (): Promise<string> => {
    return await world(10);
}
hello().then(r => console.log(r)).catch(e => console.log("fail"))