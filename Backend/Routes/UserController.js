const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(__dirname+'/public'));


router.get('/profile', function (req, res) {
    var token = localStorage.getItem('authtoken')
    console.log("token>>>",token)
    if (!token) {
        res.redirect('/')
    }
    jwt.verify(token, config.secret, function(err, decoded) {
    if (err) {
        res.redirect('/')
    };
        User.findById(decoded.id, { password: 0 }, function (err, user) {
            if (err) {res.redirect('/')}
            if (!user) {res.redirect('/')}

            //res.render('profile.ejs',{user})
            res.send('Go to profile page')
        });
    });
});
 router.get('/logout', (req,res) => {
     localStorage.removeItem('authtoken');
     res.redirect('/');
 })

module.exports = router;