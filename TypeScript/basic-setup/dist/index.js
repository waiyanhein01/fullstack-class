import add from "./math";
var myName = "Wai";
{
    var myName_1 = "Inner Scope Wai";
    var output = "My name is ".concat(myName_1);
    console.log(output);
}
add(1, 2);
