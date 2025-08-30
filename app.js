const items = document.getElementById("items")

function add(id, tourl, type) {
    const newitem = `
    <div class="box">
        <h3>Id Apple: ${id}</h3>
        <p>Type: ${type}</p>
        <div class="ok">
            <a href="${tourl}">Click Here to get</a>
        </div>
    </div>
    `
    items.innerHTML += newitem
}

function req(url) {
    return fetch(url, {
        method: "GET",
        mode: "cors", // bắt buộc dùng cors
        credentials: "omit", // hoặc "include" nếu cần cookie
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(async response => {
        console.log("Status:", response.status);
        console.log("Headers:", Object.fromEntries(response.headers.entries()));

        let text = await response.text(); // đọc raw text trước
        console.log("Raw response:", text);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        try {
            return JSON.parse(text);
        } catch (e) {
            console.warn("Response is not valid JSON:", e);
            return null;
        }
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });
}
req("http://ifeelsoemtylol324.x10.mx/getvipid.php")
    .then(data => {
        for (const [mail, link] of Object.entries(data["data"])) {
            add(mail, link, "Vip")
        }
    });
req("http://ifeelsoemtylol324.x10.mx/getfreeid.php")
    .then(data => {
        for (const [mail, link] of Object.entries(data["data"])) {
            add(mail, link, "Free")
        }
    });
