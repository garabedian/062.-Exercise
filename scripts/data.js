
const appId = "C5FEFE75-5EB3-8F91-FF2D-A08E398F1400";
const apiKey = "9C0E07BE-7FAD-483C-A781-70B3FC8BC122";

function host(endpoint) {
    return `https://api.backendless.com/${appId}/${apiKey}/${endpoint}`;
}

const endpoints = {
    REGISTER: 'users/register',
    LOGIN: 'users/login',
    TEAMS: 'data/teams',
    UPDATE_USER: 'users/',
    LOGOUT: 'users/logout'
};

export async function register(username, password) {
    return (await fetch(host(endpoints.REGISTER), {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,   // Make appropriate changes in backEndLess DB
            password
        })
    })).json();
}

export async function login(username, password) {
    return (await fetch(host(endpoints.LOGIN), {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            login: username,  // Be careful what you are sending
            password
        })
    })).json();
}

export async function logout() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        throw new Error("User is not logged in!");
    }

    return fetch(host(endpoints.LOGOUT), {
        method: "GET",
        headers: {
            'user-token': token
        }
    });

}


async function setUserTeamId(userId, teamId) {
    const token = localStorage.getItem('userToken');
    if (!token) {
        throw new Error("User is not logged in!");
    }

    return (await fetch(host(endpoints.UPDATE_USER + userId), {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify({
            teamId
        })
    })).json();

}

export async function createTeam(team) {
    const token = localStorage.getItem('userToken');
    if (!token) {
        throw new Error("User is not logged in!");
    }

    const result = await (await fetch(host(endpoints.TEAMS), {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(team)
    })).json();

    if (result.hasOwnProperty('errorData')) {
        const error = new Error();
        Object.assign(error, result);
        throw error;
    }

    // Assign teamId to user
    const userUpdateResult = await setUserTeamId(result.ownerId, result.objectId);

    if (userUpdateResult.hasOwnProperty('errorData')) {
        const error = new Error();
        Object.assign(error, userUpdateResult);
        throw error;
    }

    return result;
}

export async function getTeamById(id) {
    return (await fetch(host(endpoints.TEAMS + '/' + id))).json();
}
export async function getTeams() {
    return (await fetch(host(endpoints.TEAMS))).json();
}

