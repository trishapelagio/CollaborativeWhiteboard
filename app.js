const path = require('path');
const url = require('url');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');


const { getUser, userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./Users.js');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    pingTimeout: 60000
});

let rooms = ['General'];

let loginMsg = '';
let loginClass = '';
let ctr = 0;

//For static files
app.use(express.static(path.join(__dirname, 'views/')));

app.use(express.json());

//Setting view engine for ejs
app.set('view engine', 'ejs');

io.on('connection', (socket) => {

    socket.on('joinRoom', ({ username, room }) => {
        let check = rooms.includes(room);
        if (check) {
            let numusers = getRoomUsers(room).length;
            if(numusers == 0){
                user_name = username+' (admin)'
                user = userJoin(socket.id, user_name, room, true);
            }
            else
                user = userJoin(socket.id, username, room, false);

            socket.join(user.room);

            loginMsg = '';
            loginClass = '';
 
            // Send users and room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room),
                status: true
            });
        } else {
            io.to(`${socket.id}`).emit('wrong_Room', check);
            // loginMsg = 'You tried to login in an un-registered room';
            // loginClass = 'msg';
            
        }

    });

    // socket.on('delete-room', room => {
    //     rooms.splice(rooms.findIndex(room));
    // });

    socket.on('canvas-image', data => {
        const user = getCurrentUser(socket.id);
        if (user) {
            socket.broadcast.to(user.room).emit('canvas-draw', data);
        }
        else {
            socket.emit("wrong_Room", false);
            loginMsg = 'You were logged out due to an error';
            loginClass = 'msg';
        }
    });

    socket.on('canvas-clear', data => {
        const user = getCurrentUser(socket.id);
        io.in(user.room).emit('canvas-wipe', data);

    });

    socket.on('disconnect', () => {

        const user = userLeave(socket.id);
        if (user) {
            if(user.admin && user.room!="General"){
                io.in(user.room).emit('disconnect', {});
                rooms.splice(rooms.indexOf(user.room), 1);
            }
            else{
                io.to(user.room).emit('roomUsers', {
                    room: user.room,
                    users: getRoomUsers(user.room),
                    status: false
                });
            }
        }
    });
});

app.get('/', (req, res) => {
    res.render('username.ejs');
})

app.get('/login', (req, res) => {

    username = req.query.username;
    // console.log(username);
    const Obj = {
        "rooms": rooms,
        "class": `${loginClass}`,
        "msg": `${loginMsg}`
    };
    res.render('login.ejs', { rooms: Obj, username:username});
})

app.get('/draw', (req, res) => {
    let query = url.parse(req.url, true).query;
    let msg = {
        username: query.username,
        room: query.room
    }
    res.render('draw.ejs', { Qs: msg });
});

app.get('/createroom', (req, res) => {
    ctr++;
    animals = [
        "Aardvark",
        "Albatross",
        "Alligator",
        "Alpaca",
        "Ant",
        "Anteater",
        "Antelope",
        "Ape",
        "Armadillo",
        "Donkey",
        "Baboon",
        "Badger",
        "Barracuda",
        "Bat",
        "Bear",
        "Beaver",
        "Bee",
        "Bison",
        "Boar",
        "Buffalo",
        "Butterfly",
        "Camel",
        "Capybara",
        "Caribou",
        "Cassowary",
        "Cat",
        "Caterpillar",
        "Cattle",
        "Chamois",
        "Cheetah",
        "Chicken",
        "Chimpanzee",
        "Chinchilla",
        "Chough",
        "Clam",
        "Cobra",
        "Cockroach",
        "Cod",
        "Cormorant",
        "Coyote",
        "Crab",
        "Crane",
        "Crocodile",
        "Crow",
        "Curlew",
        "Deer",
        "Dinosaur",
        "Dog",
        "Dogfish",
        "Dolphin",
        "Dotterel",
        "Dove",
        "Dragonfly",
        "Duck",
        "Dugong",
        "Dunlin",
        "Eagle",
        "Echidna",
        "Eel",
        "Eland",
        "Elephant",
        "Elk",
        "Emu",
        "Falcon",
        "Ferret",
        "Finch",
        "Fish",
        "Flamingo",
        "Fly",
        "Fox",
        "Frog",
        "Gaur",
        "Gazelle",
        "Gerbil",
        "Giraffe",
        "Gnat",
        "Gnu",
        "Goat",
        "Goldfinch",
        "Goldfish",
        "Goose",
        "Gorilla",
        "Goshawk",
        "Grasshopper",
        "Grouse",
        "Guanaco",
        "Gull",
        "Hamster",
        "Hare",
        "Hawk",
        "Hedgehog",
        "Heron",
        "Herring",
        "Hippopotamus",
        "Hornet",
        "Horse",
        "Human",
        "Hummingbird",
        "Hyena",
        "Ibex",
        "Ibis",
        "Jackal",
        "Jaguar",
        "Jay",
        "Jellyfish",
        "Kangaroo",
        "Kingfisher",
        "Koala",
        "Kookabura",
        "Kouprey",
        "Kudu",
        "Lapwing",
        "Lark",
        "Lemur",
        "Leopard",
        "Lion",
        "Llama",
        "Lobster",
        "Locust",
        "Loris",
        "Louse",
        "Lyrebird",
        "Magpie",
        "Mallard",
        "Manatee",
        "Mandrill",
        "Mantis",
        "Marten",
        "Meerkat",
        "Mink",
        "Mole",
        "Mongoose",
        "Monkey",
        "Moose",
        "Mosquito",
        "Mouse",
        "Mule",
        "Narwhal",
        "Newt",
        "Nightingale",
        "Octopus",
        "Okapi",
        "Opossum",
        "Oryx",
        "Ostrich",
        "Otter",
        "Owl",
        "Oyster",
        "Panther",
        "Parrot",
        "Partridge",
        "Peafowl",
        "Pelican",
        "Penguin",
        "Pheasant",
        "Pig",
        "Pigeon",
        "Pony",
        "Porcupine",
        "Porpoise",
        "Quail",
        "Quelea",
        "Quetzal",
        "Rabbit",
        "Raccoon",
        "Rail",
        "Ram",
        "Rat",
        "Raven",
        "Red deer",
        "Red panda",
        "Reindeer",
        "Rhinoceros",
        "Rook",
        "Salamander",
        "Salmon",
        "Sand Dollar",
        "Sandpiper",
        "Sardine",
        "Scorpion",
        "Seahorse",
        "Seal",
        "Shark",
        "Sheep",
        "Shrew",
        "Skunk",
        "Snail",
        "Snake",
        "Sparrow",
        "Spider",
        "Spoonbill",
        "Squid",
        "Squirrel",
        "Starling",
        "Stingray",
        "Stinkbug",
        "Stork",
        "Swallow",
        "Swan",
        "Tapir",
        "Tarsier",
        "Termite",
        "Tiger",
        "Toad",
        "Trout",
        "Turkey",
        "Turtle",
        "Viper",
        "Vulture",
        "Wallaby",
        "Walrus",
        "Wasp",
        "Weasel",
        "Whale",
        "Wildcat",
        "Wolf",
        "Wolverine",
        "Wombat",
        "Woodcock",
        "Woodpecker",
        "Worm",
        "Wren",
        "Yak",
        "Zebra"
    ];

    room = animals[Math.floor(Math.random() * animals.length)];

    if (ctr <= animals.length){
        while(rooms.includes(room)){
            room = animals[Math.floor(Math.random() * animals.length)];
        }
        username = req.query.username;
        rooms.push(room);
        // console.log(rooms);
        //res.redirect('/?createroom=true')
        res.redirect('/draw?username='+username+'&room='+room);
    } else {
        room = "block_create";
        res.redirect('/login?username='+username+'&room='+room);
    }
});

PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT} 🚀`);
});