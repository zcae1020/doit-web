const add_btn=document.getElementById("add_btn");

function handleBtn(){
    console.log(1);
    window.open("memo_plane.html","메모장","resizeable = yes, toolbar = yes");
}


add_btn.addEventListener("click", handleBtn);