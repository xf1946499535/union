export const setssoLocal = (token) => {
    document.cookie = `token=${token}; expires=${new Date()}; domain=${window.location.host.split(":")[0]};path=/`
    console.log(document.cookie);
}

export const gettoken = () => {

}