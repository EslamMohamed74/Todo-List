let enterButton = document.getElementById("enter");
let input = document.getElementById("userInput");
let ul = document.querySelector("ul");
let item = document.getElementsByTagName("li");

function inputLength() {
    return input.value.length;
}

function listLength() {
    return item.length;
}



window.onload = function () {
    let retrievedObject = JSON.parse(localStorage.getItem("listOfItem") || "[]");

    retrievedObject.forEach(function (item) {
        console.log(item.name + " & " + item.color);
        let li = document.createElement("li");
        let color = document.createElement('input')
        color.setAttribute('type', 'color')
        color.setAttribute('id', 'color_picker')

        color.addEventListener("change", changeColor);
        color.value = item.color;



        let btnup = document.createElement("button")
        btnup.setAttribute('class', 'up')
        btnup.innerHTML = 'up'
        let btndown = document.createElement("button")
        btndown.setAttribute('class', 'down')

        btndown.innerHTML = 'down'
        let btndelete = document.createElement("button")
        btndelete.setAttribute('id', 'delete')
        btndelete.addEventListener("click", deleteListItem);

        btndelete.innerHTML = 'delete'
        li.style.backgroundColor = item.color;
        li.appendChild(document.createTextNode(item.name));
        li.appendChild(color)
        li.appendChild(btnup)
        li.appendChild(btndown)
        li.appendChild(btndelete)
        ul.appendChild(li);
    });


    $(function () {
        $('.up').on('click', function (e) {
            let tar = e.target;
            let parent = tar.parentNode;
            let liText = parent.textContent.slice(0, -12);
            let retrievedObject = JSON.parse(localStorage.getItem("listOfItem") || "[]");
            let liIndex = retrievedObject.findIndex(x => x.name === liText)
            if (!liIndex <= 0) {
                let temp = retrievedObject[liIndex - 1];
                retrievedObject[liIndex - 1] = retrievedObject[liIndex];
                retrievedObject[liIndex] = temp;
                localStorage.setItem("listOfItem", JSON.stringify(retrievedObject));
                let up = $(this).closest('li')
                up.insertBefore(up.prev())

            }

        })
        $('.down').on('click', function (e) {

            let tar = e.target;
            let parent = tar.parentNode;
            let liText = parent.textContent.slice(0, -12);
            let retrievedObject = JSON.parse(localStorage.getItem("listOfItem") || "[]");
            let liIndex = retrievedObject.findIndex(x => x.name === liText)

            console.log(liIndex);
            if (liIndex + 1 < retrievedObject.length) {
                let temp = retrievedObject[liIndex + 1];
                retrievedObject[liIndex + 1] = retrievedObject[liIndex];
                retrievedObject[liIndex] = temp;
                localStorage.setItem("listOfItem", JSON.stringify(retrievedObject));
                let down = $(this).closest('li')
                console.log(down);
                
                down.insertAfter(down.next())
            }

        })
    })
}



function createListElement() {
    let li = document.createElement("li");
    let color = document.createElement('input')
    color.setAttribute('type', 'color')
    color.setAttribute('id', 'color_picker')

    color.addEventListener("change", changeColor);



    let btnup = document.createElement("button")
    btnup.setAttribute('class', 'up')
    btnup.innerHTML = 'up'
    let btndown = document.createElement("button")
    btndown.setAttribute('class', 'down')

    btndown.innerHTML = 'down'
    let btndelete = document.createElement("button")
    btndelete.setAttribute('id', 'delete')
    btndelete.addEventListener("click", deleteListItem);

    btndelete.innerHTML = 'delete'
    li.appendChild(document.createTextNode(input.value));
    li.appendChild(color)
    li.appendChild(btnup)
    li.appendChild(btndown)
    li.appendChild(btndelete)
    ul.appendChild(li);
    let nameTemp = input.value;
    input.value = "";



    (function () {
        let listOfItem = JSON.parse(localStorage.getItem("listOfItem") || "[]");

        let item = {
            name: nameTemp,
            color: ""
        };
        listOfItem.push(item);

        localStorage.setItem("listOfItem", JSON.stringify(listOfItem));
    })();




    $(function () {
        $('.up').on('click', function (e) {
            let tar = e.target;
            let parent = tar.parentNode;
            let liText = parent.textContent.slice(0, -12);
            let retrievedObject = JSON.parse(localStorage.getItem("listOfItem") || "[]");
            let liIndex = retrievedObject.findIndex(x => x.name === liText)
            if (!liIndex <= 0) {
                let temp = retrievedObject[liIndex - 1];
                retrievedObject[liIndex - 1] = retrievedObject[liIndex];
                retrievedObject[liIndex] = temp;
                localStorage.setItem("listOfItem", JSON.stringify(retrievedObject));
                let up = $(this).closest('li')
                up.insertBefore(up.prev())

            }


        })
        $('.down').on('click', function (e) {
            let tar = e.target;
            let parent = tar.parentNode;
            let liText = parent.textContent.slice(0, -12);
            let retrievedObject = JSON.parse(localStorage.getItem("listOfItem") || "[]");
            let liIndex = retrievedObject.findIndex(x => x.name === liText)

            console.log(liIndex);
            if (liIndex + 1 < retrievedObject.length) {
                let temp = retrievedObject[liIndex + 1];
                retrievedObject[liIndex + 1] = retrievedObject[liIndex];
                retrievedObject[liIndex] = temp;
                localStorage.setItem("listOfItem", JSON.stringify(retrievedObject));
                let down = $(this).closest('li')
                down.insertAfter(down.next())
            }
        })
    })
}
function changeColor(ev) {
    let tar = ev.target;
    let parent = tar.parentNode;
    parent.style.backgroundColor = tar.value;
    let liText = parent.textContent.slice(0, -12);
    let retrievedObject = JSON.parse(localStorage.getItem("listOfItem") || "[]");
    let liIndex = retrievedObject.findIndex(x => x.name === liText)
    if (liIndex + 1 <= retrievedObject.length) {
        retrievedObject[liIndex] = { name: liText, color: tar.value };
        localStorage.setItem("listOfItem", JSON.stringify(retrievedObject));
    }

}

function deleteListItem(ev) {
    let tar = ev.target;
    let parent = tar.parentNode;
    let liText = parent.textContent.slice(0, -12);
    let retrievedObject = JSON.parse(localStorage.getItem("listOfItem") || "[]");
    let filtered = retrievedObject.filter(function (el) { return el.name != liText; });
    localStorage.setItem("listOfItem", JSON.stringify(filtered));
    parent.remove(tar);
}


function addListAfterClick() {
    if (inputLength() > 0) {
        createListElement();
    }
}

function addListAfterKeypress(event) {
    if (inputLength() > 0 && event.which === 13) {
        createListElement();
    }
}


enterButton.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);

