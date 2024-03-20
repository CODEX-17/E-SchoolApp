
export default () => {

    const acctInfo = JSON.parse(localStorage.getItem('user'))
    const firstname = acctInfo.firstname
    const middlename = acctInfo.middlename
    const lastname = acctInfo.lastname

    if (JSON.parse(localStorage.getItem('user'))) {
        return ( firstname + ' ' + middlename.substring(0, 1) + '. ' + lastname)
    }else {
        return 'no user available'
    }

    

}