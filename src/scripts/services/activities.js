async function getEvents(userName){
    const response = await fetch(`https://api.github.com/users/${userName}/events`)
    return await response.json()
    // console.log(resposta[0].repo.name) //repositório
    // console.log(resposta[0].payload.commits[0].message) //atividade
}

export {getEvents}