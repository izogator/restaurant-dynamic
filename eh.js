fetch("https://kea-alt-del.dk/t5/api/categories")
    .then(function (response) {
        return response.json()
    })
    .then(categories)

function categories(data) {
    data.forEach(function (oneCat) {
        const section = document.createElement("section");
        section.id = oneCat;
        const h4 = document.createElement("h4");
        h4.textContent = oneCat;
        section.appendChild(h4);

        document.querySelector(".menu").appendChild(section);
    })
    getProduct();
}

function getProduct() {
    fetch("https://kea-alt-del.dk/t5/api/productlist")
        .then(function (response) {
            return response.json()
        })

        .then(function (data) {
            showData(data)
        })
}

function showData(jsonData) {
    console.log(jsonData)
    jsonData.forEach(showSingle)
}

function showSingle(course) {
    const template = document.querySelector("template").content;

    const smallImg = getImageName(course.image);

    console.log(template)

    const aCopy = template.cloneNode(true);
    console.log(aCopy)

    aCopy.querySelector(".but").addEventListener("click", () => {
        fetch(`https://kea-alt-del.dk/t5/api/product?id=${course.id}`)
            .then(res => res.json())
            .then(showDetails);
    });
    aCopy.querySelector(".imageName").src = smallImg;
    aCopy.querySelector("h2").textContent = course.name;
    aCopy.querySelector("h3").textContent = course.shortdescription;
    aCopy.querySelector("p span.price").textContent = course.price;
    aCopy.querySelector("p span.normalPrice").textContent = course.price;



    if (course.discount) {
        const newPrice = Math.round(course.price - course.price * course.discount / 100);
        aCopy.querySelector("p span.sale").textContent = newPrice;
        aCopy.querySelector(".originalPrice").remove()

    } else {
        aCopy.querySelector(".discount").remove()
        aCopy.querySelector("p span.price").textContent = course.price
    }
    if (course.vegetarian) {
        aCopy.querySelector(".vege");

    } else {
        aCopy.querySelector(".vege").remove();
    }
    if (course.alcohol) {
        aCopy.querySelector(".alko");

    } else {
        aCopy.querySelector(".alko").remove();
    }
    if (course.soldout) {
        aCopy.querySelector(".imageName ").classList.add("filter");
        aCopy.querySelector(".soldOut");
        aCopy.querySelector(".but").classList.add("filter");



    } else {
        aCopy.querySelector(".imageName").classList.remove("filter");

        aCopy.querySelector(".soldOut").remove();
        aCopy.querySelector(".but").classList.remove("filter");

    }

    document.querySelector(`#${course.category}`).appendChild(aCopy);

    const modal = document.querySelector(".modal-background");
    modal.addEventListener("click", () => {
        modal.classList.add("hide");
    });


    function showDetails(data) {
        modal.querySelector(".modal-name").textContent = data.name;
        modal.querySelector(".modal-description").textContent = data.longdescription;
        modal.classList.remove("hide");
    }



    function showDetails(data) {
        modal.querySelector(".modal-name").textContent = data.name;
        modal.querySelector(".modal-description").textContent = data.longdescription;
        modal.querySelector(".modal-image").src = getImageName(data.image);
        modal.classList.remove("hide");
    }

    function getImageName(imageName) {
        const base = "https://kea-alt-del.dk/t5/site/imgs/";
        return base + "small/" + imageName + "-sm.jpg";
    }



    /*const whosYourDaddy = document.querySelector("template").parentNode;

    whosYourDaddy.appendChild(aCopy);*/
}
