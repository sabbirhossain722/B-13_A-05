const loadData = () =>{
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    fetch(url)
    .then(res => res.json())
    .then((json) => {
        // console.log(json);
        displayPost(json.data);
    })
};
const displayPost = (posts) => {
    const issuesCard = document.getElementById("card_container");
    issuesCard.innerHTML = "";
    // console.log(issuesCard);
    posts.forEach((post) => {
        // console.log(post);`
        const container = document.createElement("div");

        let priorityColor = "";
        if (post.priority === "high") {
            priorityColor = "bg-red-100 text-red-600 border border-red-300";
        } else if (post.priority === "medium") {
            priorityColor = "bg-yellow-100 text-yellow-600 border border-yellow-300";
        } else {
            priorityColor = "bg-gray-100 text-gray-600 border border-gray-300";
        }

        container.innerHTML =
        `
            <div class="bg-white rounded-lg shadow-md p-6 mb-4">
                
                <div class="flex items-center justify-between mb-2">
                    <span class="text-green-600 font-semibold">${post.status === "open" ? `<img src="./assets/Open-Status.png" alt=""> ` : `<img src="./assets/Closed- Status .png" alt="">`}</span>
                    <span class="p-3  py-2 text-xs font-bold rounded ${priorityColor}">${post.priority}</span>
                </div>

                
                <h3 class="font-semibold text-sm text-gray-800 mt-3">${post.title}</h3>
                <p class="font-normal text-xs text-[#64748b] mt-2">
                    ${post.description}
                </p>

                
                <div class="flex gap-2 mt-5">
                    <span class="px-3 py-1 font-medium text-xs rounded-[100px]  bg-[#feecec] text-red-500 flex items-center gap-2 border border-[#fecaca]">
                        <img src="./assets/BugDroid.png" alt="">
                        <span>${post.labels[0]}</span>
                    </span>
                    <span class="px-3 py-1 font-medium text-xs rounded-[100px]  bg-[#fff8db] text-amber-600 flex items-center gap-2 border border-[#fde68a]">
                        <img src="./assets/Lifebuoy.png" alt="">
                        <span class="">${post.labels[1] ?? ""}</span>
                    </span>
                </div>

                <hr class="border-gray-300 mt-8">
                
                <div class="flex flex-col justify-between mt-4 text-sm text-gray-500">
                    <span class="mt-2"># ${post.id} by ${post.author}</span>
                    <span class="mt-1">${post.createdAt}</span>
                </div>
            </div>

        `;


    
        



        issuesCard.appendChild(container);

    })
};
loadData();