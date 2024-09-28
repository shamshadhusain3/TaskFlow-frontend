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
            response.json().then(async(json )=> {
                if (!response.ok) {
                    console.error('Response error:', json);
                    return Promise.reject(json);
                }
             
                return json;
            })
        )
        .catch(err => {
            console.error('Fetch error:', err);
            throw err;
        });
};

// User-related API functions
export function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/api/users/me",
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
        url: API_BASE_URL + "/api/users/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

// Task-related API functions
export function getAllTasks() {
    return request({
        url: API_BASE_URL + "/api/tasks",
        method: 'GET'
    });
}

export function createTask(taskRequest) {
    return request({
        url: API_BASE_URL + "/api/tasks",
        method: 'POST',
        body: JSON.stringify(taskRequest)
    });
}

export function updateTask(id, taskRequest) {
    return request({
        url: `${API_BASE_URL}/api/tasks/${id}`,
        method: 'PUT',
        body: JSON.stringify(taskRequest)
    });
}

export function deleteTask(id) {
    return request({
        url: `${API_BASE_URL}/api/tasks/${id}`,
        method: 'DELETE'
    });
}

// Employee-related API functions
export function getAllEmployees() {
    return request({
        url: API_BASE_URL + "/api/users/all",
        method: 'GET'
    });
}

export function createEmployee(employeeRequest) {
    return request({
        url: API_BASE_URL + "/api/users/signup",
        method: 'POST',
        body: JSON.stringify(employeeRequest)
    });
}

export function updateEmployee(id, employeeRequest) {
    return request({
        url: `${API_BASE_URL}/api/users/update/${id}`,
        method: 'PUT',
        body: JSON.stringify(employeeRequest)
    });
}

export function deleteEmployee(id) {
    return request({
        url: `${API_BASE_URL}/api/users/${id}`,
        method: 'DELETE'
    });
}
