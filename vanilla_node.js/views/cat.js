export default cat => `<li>
    <img src="${cat.image}" alt="${cat.name}">
        <h3>${cat.name}</h3>
        <p><span>Price: </span>${cat.price}$</p>
        <p><span>Breed: </span>${cat.breed}</p>
        <p><span>Description: </span>${cat.description}</p>
        <ul class="buttons">
            <li class="btn edit"><a href="/cat/${cat.id}/change-info">Change Info</a></li>
            <li class="btn delete"><a href="/cat/${cat.id}/new-home">New Home</a></li>
        </ul>
</li>`