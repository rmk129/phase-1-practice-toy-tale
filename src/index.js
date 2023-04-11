let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/toys") 
    .then(function (resp) {
      return resp.json()
    })
    .then(e => {
      e.forEach(element => {
       
          let div = document.createElement("div");
          div.className = "card";
          let h2 = document.createElement("h2")
          h2.innerHTML = element.name;
          div.appendChild(h2);
          let img = document.createElement("img")
          img.src = element.image;
          img.className = "toy-avatar"
          div.appendChild(img)
          let likes = document.createElement("p")
          likes.innerText = `${element.likes} likes`
          div.appendChild(likes);
          let likeButton = document.createElement("button")
          likeButton.className = "like-btn"
          likeButton.id = element.id;
          likeButton.innerHTML = "Like &hearts;"
          likeButton.addEventListener('click', function(e) {
            let newlikes = element.likes++;
            likes.innerText = `${newlikes} likes!`
            fetch(`http://localhost:3000/toys/${element.id}`, {
              method: 'PATCH',
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
              },
              body: JSON.stringify({
                "likes": newlikes
              })
            })
          })
          div.appendChild(likeButton)
          document.getElementById("toy-collection").appendChild(div)
      });;
    })

})


document.addEventListener("DOMContentLoaded", () => {
  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    let name = e.target.tName
    let image = e.target.tImage
    fetch("http://localhost:3000/toys", {
      method: 'POST', 
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": `${name.value}`,
        "image": `${image.value}`,
        "likes": 0
      })
    })
    .then(resp => resp.json())
    .then(element => {
      let div = document.createElement("div");
      div.className = "card";
      let h2 = document.createElement("h2")
      h2.innerHTML = element.name;
      div.appendChild(h2);
      let img = document.createElement("img")
      img.src = element.image;
      img.className = "toy-avatar"
      div.appendChild(img)
      let likes = document.createElement("p")
      likes.innerText = `${element.likes} likes`
      div.appendChild(likes);
      let likeButton = document.createElement("button")
      likeButton.className = "like-btn"
      likeButton.id = element.id;
      likeButton.innerHTML = "Like &hearts;"
      likeButton.addEventListener('click', function(e) {
        let newlikes = element.likes++;
        likes.innerText = `${newlikes} likes!`
        fetch(`http://localhost:3000/toys/${element.id}`, {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            "likes": newlikes
          })
        })
      })
      div.appendChild(likeButton)
      document.getElementById("toy-collection").appendChild(div)
      
    })
  })
})


document.addEventListener("DOMContentLoaded", () => {
  const hearts = document.getElementsByClassName('like-btn')
  console.log(hearts)

//   for (const element of hearts){
//     element.addEventListener('click', function(e) {
//       console.log(e);
//     })
//   }
})