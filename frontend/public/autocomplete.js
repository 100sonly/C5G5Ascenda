var search_terms;
fetch('./destinations.json')
    .then((response) => response.json())
    .then((json_auto)=> search_terms=json_auto);




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
function updateValue(val){
    des = document.getElementById("destination");
    des.value=val;
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
            + ' onclick="updateValue(this.textContent)" ' + origString.slice(3);
        //list += '<li onclick="updateValue(this.textContent)">' + terms[i].term + '</li>';
    }
    res.innerHTML = '<ul>' + list + '</ul>';
}

dest=document.getElementById("destination");
dest.onkeyup = function(){showResults(dest.value)};