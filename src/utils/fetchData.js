import axios from 'axios'

export const getDataAPI = async (url, token) => {
    const res = await axios.get(`https://social-pg3k.onrender.com/api/${url}`, {
        headers: { Authorization: token}
    })
    return res;
}

export const postDataAPI = async (url, post, token) => {
    const res = await axios.post(`https://social-pg3k.onrender.com/api/${url}`, post, {
        headers: { Authorization: token}
    })
    return res;
}

export const putDataAPI = async (url, post, token) => {
    const res = await axios.put(`https://social-pg3k.onrender.com/api/${url}`, post, {
        headers: { Authorization: token}
    })
    return res;
}

export const patchDataAPI = async (url, post, token) => {
    const res = await axios.patch(`https://social-pg3k.onrender.com/api/${url}`, post, {
        headers: { Authorization: token}
    })
    return res;
}

export const deleteDataAPI = async (url, token) => {
    const res = await axios.delete(`https://social-pg3k.onrender.com/api/${url}`, {
        headers: { Authorization: token}
    })
    return res;
}