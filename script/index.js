
const poemList = document.querySelector("#poems");

const loggedInLinks = document.querySelectorAll(".logged-in");
const loggedOutLinks = document.querySelectorAll(".logged-out");
const accoundDetails = document.querySelector("#account-details")


const setupNav = (user) =>{
    if(user){
        loggedInLinks.forEach(link => link.style.display ='block');
        loggedOutLinks.forEach(link => link.style.display ='none');

        db.collection('users').doc(user.uid).get().then(doc=>{
            const html = `
                <div> logged in as ${user.email}</div>
                <div> logged in as ${doc.data().bio}</div>

            `;
            accoundDetails.innerHTML = html;
        })

    }else{
        loggedInLinks.forEach(link => link.style.display ='none');
        loggedOutLinks.forEach(link => link.style.display ='block');
        accoundDetails.innerHTML = "";
    }
}

const setupPoems = (data) =>{
    if(data.length){
        let html = "";
        data.forEach(doc=>{
            const poems = doc.data();
            const li = `
                <li class="list-group-item active">${poems.title}</li>
                <li class="list-group-item mb-3">${poems.content}</li>
            `;
            html+=li;
        });
        poemList.innerHTML = html; 
    }else{
        poemList.innerHTML = `<h3 class="text-center">Login to view Poems</h3>`;
    }
}