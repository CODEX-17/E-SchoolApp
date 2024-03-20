import axios from "axios"

export default (acctID) => {
    axios.get('http://localhost:5000/accounts/getClassesByAccount/' + acctID)
    .then((res) => {
        console.log(res.data)
        return res.data
    })
    .catch((err) => console.error(err))
}