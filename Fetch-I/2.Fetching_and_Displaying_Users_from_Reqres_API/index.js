document.getElementById('fetchUsers').addEventListener('click',FetchUsers);


function Display(users){
    const allUsersDiv = document.getElementById('allUsers');
    allUsersDiv.innerHTML = '';

    users.forEach(user => {
        const mainDiv = document.createElement('div');
        mainDiv.className = 'userdiv';

        const fullName = document.createElement('p');
        fullName.textContent = `Full Name: ${user.first_name} ${user.last_name}`;

        const email = document.createElement('p');
        email.textContent = `Email: ${user.email}`;

        const avatar = document.createElement('img');
        avatar.src = user.avatar;
        avatar.alt = `${user.first_name} ${user.last_name}'s avatar`;

        mainDiv.append(fullName,email,avatar);
    
        allUsersDiv.append(mainDiv);
    });
}

async function FetchUsers() {

    try{
        const response = await fetch('https://reqres.in/api/users/');
        const data = await response.json();
        // console.log(data);
        Display(data.data);
        
    }catch (error){
        console.log("something went wrong",error);
    }
    
}

