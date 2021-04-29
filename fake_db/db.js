export default {
    providers: [
        {code: "mts", name: "MTS"},
        {code: "beeline", name: "Beeline"},
        {code: "megafon", name: "Megafon"}
    ],

    refillBalance() {
        const returnResponse = new Promise((resolve) => {
            setTimeout(() => {
                const random = Math.floor(Math.random() * 2);

                if (random) {
                    resolve({
                        status: 200,
                        text: 'ok'
                    });
                }

                resolve({
                    status: 500,
                    text: 'error'
                });
            }, 1000)
        });

        return returnResponse;
    },

    fetchProviders() {
        const returnResponse = new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    status: 200,
                    text: 'ok',
                    data: this.providers
                });
            }, 1000)
        });

        return returnResponse;
    },

    fetchProvider(code) {
        const returnResponse = new Promise((resolve) => {
            setTimeout(() => {
                this.providers.forEach((item) => {
                    if (item.code === code) {
                        resolve({
                            status: 200,
                            text: 'ok',
                            data: item
                        });
                    }
                    
                });

                resolve({
                    status: 404,
                    text: 'element not found'
                });
                
            }, 1000)
        });

        return returnResponse;
    }
}