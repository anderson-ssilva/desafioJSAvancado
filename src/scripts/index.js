import {getUser} from '/src/scripts/services/user.js'
import {getRepositories} from '/src/scripts/services/repositories.js'
import {user} from '/src/scripts/objects/user.js'
import {screen} from '/src/scripts/objects/screen.js'
import {getEvents} from '/src/scripts/services/activities.js'

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    if(validadeEmptyInput(userName)) return
    getUserData(userName)
})

function validadeEmptyInput(userName){
    if(userName.length === 0){
        alert('Preencha o campo com o nome do usuário do GitHub')
        return true
    }
}

document.getElementById('input-search').addEventListener('keyup', (e) =>{
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key === 13

    if(isEnterKeyPressed){
        if(validadeEmptyInput(userName)) return
        getUserData(userName)
    }
})

//Mostrando os dados do usuário

async function getUserData(userName){

    const userResponse = await getUser(userName)

    if(userResponse.message === "Not Found"){
        screen.renderNotFound()
        return
    }
    
    const repositoriesResponse = await getRepositories(userName)

    const lastUserEventsResponse = await getEvents(userName)

    user.setInfo(userResponse)

    user.setRepositories(repositoriesResponse)

    user.setUserActivities(lastUserEventsResponse)

    screen.renderUser(user)

    // getUser(userName).then(userData => {
    //     let userInfo = `<div class="info">
    //                         <img src="${userData.avatar_url}" alt="Foto do perfil do usuário"/>
    //                         <div class="data">
    //                             <h1>${userData.name ?? 'Não possui nome cadastrado'}</h1>
    //                             <p>${userData.bio ?? 'Não possui bio cadastrada'}</p>
    //                         </div>
    //                     </div>`
    //     document.querySelector('.profile-data').innerHTML = userInfo

    //     getUserRepositories(userName)
    // })
}

//Mostrando os repositórios do usuário

// function getUserRepositories(userName){
//     getRepositories(userName).then(reposData => {
//         let repositoriesItens = ""
//         reposData.forEach(repo => {
//             repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`
//         })

//         document.querySelector('.profile-data').innerHTML += `<div class="repositories section">
//                                                             <h2>Repositórios</h2>
//                                                             <ul>${repositoriesItens}</ul>
//                                                           </div>`
//     })    
// }