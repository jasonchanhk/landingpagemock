const express = require("express");
const cors = require("cors")
const dashboard = require("./api/dashboard")
const users = require("./api/users")
const session = require("express-session");
const store = new session.MemoryStore();
const passport = require("passport")

const app = express()

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "PST", "PUT", "DELETE"],
    credentials: true
    })
);
app.use(express.json());
app.use(express.urlencoded());

app.use(session({
    name: "id",
    key: 'session_cookie_name',
	secret: 'blokbottesting',
	resave: false,
    store: store,
	saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 10,
        sameSite: true
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    console.log(store);
    next();
})
app.use("/dashboard", dashboard);
app.use("/users", users);


app.listen(5000, () => {
    console.log(`Server is running on 5000`);
});
