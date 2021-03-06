const passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

async function extractProfile(email,profile) {
    let imageUrl = '';
    if (profile.photos && profile.photos.length) {
    imageUrl = profile.photos[0].value;
    }
     console.log(profile.id+' '+profile.displayName+ ' '+ profile.emails[0].value+' '+ profile.photos[0].value)
    // console.log(email)
    console.log('profile of the user is')
    // console.log(profile)
    // console.log(profile.emails[0].value)
    return {
    id: profile.id,
    displayName: profile.displayName,
    image: imageUrl
    
    };
    
    }


passport.use('facebook',new FacebookStrategy({
  clientID: "insert client id here",
  clientSecret: "insert client secret here ",
  callbackURL: "insert callback here same as dev console ",
  profileFields: ['id', 'displayName', 'photos', 'email']
},
async (accessToken, refreshToken,profile,email, cb) => {
    await cb(null, extractProfile(profile,email));
}));
passport.serializeUser((user, cb) => {
       cb(null, user);
});
passport.deserializeUser((obj, cb) => {
       cb(null, obj);
});
