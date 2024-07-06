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

function showResults(val) {
    res = document.getElementById("result");
    res.innerHTML = '';
    let list = '';
    let terms = autocompleteMatch(val);

    for (i=0; i<terms.length; i++) {
        list += '<li>' + terms[i].term + '</li>';
    }
    res.innerHTML = '<ul>' + list + '</ul>';
}