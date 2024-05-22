import axios from 'axios'

export const getHtml = async (url: string) => {
    const response = await axios.get<string>(url)
    return response.data
}
