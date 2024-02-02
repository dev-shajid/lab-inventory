'use server'

import axios from 'axios'

axios.defaults.baseURL = ''

export const submitAddItemManagerForm = async (values) => {
    alert(JSON.stringify(values, null, 2))
}

export const submitTeacherForm = async (values) => {
    alert(JSON.stringify(values, null, 2))
}

const getAllUser = async () => {
    const res = await fetch(`/api/user`)
    return res.json()
}