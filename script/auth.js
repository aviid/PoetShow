//Get data


//Listen for auth state change
auth.onAuthStateChanged(user=>{
   if(user){
        db.collection('poems').onSnapshot(snapshot=>{
            setupPoems(snapshot.docs);
            setupNav(user);
        }, err=>console.log(err.message));
   }else{
    setupPoems([]);
    setupNav();
   }
});

//Create new Poem
const createForm = document.querySelector("#create-form");
createForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const title = createForm['title'].value;
    const content = createForm['content'].value;

    db.collection('poems').add({
        title: title,
        content: content
    }).then(()=>{
        createForm.reset()
        
        $("#createModal").modal('hide');
    }).catch(err=>console.log(err.message));
});


//Signup 
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    //Get user form info
    const email = signupForm['signup-email'].value;
    const pass  = signupForm['signup-pass'].value;


    auth.createUserWithEmailAndPassword(email, pass).then((cred)=>{
        //console.log(cred.user.uid);
        db.collection('users').doc(cred.user.uid).set({
            bio: signupForm['signup-bio'].value
        });

        $('#signupModal').modal('hide');
        signupForm.reset();
    });
});

//Logout user
const logout = document.querySelector("#logout");
logout.addEventListener('click', (e)=>{
    auth.signOut().then(()=>{
        console.log("You don sign out");
    });
});

//sign in user
const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const email = loginForm['signin-email'].value;
    const pass = loginForm['signin-pass'].value;

    auth.signInWithEmailAndPassword(email, pass).then((cred)=>{
        console.log(cred.user.uid);

        $('#loginModal').modal('hide');
        loginForm.reset();
    }, err=>{
        console.log(err.message);
    });
});