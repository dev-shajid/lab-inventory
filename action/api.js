"use server"

import { cookies, headers } from "next/headers"
import verifyToken from "@/lib/verifyToken";
import db from "@/lib/db";

export async function Logout() {
    try {
        cookies().delete('token');
        return true
    } catch (error) {
        return error
    }
}

// TODO: User
export async function GetAuthUser() {
    try {

        let token = cookies().get('token')?.value || headers()?.get('token') || ''
        let decode = token ? await verifyToken(token) : null

        if (!decode || !decode?.id) throw new Error("Unauthorized user! sigin again")
        // console.log({ decode });
        let user = await db.user.findFirst({ where: { id: decode?.id } })
        return { message: "Authorized Succesfully!", user, success: true, }
    } catch (error) {
        console.log({ GetAuthUser_Error: error.message })
        return error
    }
}


export async function GetAllUsers() {
    try {
        const users = await db.user.findMany({ where: { isVerified: true } })
        return users
    } catch (error) {
        console.log({ GetAllUsers_Error: error.message })
        return error
    }
}

export async function VerifyUser({ id }) {
    try {
        const { password, ...user } = await db.user.update({
            where: { id },
            data: { isVerified: true }
        })
        return true
    } catch (error) {
        console.log({ VerifyUser_Error: error.message })
        return error
    }
}

export async function DeleteUser({ id }) {
    try {
        await db.user.delete({
            where: { id }
        })
        return true
    } catch (error) {
        console.log({ DeleteUser_Error: error.message })
        return error
    }
}

export async function GetNewUsers() {
    try {
        const users = await db.user.findMany({ where: { isVerified: false } })
        return users
    } catch (error) {
        console.log({ GetNewUsers_Error: error.message })
        return error
    }
}

export async function RoleLabManager({ id }) {
    try {
        const { password, ...user } = await db.user.update({
            where: { id },
            data: { role: "manager" }
        })
        return user
    } catch (error) {
        console.log({ RoleLabManager_Error: error.message })
        return error
    }
}

export async function RoleLabAsistant({ id, lab }) {
    try {
        const { password, ...user } = await db.user.update({
            where: { id },
            data: { role: "asistant", lab }
        })
        return user
    } catch (error) {
        console.log({ RoleLabAsistant_Error: error.message })
        return error
    }
}

export async function GetUser({ role, lab = "" }) {
    try {
        const { password, ...user } = await db.user.findFirst({
            where: { role, lab }
        })
        return user
    } catch (error) {
        console.log({ RoleLabAsistant_Error: error.message })
        return error
    }
}

// TODO: Items
export async function GetItems({ role, lab = "" }) {
    try {
        let items
        if (role == 'manager') {
            items = await db.item.findMany({ orderBy: { createdAt: 'desc' } })
        } else {
            let query = { role: role }
            if (lab) query.lab = lab
            items = await db.request.findMany({
                where: query,
            })
        }
        return items
    } catch (error) {
        console.log({ GetItems_Error: error.message })
        return error
    }
}

export async function GetItem({ id }) {
    try {
        const item = await db.item.findFirst({ where: { id } })
        // console.log(item)
        return item
    } catch (error) {
        console.log({ GetItem_Error: error.message })
        return error
    }
}

export async function AddItem({ data, id }) {
    try {
        const item = await db.item.create({ data })
        // console.log(item)
        return item
    } catch (error) {
        console.log({ AddItem_Error: error.message })
        return error
    }
}

export async function EditItem({ data, id }) {
    try {
        // console.log(data)
        let item = await db.item.update({ where: { id: id }, data })
        return item
    } catch (error) {
        console.log({ EditItem_Error: error.message })
        return error
    }
}

export async function DeleteItem({ id }) {
    try {
        const item = await db.item.delete({ where: { id: id } })
        return item
    } catch (error) {
        console.log({ Deletetem_Error: error.message })
        return error
    }
}

// TODO: Request

export async function GetAllRequests({ role, lab }) {
    try {
        let query = { role: role }
        if (lab) query.lab = lab
        const items = await db.request.findMany({ where: query, orderBy: { createdAt: 'desc' } })
        return items
    } catch (error) {
        console.log({ GetAllRequests_Error: error.message })
        return error
    }
}

export async function AddRequest({ data }) {
    try {
        data.status = 'p'
        const request = await db.request.create({ data })
        return request
    } catch (error) {
        console.log({ AddRequest_Error: error.message })
        return error
    }
}

export async function GetAdminRequest() {
    try {
        const newItem = await db.request.findMany({
            where: {
                req_type: {
                    in: ['repair', 'restock']
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return newItem
    } catch (error) {
        console.log({ GetAdminRequest_Error: error.message })
        return error
    }
}

export async function GetManagerRequest() {
    try {
        const newItem = await db.request.findMany({
            where: {
                req_type: "demand"
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return newItem
    } catch (error) {
        console.log({ GetManagerRequest_Error: error.message })
        return error
    }
}

export async function EditAdminRequest({ data }) {
    try {
        await db.request.update({ where: { id: data.id }, data: { status: data.status, supply: data.supply, available: data.available } })
        return true
    } catch (error) {
        console.log({ EditAdminRequest_Error: error.message })
        return error
    }
}

export async function EditManagerRequest({ data }) {
    try {
        await db.request.update({ where: { id: data.id }, data: { status: data.status, supply: data?.supply, available: data?.available } })
        return true
    } catch (error) {
        console.log({ EditManagerRequest_Error: error.message })
        return error
    }
}

// TODO: LAB

export async function GetLabItems({ lab }) {
    try {
        lab = lab.concat('Item')
        const items = await db[lab].findMany({ orderBy: { createdAt: 'desc' } })
        return items
    } catch (error) {
        console.log({ GetLabItems_Error: error.message })
        return error
    }
}

export async function AddLabItem({ data, lab }) {
    try {
        lab = lab.concat('Item')
        const item = await db[lab].create({ data })
        return item
    } catch (error) {
        console.log({ AddLabItem_Error: error.message })
        return error
    }
}

export async function EditLabItem({ data, id, lab }) {
    try {
        // console.log({ data, id, lab })
        lab = lab.concat('Item')
        const item = await db[lab].update({ where: { id }, data })
        return item
    } catch (error) {
        console.log({ EditLabItem_Error: error.message })
        return error
    }
}

export async function DeleteLabItem({ id, lab }) {
    try {
        lab = lab.concat('Item')
        await db[lab].delete({ where: { id } })
        return true
    } catch (error) {
        console.log({ DeleteLabItem_Error: error.message })
        return error
    }
}