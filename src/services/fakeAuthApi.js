const fakeAuthApi = {
    login: (username, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (username === "admin" && password === "password") {
                    resolve({ id: 1, username, role: "admin" })
                } else {
                    reject(new Error("Invalid credentials"))
                }
            }, 2000)
        })
    },
    logout: () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, 2000)
        })
    }
}

export default fakeAuthApi