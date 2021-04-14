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

let upload = document.getElementById("upload")
let main = document.getElementById('main')
let database = firebase.database()



database.ref().child("num").on('value' , (snapshot)=>{
    while(main.firstChild){
        main.removeChild(main.firstChild)
    }
    console.log(snapshot.val())
    let num = snapshot.val()
    for(let i=num;i>0;i--){
        let div = document.createElement('div')
        main.appendChild(div)
        div.classList.add("blog-div")
        let image = document.createElement('img')
        let blog_content = document.createElement('p')
        let blog_title = document.createElement('h3')
        div.appendChild(blog_title)
        image.style.height = "200px"
        image.style.width = "200px"
        div.appendChild(image)
        div.appendChild(blog_content)
        database.ref().child(i).child("image_url").on('value' , (image_url)=>{
            console.log(image_url.val())
            image.src = image_url.val()
            database.ref().child(i).child("blog").on('value' , (blog)=>{
                console.log(blog.val())
                blog_content.innerHTML = blog.val()
                database.ref().child(i).child("title").on('value' , (title)=>{
                    blog_title.innerHTML = title.val()
                })
            })
        })
    }   
})




upload.onclick = () => {
    window.location.href = "upload.html"

}