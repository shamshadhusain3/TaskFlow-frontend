import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });
    
    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN));
    }

    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response => 
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

export function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/api/users/me", // Update the URL
        method: 'GET'
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/api/users/login", // Update the URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: loginRequest.toString()
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/api/users/signup", // Update the URL
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

// Add task-related API functions
// export function getAllTasks() {
//     return request({
//         url: API_BASE_URL + "/api/tasks", // Update the URL
//         method: 'GET'
//     });
// }

// export function createTask(taskRequest) {
//     return request({
//         url: API_BASE_URL + "/api/tasks", // Update the URL
//         method: 'POST',
//         body: JSON.stringify(taskRequest)
//     });
// }

// export function updateTask(id, taskRequest) {
//     return request({
//         url: API_BASE_URL + `/api/tasks/${id}`, // Update the URL
//         method: 'PUT',
//         body: JSON.stringify(taskRequest)
//     });
// }

// export function deleteTask(id) {
//     return request({
//         url: API_BASE_URL + `/api/tasks/${id}`, // Update the URL
//         method: 'DELETE'
//     });
// }
