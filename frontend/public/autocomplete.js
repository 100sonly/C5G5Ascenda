var search_terms;
fetch('./destinations.json')
    .then((response) => response.json())
    .then((json_auto)=> search_terms=json_auto);



document.querySelector('form').addEventListener('submit', function(e) {
    des=document.getElementById("destination_id");
    des.value=des.getAttribute("desid");
    guests=document.getElementById("guests");
    guestval=guests.getAttribute("value");
    const rooms=parseInt(guestval.charAt(0))-1;
    if(rooms<1){
        guests.value=guestval.charAt(9);
    }
    else {
        console.log(rooms);
        guests.value = (guestval.charAt(9) + "|").repeat(rooms)+guestval.charAt(9);

    }
}, false);

function autocompleteMatch(input) {

    if (input == '') {
        return [];
    }
    var reg = new RegExp(input,"i");

    return search_terms.filter(function(n,i) {

        if(n.term!==undefined){
        if (n.term.match(reg) && this.count<100) {
            this.count++;
            return n.term;
        }
        return false;
        }
    }, {count: 0});
}
function updateValue(val,desid){
    des = document.getElementById("destination_id");
    des.value=val;
    des.setAttribute('desid',desid);
    res = document.getElementById("result");
    res.innerHTML = '';
}
function showResults(val) {
    res = document.getElementById("result");
    res.innerHTML = '';
    let list = '';
    let terms = autocompleteMatch(val);

    for (i=0; i<terms.length; i++) {
        const entry = document.createElement('li');
        entry.setAttribute('id',terms[i].uid);
        entry.innerHTML=terms[i].term;
        origString=entry.outerHTML.toString();
        list+=origString.slice(0,3)
            + ' onclick="updateValue(this.textContent,this.id)" ' + origString.slice(3);
        //list += '<li onclick="updateValue(this.textContent)">' + terms[i].term + '</li>';
    }
    res.innerHTML = '<ul>' + list + '</ul>';
}

dest=document.getElementById("destination_id");

dest.onkeyup = function(){showResults(dest.value);};