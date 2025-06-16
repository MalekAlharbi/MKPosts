const baseURL = "https://tarmeezacademy.com/api/v1"

function setUpUI(){
        const token = localStorage.getItem("token");
        const loginBtn = document.getElementById("login-btn");
        const registerBtn = document.getElementById("register-btn");
        const logoutBtn = document.getElementById('logout-btn');
        const addBtn = document.getElementById('add-post-btn');

        if(token == null){
            loginBtn.style.display = "flex";
            registerBtn.style.display = "flex";
            logoutBtn.style.display = "none";
            if(addBtn != null){
                document.getElementById('add-post-btn').innerHTML = ``;
            }
            
            document.getElementById('user-info').innerHTML = ``;
        }else{
            loginBtn.style.display = "none";
            registerBtn.style.display = "none";
            logoutBtn.style.display = "flex";
            getUserInfo()
            if(addBtn.innerHTML != ``){
                showAddPostBtn()
            }
            
        }
    }
    function loginClicked(){
        
        let Username = document.getElementById('name').value;
        let Password = document.getElementById('password').value;

        axios.post(`${baseURL}/login`, {
            username: Username,
            password: Password
        })
        .then(function (response) {
            localStorage.setItem("token",response.data.token);
            localStorage.setItem("user",JSON.stringify(response.data.user));
            
            new Modal(document.getElementById('login-modal')).hide();
            
            setUpUI()
            showAlert("Logged In Successfully!")
        })
        .catch(function (error) {
            showAlert(error.response.data.message)
        });


    }
    function registerClicked(){
    const name = document.getElementById('rg-name').value;
    const Username = document.getElementById('rg-username').value;
    const ProfileImg = document.getElementById('profile_image_input').files[0];
    const Password = document.getElementById('rg-password').value;
    
    let formData = new FormData();
        formData.append("username",Username)
        formData.append("password",Password)
        formData.append("image",ProfileImg)
        formData.append("name",name)

    axios.post(`${baseURL}/register`, formData)
    .then((response) => {
        localStorage.setItem("token",response.data.token);
        localStorage.setItem("user",JSON.stringify(response.data.user));
        
        new Modal(document.getElementById('Register-modal')).hide();
        
        setUpUI()
        showAlert("New Account Created Successfully!")
        showAddPostBtn()
    })
    .catch((error) => {
        showAlert(error.response.data.message)
    });
    }
function showAlert(alertMessage) {
    const alertHTML = `
    <div id="alert-3" class="flex items-center border p-4 mb-4 text-green-800 rounded-lg bg-green-50" role="alert">
        <svg class="shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <span class="sr-only">Info</span>
        <div class="ms-3 text-sm font-medium">
        ${alertMessage}
        </div>
        <button onclick="dismissAlert()" type="button" class="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8" aria-label="Close">
            <span class="sr-only">Close</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
        </button>
    </div>
    `;

    const container = document.getElementById('success-alert');
    if (container) {
        container.innerHTML = alertHTML;

        // Optional auto-dismiss after 3 seconds
        setTimeout(() => {
            dismissAlert();
        }, 3000);
    }
    }
    function dismissAlert() {
        const alertEl = document.getElementById('alert-3');
        if (alertEl) {
            alertEl.classList.add('opacity-0', 'transition-opacity', 'duration-500');
            setTimeout(() => {
                alertEl.remove();
                console.log('Alert dismissed');
            }, 500);
        }
    }
    function showModal(elmId){
        new Modal(document.getElementById(elmId)).show();
    }
    function hideModal(elmId){
        new Modal(document.getElementById(elmId)).hide();
    }
    function logout(){
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUpUI();
        showAlert("Logged Out Successfully!")
    }
    function getUserInfo(){
        const userInfo = JSON.parse(localStorage.getItem("user"))
        document.getElementById('user-info').innerHTML = `
            <img src="${userInfo.profile_image}" alt="UserImg" class="w-5 h-5 rounded-full inline">
            <span class="">${userInfo.username}</span>
        `
    }
    function showAddPostBtn(){
        document.getElementById('add-post-btn').innerHTML = `
        <button type="button" onclick="showModal('add-post-modal')" data-modal-target="add-post-modal" data-modal-toggle="add-post-modal" class="addPost text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                        </svg>
        </button>
        `
    }