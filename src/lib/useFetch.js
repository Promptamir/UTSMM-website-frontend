import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"







export function useFetch(defaultUrl, deafultValue) {
    const [url, setUrl] = useState(defaultUrl)
    const [data, setData] = useState(deafultValue ? deafultValue : [])
    const [error, setError] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(false)
    const navigator = useNavigate()
    const token = JSON.parse(localStorage.getItem("token"))
    const [val ,setVal] = useState(0);

    function refreshData() {
        setRefresh(!refresh)
    }

    function refetch() {setVal(prevState => prevState + 1)}

    useEffect(() => {
        (
            async function () {
                try {
                    setLoading(true)
                    const response = await axios.get(url, {
                        method: "get",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept" : "application/json",
                            "X-Requested-With" : "XMLHttpRequest",
                            "Authorization" : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                        },
                    })
                    setData(response.data)
                } catch (err) {
                    if (err?.response?.data.message === "Unauthenticated") {
                        navigator('/auth/login');
                    }
                    setError(err)
                } finally {
                    setLoading(false)
                }
            }
        )()
    }, [url, refresh, val])

    return [data, error, loading, setUrl, refreshData, refetch]

}


export function usePost(url) {

    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const token = JSON.parse(localStorage.getItem("token"))



    const post = async (postData) => {
        setLoading(true)
        setError(null)

        await setTimeout(async () => {
            await axios({
                url: url,
                method: "post",
                data: postData,
                headers: {
                    token: token
                }

            }).then(response => {
                setLoading(false)
                setData(response)
                return response
            }).catch(err => {
                setLoading(false)
                if (err?.response?.data?.errors) {
                    const temp = Object.entries(err?.response?.data?.errors).map(item => {
                        return item[1].message
                    })
                    setError(temp)
                }

            })
        }, 2000)
    }


    return [
        data,
        error,
        loading,
        post
    ]

}

export async function post(url, postData) {

    const token = JSON.parse(localStorage.getItem("token"))


    return await axios({
        method: "post",
        url: url,
        headers: {
            token: token
        },
        data: postData
    }).then(response => {
        return response
    }).catch(err => {
        console.log(err)
        throw err
    })

}

export async function put(url, postData) {

    const token = JSON.parse(localStorage.getItem("token"))


    return await axios({
        method: "put",
        url: url,
        headers: {
            token: token
        },
        data: postData
    }).then(response => {
        return response
    }).catch(err => {
        throw err
    })

}

export async function deletE(url, deleteData) {

    const token = JSON.parse(localStorage.getItem("token"))


    return await axios({
        method: "delete",
        url: url,
        headers: {
            token: token
        },
        data: deleteData
    }).then(response => {
        return response
    }).catch(err => {
        throw err
    })

}


export async function get(url, postData) {

    const token = JSON.parse(localStorage.getItem("token"))


    return await axios({
        method: "get",
        url: url,
        headers: {
            token: token
        },
        data: postData
    }).then(response => {
        return response
    }).catch(err => {
        console.log(err)
        throw err
    })

}

