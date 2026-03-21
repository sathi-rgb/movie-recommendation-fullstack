let editingId = null

async function loadReviews(){

let res = await fetch("http://127.0.0.1:5000/reviews")
let reviews = await res.json()

let container = document.getElementById("reviewsList")
container.innerHTML=""

reviews.forEach(r=>{

let card=document.createElement("div")
card.className="review-card"

card.innerHTML = `
<img class="review-poster" src="${r.poster}">

<div class="review-info">

<h3 class="review-title">${r.movieTitle}</h3>

<span class="review-badge ${r.sentiment}">
${r.sentiment === "positive" ? "⭐ Positive" : "😡 Negative"}
</span>

<p class="review-text">${r.text}</p>

<div class="review-actions">

<button onclick="openEditModal('${r._id}','${r.text}')" class="edit-btn">
✏ Edit
</button>

<button onclick="deleteReview('${r._id}')" class="delete-btn">
🗑 Delete
</button>

</div>

</div>
`

container.appendChild(card)

})

}

loadReviews()

async function deleteReview(id){

await fetch(`http://127.0.0.1:5000/reviews/${id}`,{
method:"DELETE"
})

loadReviews()

}

function openEditModal(id,text){

editingId = id

document.getElementById("editReviewText").value = text

document.getElementById("editModal").style.display = "flex"

}

function closeModal(){

document.getElementById("editModal").style.display = "none"

}

async function saveEditedReview(){

let newText = document.getElementById("editReviewText").value

await fetch(`http://127.0.0.1:5000/reviews/${editingId}`,{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({text:newText})
})

closeModal()
loadReviews()

}