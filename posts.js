const loadData = (filter = "all", btn = null) => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    fetch(url)
        .then(res => res.json())
        .then((json) => {
            // console.log(json);

            let posts = json.data;
            if (filter === "open") {
                posts = posts.filter(post => post.status === "open");
            } else if (filter === "close") {
                posts = posts.filter(post => post.status !== "open");
            }
            displayPost(posts);
            if (btn) setActiveButton(btn);
        })
};

const setActiveButton = (active) => {
    const allBtn = document.getElementById("all");
    const openBtn = document.getElementById("open");
    const closeBtn = document.getElementById("close");

    [allBtn, openBtn, closeBtn].forEach(btn => {
        btn.classList.remove("bg-indigo-600", "text-white");
        btn.classList.add("bg-white", "text-black", "border");
    });

    active.classList.add("bg-indigo-600", "text-white");
    active.classList.remove("bg-white", "text-black", "border");
};

const displayPost = (posts) => {
    const issuesCard = document.getElementById("card_container");
    issuesCard.innerHTML = "";
    // console.log(issuesCard);
    // console.log(posts.length);
    document.getElementById("total").innerText = posts.length;

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
            <div class="responsive bg-white rounded-lg shadow-md p-6 mb-4 border-t-4 ${post.status === "open" ? "border-t-emerald-600" : "border-t-purple-500"}" onclick="openModal('${post.id}')">
                
                <div class="flex items-center justify-between mb-2">
                    <span class="text-green-600 font-semibold" >${post.status === "open" ? `<img src="./assets/Open-Status.png" alt="open"> ` : `<img src="./assets/Closed-Status.png" alt="close">`}</span>
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
                    <span class="mt-2"># ${post.id} by ${post.assignee}</span>
                    <span class="mt-1">${post.createdAt}</span>
                </div>
            </div>

        `;
        issuesCard.appendChild(container);
    });
};

const modalTitle = document.getElementById("modal_title");
const modalStatus = document.getElementById("modal_status");
const modalAuthor = document.getElementById("modal_author");
const modalCreated_at = document.getElementById("modal_created_at");
const modalLabels0 = document.getElementById("modal_labels_0");
const modalLabels1 = document.getElementById("modal_labels_1");
const modalDetails = document.getElementById("modal_details");
const modalAssignee = document.getElementById("modal_assignee");
const modalPriority = document.getElementById("modal_priority");

const cardDetailsModal = document.getElementById("card_details_modal");
async function openModal(postId) {
    // console.log(postId, "postId");
    const singlePostUrl = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${postId}`)
    const data = await singlePostUrl.json();
    console.log(data, 'data');
    const details = data.data;
    console.log(data);
    modalTitle.textContent = details.title;
    modalStatus.innerHTML = details.status === "open" ? `open` : `close`;
    modalAuthor.textContent = details.author;
    modalCreated_at.textContent = details.createdAt;
    modalLabels0.textContent = details.labels[0] ?? "";
    modalLabels1.textContent = details.labels[1] ?? "";
    modalDetails.textContent = details.description;
    modalAssignee.textContent = details.assignee ?? "No Label";
    modalPriority.textContent = details.priority;
    cardDetailsModal.showModal();
};




loadData();