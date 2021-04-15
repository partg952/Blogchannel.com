var firebaseConfig = {
    apiKey: "AIzaSyA3VceR0-NKU3or7LtSSZFivzGCASzjirM",
    authDomain: "blogging-website-89ec7.firebaseapp.com",
    projectId: "blogging-website-89ec7",
    storageBucket: "blogging-website-89ec7.appspot.com",
    messagingSenderId: "2446194216",
    appId: "1:2446194216:web:dd163afe0a887a6dd0671d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let array = ['image', 'blog', 'title']

let file_picker = document.getElementById('image')
let img = document.getElementById('face')
let database = firebase.database()
let storage = firebase.storage()
let blog_title = document.getElementById('blog-title')
let blog_content = document.querySelector('textarea')
let title_of_blog = document.getElementById('title-of-the-blog')
let content = document.getElementById('content')
let upload = document.getElementById('upload-button')
let final_image = document.getElementById('final-image')
let num = 0

upload.onclick = () => {
    uploadImage()
}


database.ref().child("num").on('value', (snapshot) => {
    console.log(snapshot.val())
    num = snapshot.val()
})

blog_title.onchange = () => {
    title_of_blog.innerHTML = blog_title.value
}

blog_content.onchange = () => {
    content.innerHTML = blog_content.value
}





file_picker.addEventListener('change', (e) => {
    let file = e.target.files[0]

    let url = URL.createObjectURL(file)
    console.log(url)
    img.src = url
    img.style.height = "200px"
    img.style.width = "200px"
    final_image.src = url

    final_image.style.height = "200px"
    final_image.style.width = "200px"
})

function uploadImage() {

    if (blog_content.value.length != 0 && blog_title != 0 && final_image.src != null) {
        let rand = Math.random() * 100000000000
        storage.ref().child(rand + '/').put(file_picker.files[0]).then(() => {
            storage.ref().child(rand + '/').getDownloadURL().then(url => {
                console.log(url)
                num++

                database.ref().child(num + '/').child("image_url").set(url)
                    .then(() => {
                        database.ref().child(num + '/').child("title").set(blog_title.value)
                            .then(() => {
                                database.ref().child(num + '/').child("blog").set(blog_content.value)
                                database.ref().child("num").set(num)
                            })
                    })






            })
        })
    }
}