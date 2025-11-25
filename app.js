let form = document.querySelector("form");
let list = ["#name", "#rollno", "#dob", "#age", "#mail", "#password", "#password1", "#check"];
let list1 = list.toSpliced(7, 1, "#extra").toSpliced(3, 1);

form.addEventListener("submit", (event) => {
    let submit = true;
    event.preventDefault();
    let errorDIV = document.querySelectorAll(".cls");
    errorDIV.forEach((div) => {
        div.remove();
    });
    for(let i of list) {
        if(getValue(i) === "") {
            create(getElement(i));
            submit = false;
        }
        if(i === "#check" && !getElement("#check").checked) {
            create(getElement("#check"), "Checkbox must be checked!");
            submit = false;
        }
        if(i === "#age" && getElement("#age").value === "none") {
            create(getElement("#age"), "Age must be selected!");
            submit = false;
        }
    }
    let para = false;
    for(let i of getElements(".radio")) {
        if(i.checked) {
            para = true;
            break
        }
    }
    if(para === false) {
        create(getElement(".gender"));
        submit = false;
    }
    para = false;
    if(getValue("#password") !== getValue("#password1")) {
        for(let i of getElements(".cls")) {
            if(i.innerText === "Password check cannot be empty!") {
                para = true;
            }
        }
        if(para === false) {
            create(getElement("#password1"), "Password does not match!");
            submit = false;
        }
    }
    para = false;
    if(/[^a-zA-z]/.test(getValue("#name"))) {
        getElements(".cls").forEach((el) => {
            if(el.innerText == "Name cannot be empty!") {
                para = true;
            }
        });
        if(para === false) {
            create(getElement("#name"), "Name can only consist of alphabets!");
            submit = false;
        }
    }
    para = false;
    if(/\D/.test(getValue("#rollno"))) {
        getElements(".cls").forEach((el) => {
            if(el.innerText == "Roll number cannot be empty!") {
                para = true;
            }
        });
        if(para === false) {
            create(getElement("#rollno"), "Roll number can only consist of numbers!");
            submit = false;
        }
    }
    para = false;
    if(!/^[^@\s]+@[^@\s]+\.[a-zA-z]+$/.test(getValue("#mail"))) {
        getElements(".cls").forEach((el) => {
            if(el.innerText == "E-mail cannot be empty!") {
                para = true;
            }
        });
        if(para === false) {
            create(getElement("#mail"), "Invalid E-mail format!");
            submit = false;
        }
    }
    para = false;
    if(getValue("#rollno").length < 7) {
        getElements(".cls").forEach((el) => {
            if(el.innerText == "Roll number cannot be empty!") {
                para = true;
            }
        });
        if(para === false) {
            create(getElement("#rollno"), "Roll number cannot be of less than 7 digits!");
            submit = false;
        }
    }
    if(submit === true) {
        form.submit();
    }
});

for(let i of list1) {
    let para = false;
    getElement(i).addEventListener("click", () => {
        if(para === false) {
            getElement(i).style.scale = "3";
            getElement(i).style.translate = "-8vw";
            para = true;
        } else {
            getElement(i).style.scale = "";
            getElement(i).style.translate = "";
            para = false;
        }
    });
}

function getElement(n) {
    let x = document.querySelector(n);
    return x;
}
function getElements(n) {
    let x = document.querySelectorAll(n);
    return x;
}
function getValue(n) {
    let x = getElement(n).value;
    return x;
}
function create(n, text = `${n.getAttribute("name")} cannot be empty!`) {
    let div = document.createElement("div");
    div.innerText = text;
    div.className = "cls";
    n.parentNode.after(div);
}